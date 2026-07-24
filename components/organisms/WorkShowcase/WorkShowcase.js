"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Tag from "@/components/atoms/Tag/Tag";
import BrowserFrame from "@/components/molecules/BrowserFrame/BrowserFrame";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import { PROJECTS } from "@/lib/projects";
import styles from "./WorkShowcase.module.css";

const DURATION = 9000;

export default function WorkShowcase({
  tone = "light",
  compact = false,
  limit,
  kicker,
  title,
  lead,
  cta,
}) {
  const items = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (paused) return;

    timer.current = window.setTimeout(
      () => setActive((index) => (index + 1) % items.length),
      DURATION
    );

    return () => window.clearTimeout(timer.current);
  }, [active, paused, items.length]);

  const go = (index) => setActive((index + items.length) % items.length);
  const current = items[active];

  return (
    <section
      className={`${styles.section} ${styles[tone]} ${
        compact ? styles.compact : ""
      }`}
      id="trabalhos"
    >
      {title ? (
        <div className={styles.head}>
          <SectionHead layout="split" kicker={kicker} title={title} lead={lead} />
        </div>
      ) : null}

      <div
        className={styles.stage}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.info} key={current.slug}>
          <div className={styles.infoTop}>
            <span className={styles.category}>{current.category}</span>
            <span className={styles.counter}>
              {String(active + 1).padStart(2, "0")}
              <i>/</i>
              {String(items.length).padStart(2, "0")}
            </span>
          </div>

          <h3 className={styles.name}>{current.name}</h3>
          <p className={styles.summary}>{current.summary}</p>

          <p className={styles.result}>
            <span className={styles.resultMark} aria-hidden="true" />
            {current.result}
          </p>

          <div className={styles.tools}>
            {current.tools.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </div>

          <div className={styles.controls}>
            <button
              className={styles.nav}
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Projeto anterior"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M19 12H6M11 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={styles.nav}
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Próximo projeto"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.media}>
          {items.map((project, index) => (
            <div
              className={`${styles.screen} ${
                index === active ? styles.on : ""
              }`}
              key={project.slug}
              aria-hidden={index !== active}
            >
              <BrowserFrame
                url={project.url}
                shot={project.shot}
                video={project.video}
                initial={project.name.charAt(0)}
                active={index === active}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <ol className={styles.index}>
          {items.map((project, position) => (
            <li key={project.slug}>
              <button
                className={`${styles.row} ${
                  position === active ? styles.rowOn : ""
                }`}
                type="button"
                onClick={() => setActive(position)}
                aria-current={position === active}
              >
                <span className={styles.rowIndex}>
                  {String(position + 1).padStart(2, "0")}
                </span>
                <span className={styles.rowName}>{project.name}</span>
                <span className={styles.rowCategory}>{project.category}</span>
                <span className={styles.rowYear}>{project.year}</span>

                <span
                  className={styles.rowBar}
                  key={`${project.slug}-${active}-${paused}`}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ol>

        {cta ? (
          <div className={styles.cta}>
            <p className={styles.ctaText}>{cta.text}</p>
            <Button
              href={cta.href}
              variant={tone === "light" ? "dark" : "primary"}
              icon="→"
            >
              {cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
