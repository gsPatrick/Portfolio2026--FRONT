"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import FaqItem from "@/components/molecules/FaqItem/FaqItem";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import { FAQ as QUESTIONS } from "@/lib/faq";
import styles from "./Faq.module.css";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.section} id="duvidas">
      <div className={styles.inner}>
        <div className={styles.aside}>
          <SectionHead
            kicker="dúvidas"
            title={"Perguntas de quem\nvai *contratar*."}
            lead="Se a sua não estiver aqui, é só perguntar. Respondo no mesmo dia."
          />

          <Button href="#contato" variant="dark" icon="→">
            Tirar minha dúvida
          </Button>
        </div>

        <ul className={styles.list}>
          {QUESTIONS.map((item, index) => (
            <FaqItem
              key={item.question}
              id={index}
              index={String(index + 1).padStart(2, "0")}
              question={item.question}
              answer={item.answer}
              open={open === index}
              onToggle={() => setOpen(open === index ? -1 : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
