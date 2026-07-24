"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/atoms/Logo/Logo";
import { CONTACT } from "@/lib/contact";
import styles from "./NavBar.module.css";

const LINKS = [
  { label: "Projetos", href: "/#trabalhos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Processo", href: "/#processo" },
  { label: "Carreira", href: "/carreira" },
  { label: "Dúvidas", href: "/#duvidas" },
];

export default function NavBar({ lightHero = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = open ? "hidden" : "";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        open ? styles.menuOpen : ""
      } ${lightHero ? styles.lightHero : ""}`}
    >
      <div className={styles.inner}>
        <a className={styles.logo} href="/" aria-label="Patrick.Developer">
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Principal">
          <ul className={styles.menu}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a className={styles.menuItem} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.quick}>
            <a
              className={styles.channel}
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2z" />
              </svg>
              WhatsApp
            </a>
            <a className={styles.channel} href={`mailto:${CONTACT.email}`}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 4.76-8-4.76V6l8 4.76L20 6z" />
              </svg>
              E-mail
            </a>
            <a className={styles.cta} href="/#contato">
              Conversar
            </a>
          </div>

          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </nav>
      </div>

      <div
        className={`${styles.popup} ${open ? styles.popupOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className={styles.popupInner}>
          <ul className={styles.popupMenu}>
            {[...LINKS, { label: "Conversar", href: "#contato" }].map((link) => (
              <li key={link.href}>
                <a
                  className={styles.popupItem}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.popupContact}>
            <a
              className={styles.popupChannel}
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
            <a
              className={styles.popupChannel}
              href={`mailto:${CONTACT.email}`}
              onClick={() => setOpen(false)}
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
