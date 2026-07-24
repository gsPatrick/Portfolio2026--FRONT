"use client";

import { useEffect, useRef } from "react";
import styles from "./Spotlight.module.css";

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let frame = 0;

    const move = (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--my", `${event.clientY - rect.top}px`);
        frame = 0;
      });
    };

    const parent = node.parentElement;
    parent.addEventListener("pointermove", move);
    node.classList.add(styles.live);

    return () => {
      parent.removeEventListener("pointermove", move);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.spotlight} ref={ref} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.lit} />
      <div className={styles.glow} />
      <div className={styles.vignette} />
    </div>
  );
}
