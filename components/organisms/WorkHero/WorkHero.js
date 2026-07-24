import Badge from "@/components/atoms/Badge/Badge";
import Kicker from "@/components/atoms/Kicker/Kicker";
import styles from "./WorkHero.module.css";

export default function WorkHero({ total, years }) {
  return (
    <header className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          <Kicker>trabalhos</Kicker>
          <Badge pulse>Agenda aberta para novos projetos</Badge>
        </div>

        <h1 className={styles.title}>
          Projetos que saíram
          <br />
          do papel e estão no{" "}
          <em className={styles.accent}>ar</em>.
        </h1>

        <div className={styles.foot}>
          <p className={styles.lead}>
            Cada projeto aqui começou com uma conversa, um escopo fechado e uma
            data. Passe o mouse no banner para ver o projeto ganhar cor.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className={styles.statValue}>{total}</dt>
              <dd className={styles.statLabel}>projetos nesta página</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statValue}>1,4s</dt>
              <dd className={styles.statLabel}>de carregamento médio</dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statValue}>100%</dt>
              <dd className={styles.statLabel}>entregues no seu nome</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
