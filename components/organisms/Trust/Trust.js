import CredentialCard from "@/components/molecules/CredentialCard/CredentialCard";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import { PROFILES } from "@/lib/testimonials";
import styles from "./Trust.module.css";

const CREDENTIALS = [
  {
    label: "estrutura empresarial",
    value: "CNPJ 58.315.507/0001-14",
    text: "Como Patrick.Developer, ofereço a formalidade de uma empresa quando o seu negócio precisa. Se preferir algo mais simples, também dá.",
  },
  {
    label: "nota fiscal",
    value: "Disponível se precisar",
    text: "Para atender às exigências fiscais da sua empresa, emito Nota Fiscal (NF-e) para todos os projetos. Só pedir.",
  },
  {
    label: "contrato",
    value: "Opcional, mas recomendado",
    text: "Podemos formalizar a parceria com um contrato de serviço, garantindo clareza e segurança para os dois lados.",
  },
];

const PLATFORMS = [
  { value: "Top 30", label: "no ranking do 99Freelas" },
  { value: "60+", label: "projetos entregues nas plataformas" },
  { value: "100%", label: "dos projetos com contrato assinado" },
];

export default function Trust() {
  return (
    <section className={styles.section} id="seguranca">
      <div className={styles.inner}>
        <SectionHead
          layout="split"
          kicker="parceria flexível e profissional"
          title={"A formalidade que você\nquiser. Nem mais, nem *menos*."}
          lead="Tem empresa que precisa de CNPJ, nota fiscal e contrato. Tem gente que só quer o site pronto e rápido. Eu me adapto aos dois: a estrutura formal está disponível quando você precisa, e nunca vira burocracia quando não precisa."
        />

        <ul className={styles.grid}>
          {CREDENTIALS.map((item) => (
            <CredentialCard
              key={item.label}
              label={item.label}
              value={item.value}
              text={item.text}
            />
          ))}
        </ul>

        <div className={styles.platforms}>
          <div className={styles.platformsHead}>
            <span className={styles.platformsLabel}>
              <span className={styles.pip} aria-hidden="true" />
              histórico público
            </span>
            <p className={styles.platformsTitle}>
              Meu trabalho já é avaliado por clientes reais no Workana e no
              99Freelas, e a nota está lá para você conferir antes de me
              contratar.
            </p>
          </div>

          <div className={styles.platformLinks}>
            <a
              className={styles.platformLink}
              href={PROFILES.workana}
              target="_blank"
              rel="noreferrer"
            >
              Workana
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className={styles.platformLink}
              href={PROFILES.freelas}
              target="_blank"
              rel="noreferrer"
            >
              99Freelas
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <dl className={styles.stats}>
            {PLATFORMS.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
