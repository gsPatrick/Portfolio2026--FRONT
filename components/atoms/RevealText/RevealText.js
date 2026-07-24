"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RevealText.module.css";

function parse(text) {
  return text.split("\n").map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((word) => ({
        value: word.replace(/\*/g, ""),
        accent: word.startsWith("*") && word.endsWith("*"),
      }))
  );
}

export default function RevealText({
  text,
  as = "h1",
  className = "",
  immediate = false,
}) {
  const Tag = as;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const lines = parse(text);

  useEffect(() => {
    if (immediate) {
      setRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${revealed ? styles.on : ""} ${className}`}
    >
      {lines.map((words, lineIndex) => (
        <span className={styles.line} key={lineIndex}>
          {words.map((word, wordIndex) => (
            <span key={`${lineIndex}-${wordIndex}`}>
              <span className={styles.word}>
                {word.accent ? (
                  <em className={styles.accent}>{word.value}</em>
                ) : (
                  word.value
                )}
              </span>{" "}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
