import BgVideo from "@/components/atoms/BgVideo/BgVideo";
import Kicker from "@/components/atoms/Kicker/Kicker";
import styles from "./About.module.css";

const FACTS = [
  { value: "7", label: "anos de estrada" },
  { value: "60+", label: "projetos entregues" },
  { value: "1", label: "pessoa do início ao fim" },
];

export default function About() {
  return (
    <section className={styles.section} id="sobre">
      <div className={styles.inner}>
        <div className={styles.figure}>
          <BgVideo src="/media/patrick.mp4" className={styles.video} />
        </div>

        <div className={styles.body}>
          <Kicker>quem resolve</Kicker>

          <p className={styles.role}>
            Patrick Gomes Siqueira · Desenvolvedor full-stack · CNPJ próprio
          </p>

          <h2 className={styles.name}>
            Você não contrata código.
            <br />
            Contrata o problema <em className={styles.accent}>resolvido</em>.
          </h2>

          <div className={styles.text}>
            <p className={styles.copy}>
              Antes da primeira linha eu entendo onde o seu negócio trava: o que
              a equipe faz na mão, onde o cliente desiste, qual processo custa
              caro. A tecnologia vem depois, e só a que resolve aquilo.
            </p>

            <p className={styles.copy}>
              Aí eu construo a solução inteira: SaaS, automação, sistema ou site
              que vende. Telas, código, banco de dados, integrações e
              publicação. E continuo do seu lado depois da entrega, porque
              projeto que ninguém consegue manter volta a ser problema.
            </p>
          </div>

          <dl className={styles.facts}>
            {FACTS.map((fact) => (
              <div className={styles.fact} key={fact.label}>
                <dt className={styles.factValue}>{fact.value}</dt>
                <dd className={styles.factLabel}>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
