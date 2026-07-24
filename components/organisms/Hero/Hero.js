"use client";

import { useEffect, useRef, useState } from "react";
import Badge from "@/components/atoms/Badge/Badge";
import BgVideo from "@/components/atoms/BgVideo/BgVideo";
import CodeProof from "@/components/molecules/CodeProof/CodeProof";
import TypeCycle from "@/components/atoms/TypeCycle/TypeCycle";
import Button from "@/components/atoms/Button/Button";
import StatRail from "@/components/molecules/StatRail/StatRail";
import styles from "./Hero.module.css";

const STATS = [
  { value: "7", label: "anos de experiência" },
  { value: "60+", label: "projetos entregues" },
  { value: "30min", label: "da sua mensagem ao briefing" },
];

export default function Hero() {
  const [expanded, setExpanded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [today, setToday] = useState("");
  const secondRef = useRef(null);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      const next = window.scrollY > 8;
      if (next !== last) {
        last = next;
        setExpanded(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const node = secondRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${styles.hero} ${expanded ? styles.open : ""}`}
      id="top"
    >
      <div className={styles.backdrop}>
        <div className={styles.frame}>
          <div className={styles.canvas}>
            <BgVideo
              src="/media/hero-loop.mp4"
              poster="/media/hero-poster.jpg"
              className={styles.video}
            />
            <div className={styles.scrim} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className={styles.overlay}>
        <div className={styles.stage}>
          <header className={styles.head}>
            <Badge pulse size="lg">
              Agenda aberta para novos projetos
              {today ? ` · ${today}` : ""}
            </Badge>
          </header>

          <div className={styles.stageMain}>
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>
                Seu projeto no ar em
                <br />
                semanas, não em <em className={styles.accent}>meses</em>.
              </h1>

              <p className={styles.subline}>
                Construo{" "}
                <TypeCycle
                  words={[
                    "sites",
                    "sistemas",
                    "SaaS",
                    "automações",
                    "lojas virtuais",
                    "aplicativos",
                  ]}
                />{" "}
                sob medida para pequenos negócios e startups. Do zero ao ar, sem
                enrolação.
              </p>
            </div>

            <div className={styles.proof}>
              <CodeProof />
            </div>
          </div>
        </div>

        <div
          className={`${styles.second} ${revealed ? styles.visible : ""}`}
          ref={secondRef}
        >
          <div className={styles.pitch}>
            <p className={styles.statement}>
              Landing no ar em menos de 48 horas.
              <br />
              Sistema completo a partir de{" "}
              <em className={styles.accent}>um mês</em>.
            </p>

            <p className={styles.lead}>
              Escopo e preço fechados antes da primeira linha de código. Entrega
              toda semana, no seu ambiente, com tudo documentado. Sem prazo
              elástico, sem sumiço, sem orçamento que cresce no meio do caminho.
            </p>
          </div>

          <div className={styles.foot}>
            <div className={styles.actions}>
              <Button href="/#contato" variant="primary" icon="→">
                Iniciar um projeto
              </Button>
              <Button href="/projetos" variant="ghost">
                Ver trabalhos
              </Button>
            </div>

            <StatRail items={STATS} />
          </div>
        </div>
      </div>
    </section>
  );
}
