import Button from "@/components/atoms/Button/Button";
import styles from "./Hiring.module.css";

export default function Hiring() {
  return (
    <section className={styles.section} id="hiring">
      <div className={styles.word} aria-hidden="true">
        HIRING
      </div>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Empresas · Recrutadores · Times de tech</span>

        <h2 className={styles.title}>
          Não é um projeto.
          <br />É uma <em className={styles.accent}>vaga</em>?
        </h2>

        <p className={styles.lead}>
          Além dos projetos por conta própria, estou aberto a posições
          full-time, squads de produto e contratos estratégicos. Tem uma página
          só sobre isso: experiência, formação, stack e currículo pra baixar.
        </p>

        <div className={styles.actions}>
          <Button href="/carreira" variant="primary" icon="→">
            Ver meu perfil profissional
          </Button>
          <Button
            href="/CV_Patrick_Gomes_Siqueira_PT_Final.pdf"
            variant="ghost"
          >
            Baixar currículo
          </Button>
        </div>
      </div>
    </section>
  );
}
