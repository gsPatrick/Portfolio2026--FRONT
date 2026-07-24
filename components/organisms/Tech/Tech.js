import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import TechCard from "@/components/molecules/TechCard/TechCard";
import styles from "./Tech.module.css";

const AREAS = [
  {
    title: "O que aparece na tela",
    text: "As telas que o seu cliente usa. Feitas para abrir rápido, funcionar igual no celular e no computador e não travar quando muita gente acessa junto.",
    tools: ["Next.js", "React", "React Native", "Design responsivo"],
  },
  {
    title: "O que funciona por trás",
    text: "A parte que ninguém vê: onde ficam guardados cadastros, pedidos e pagamentos. É o que precisa ser seguro e não pode perder informação.",
    tools: ["Node.js", "PostgreSQL", "Autenticação", "Backup automático"],
  },
  {
    title: "Onde o projeto fica no ar",
    text: "Servidor, domínio e certificado de segurança. É o que mantém tudo funcionando 24 horas por dia, e o que faz voltar rápido se algo cair.",
    tools: ["Vercel", "AWS", "Certificado SSL", "Monitoramento"],
  },
  {
    title: "O que conecta com o resto",
    text: "Seu projeto conversando com o que a sua empresa já usa: receber pagamento, disparar WhatsApp, mandar e-mail, puxar dado de planilha ou sistema.",
    tools: ["Pagamento online", "WhatsApp", "E-mail automático", "Integrações"],
  },
];

export default function Tech() {
  return (
    <section className={styles.section} id="tecnologias">
      <div className={styles.inner}>
        <SectionHead
          layout="split"
          kicker="tecnologias"
          title={"A parte técnica\né *comigo*."}
          lead="Você não precisa entender nenhum nome desta lista. Mas vale saber o que cada pedaço faz no seu projeto. É isso que decide se ele vai ser rápido, seguro e barato de manter depois que eu entregar."
        />

        <ul className={styles.grid}>
          {AREAS.map((area, index) => (
            <TechCard
              key={area.title}
              index={String(index + 1).padStart(2, "0")}
              title={area.title}
              text={area.text}
              tools={area.tools}
            />
          ))}
        </ul>

        <p className={styles.note}>
          <span className={styles.noteMark} aria-hidden="true" />
          Tecnologia da moda encarece manutenção e prende você a quem escolheu.
          Eu uso o que é estável, tem comunidade grande e qualquer bom
          desenvolvedor consegue continuar depois de mim.
        </p>
      </div>
    </section>
  );
}
