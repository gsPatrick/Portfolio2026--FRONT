"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initTracking, track } from "@/lib/track";

// Rótulo legível para um elemento clicado.
function labelFor(el) {
  const tracked = el.closest("[data-track]");
  if (tracked) return tracked.getAttribute("data-track");

  const link = el.closest("a, button");
  if (!link) return null;

  const aria = link.getAttribute("aria-label");
  if (aria) return aria.trim().slice(0, 80);

  const text = link.textContent?.replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 80);

  if (link.tagName === "A") return link.getAttribute("href");
  return link.tagName.toLowerCase();
}

export default function Tracker() {
  const pathname = usePathname();
  const firstRun = useRef(true);
  const sections = useRef(new Map()); // id -> tempo de entrada

  // Inicializa o rastreamento uma vez.
  useEffect(() => {
    initTracking();
  }, []);

  // Page view a cada mudança de rota (SPA).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      track("page_view", { path: pathname, entry: true });
    } else {
      track("page_view", { path: pathname });
    }
  }, [pathname]);

  // Cliques (delegação global).
  useEffect(() => {
    const onClick = (event) => {
      const label = labelFor(event.target);
      if (!label) return;
      const section = event.target.closest("section[id]");
      track("click", {
        label,
        section: section ? section.id : null,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Tempo em cada seção (IntersectionObserver).
  useEffect(() => {
    const map = sections.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) {
            if (!map.has(id)) map.set(id, performance.now());
            track("section_enter", { section: id });
          } else if (map.has(id)) {
            const dwellMs = Math.round(performance.now() - map.get(id));
            map.delete(id);
            track("section_exit", { section: id, dwellMs });
          }
        });
      },
      { threshold: 0.4 }
    );

    const els = document.querySelectorAll("section[id]");
    els.forEach((el) => observer.observe(el));

    return () => {
      // fecha seções abertas ao trocar de página
      map.forEach((start, id) => {
        track("section_exit", { section: id, dwellMs: Math.round(performance.now() - start) });
      });
      map.clear();
      observer.disconnect();
    };
  }, [pathname]);

  // Formulários: início (primeiro foco) e envio.
  useEffect(() => {
    const startedForms = new Set();

    const onFocusIn = (event) => {
      const form = event.target.closest("form");
      if (!form) return;
      const id = form.id || form.getAttribute("name") || "form";
      if (!startedForms.has(id)) {
        startedForms.add(id);
        track("form_start", { form: id });
      }
    };

    const onSubmit = (event) => {
      const form = event.target.closest("form");
      if (!form) return;
      const id = form.id || form.getAttribute("name") || "form";
      track("form_submit", { form: id });
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("submit", onSubmit, { capture: true });
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("submit", onSubmit, { capture: true });
    };
  }, []);

  return null;
}
