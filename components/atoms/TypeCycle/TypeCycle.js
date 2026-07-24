"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TypeCycle.module.css";

export default function TypeCycle({ words, className = "" }) {
  // Começa com a 1ª palavra JÁ escrita: o servidor entrega "Construo sites..."
  // no HTML (crawlável) e a animação assume a partir daí — sem texto escondido.
  const [text, setText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return () => {
        mounted.current = false;
      };
    }

    // Arranca segurando a 1ª palavra (já visível) e depois apaga para trocar —
    // transição natural, sem "pulo" do texto renderizado no servidor.
    let i = 0; // índice da palavra
    let phase = "hold";
    let char = words[0].length;
    let timer = 0;

    const tick = () => {
      if (!mounted.current) return;
      const word = words[i];

      if (phase === "typing") {
        char += 1;
        setText(word.slice(0, char));
        if (char >= word.length) {
          phase = "hold";
          timer = window.setTimeout(tick, 1800);
          return;
        }
        timer = window.setTimeout(tick, 55 + Math.random() * 45);
      } else if (phase === "hold") {
        phase = "erasing";
        timer = window.setTimeout(tick, 40);
      } else {
        char -= 1;
        setText(word.slice(0, char));
        if (char <= 0) {
          phase = "typing";
          i = (i + 1) % words.length;
          setIndex(i);
          timer = window.setTimeout(tick, 260);
          return;
        }
        timer = window.setTimeout(tick, 28);
      }
    };

    timer = window.setTimeout(tick, 1600);

    return () => {
      mounted.current = false;
      window.clearTimeout(timer);
    };
  }, [words]);

  return (
    <span className={`${styles.wrap} ${className}`}>
      <span className={styles.word} key={index}>
        {text}
      </span>
      <span className={styles.caret} aria-hidden="true" />
    </span>
  );
}
