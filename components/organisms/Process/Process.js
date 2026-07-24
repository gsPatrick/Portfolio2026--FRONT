"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import StepCard from "@/components/molecules/StepCard/StepCard";
import StepList from "@/components/molecules/StepList/StepList";
import styles from "./Process.module.css";

const STEPS = [
  {
    title: "Conversa",
    when: "dia 1 · 30 minutos",
    text: "Gratuito e sem compromisso. Se eu não for a pessoa certa para o seu caso, eu digo na hora.",
    items: [
      "Entender o objetivo do projeto",
      "Levantar o que já existe hoje",
      "Apontar riscos e o que não vale a pena",
      "Dizer se dá para fazer no seu prazo",
    ],
  },
  {
    title: "Proposta fechada",
    when: "no mesmo dia",
    text: "Tudo por escrito, antes de qualquer pagamento. Sem valor por hora e sem cláusula escondida.",
    items: [
      "Escopo detalhado do que será feito",
      "Lista do que não está incluído",
      "Prazo de cada etapa",
      "Preço final fechado",
    ],
  },
  {
    title: "Desenho das telas",
    when: "primeira semana",
    text: "Mudar o desenho custa minutos. Mudar o código pronto custa semanas. Por isso ele vem antes.",
    items: [
      "Mapa das telas e do caminho do cliente",
      "Layout com a sua marca aplicada",
      "Protótipo navegável para clicar",
      "Ajustes até você aprovar",
    ],
  },
  {
    title: "Construção",
    when: "toda semana",
    text: "Nada acontece escondido. Toda semana tem coisa nova para você testar com as próprias mãos.",
    items: [
      "Link de teste atualizado toda semana",
      "Telas funcionando de verdade",
      "Retorno das suas observações",
      "Correções antes de seguir adiante",
    ],
  },
  {
    title: "Publicação",
    when: "final do projeto",
    text: "Tudo registrado em contas no seu nome. Nada fica preso comigo.",
    items: [
      "Testes no celular e no computador",
      "Domínio e servidor configurados",
      "Publicação nas contas no seu nome",
      "Entrega dos acessos e do código",
    ],
  },
  {
    title: "Depois da entrega",
    when: "7 dias inclusos",
    text: "Você sai sabendo mexer no que dá para mexer sozinho. Manutenção só se você quiser.",
    items: [
      "7 dias de ajustes sem custo",
      "Treinamento para usar o sistema",
      "Documentação do que foi feito",
      "Plano de manutenção opcional",
    ],
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    if (window.matchMedia("(max-width: 1024px)").matches) return;

    let frame = 0;
    let current = -1;

    const measure = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = track.offsetHeight - window.innerHeight;
      if (distance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      sticky.style.setProperty("--progress", progress.toFixed(4));

      const next = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length)
      );

      if (next !== current) {
        current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.section} id="processo">
      <div className={styles.track} ref={trackRef}>
        <div className={styles.sticky} ref={stickyRef}>
          <div className={styles.inner}>
            <SectionHead
              layout="split"
              kicker="como funciona"
              title={"Seis etapas.\nNenhuma *surpresa*."}
              lead="Do primeiro contato até o projeto no ar, você sempre sabe em que ponto está, o que vem depois e quanto falta."
            />

            <div className={styles.panel}>
              <div className={styles.rail}>
                <StepList steps={STEPS} active={active} />
                <div className={styles.progress} aria-hidden="true">
                  <span className={styles.progressFill} />
                </div>
              </div>

              <div className={styles.stage}>
                {STEPS.map((step, index) => (
                  <StepCard
                    key={step.title}
                    step={step}
                    index={index}
                    active={index === active}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
