"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";

export default function BgVideo({ src, poster, className = "" }) {
  const ref = useRef(null);

  // Prioriza o POSTER (quadro do LCP): carrega rápido e é a primeira pintura.
  if (poster) preload(poster, { as: "image", fetchPriority: "high" });

  const attach = (node) => {
    ref.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.setAttribute("muted", "");
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let stopped = false;
    let interval = 0;

    // Só baixa/toca o vídeo (1,3 MB) DEPOIS do carregamento inicial, para não
    // competir com o LCP nem consumir dados do celular à toa. O poster segura a cena.
    const start = () => {
      if (stopped) return;
      video.preload = "auto";
      video.muted = true;

      const attempt = () => {
        if (stopped || !video.paused) return;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      };

      // Insiste até tocar de fato (cobre Safari, que só toca quando pronto).
      attempt();
      let count = 0;
      interval = window.setInterval(() => {
        count += 1;
        if (stopped || !video.paused || count > 40) {
          window.clearInterval(interval);
          return;
        }
        attempt();
      }, 250);
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        window.setTimeout(start, 1200);
      }
    };

    // Espera a página terminar de carregar antes de mexer no vídeo.
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      stopped = true;
      if (interval) window.clearInterval(interval);
      window.removeEventListener("load", schedule);
    };
  }, []);

  return (
    <video
      ref={attach}
      className={className}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      x-webkit-airplay="deny"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
