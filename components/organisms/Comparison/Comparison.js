"use client";

import { useEffect, useRef, useState } from "react";
import CompareRow from "@/components/molecules/CompareRow/CompareRow";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import styles from "./Comparison.module.css";

const ROWS = [
  {
    pain: "Prazo que escorrega toda semana e nunca tem data final.",
    fix: "Data de entrega no contrato, com marcos validados a cada semana.",
  },
  {
    pain: "Escopo que muda no meio e vira discussão sobre o que foi combinado.",
    fix: "Escopo fechado por escrito antes da primeira linha de código.",
  },
  {
    pain: "Some por dias e você não sabe se o projeto andou.",
    fix: "Atualização a cada entrega, no seu canal, sem você precisar cobrar.",
  },
  {
    pain: "Código sem teste, sem documentação e refém de quem escreveu.",
    fix: "Testes, deploy automatizado e documentação que fica com você.",
  },
  {
    pain: "Cobrança por hora, orçamento que cresce e nenhuma previsibilidade.",
    fix: "Preço fechado por fase. O que sair disso, você aprova antes.",
  },
];

export default function Comparison() {
  const [visible, setVisible] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="diferencial">
      <div className={styles.inner}>
        <SectionHead
          layout="split"
          kicker="o diferencial"
          title={"O mercado de dev freelance\nestá *quebrado*."}
          lead="Eu trabalho pelo oposto de cada ponto. Estes são os cinco que mais derrubam um projeto freelance. À esquerda, como costuma ser no mercado. À direita, como funciona comigo."
        />

        <div className={styles.board}>
          <div className={styles.columns} aria-hidden="true">
            <span />
            <span className={`${styles.colLabel} ${styles.colLabelLeft}`}>
              O mercado
            </span>
            <span />
            <span className={`${styles.colLabel} ${styles.colLabelPanel}`}>
              <span className={styles.pip} />
              Como eu trabalho
            </span>
          </div>

          <ul className={styles.list} ref={listRef}>
            {ROWS.map((row, index) => (
              <CompareRow
                key={row.fix}
                index={String(index + 1).padStart(2, "0")}
                pain={row.pain}
                fix={row.fix}
                visible={visible}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
