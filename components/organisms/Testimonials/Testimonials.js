import QuoteCard from "@/components/molecules/QuoteCard/QuoteCard";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import { PROFILES, REVIEW_STATS, TESTIMONIALS } from "@/lib/testimonials";
import styles from "./Testimonials.module.css";

const half = Math.ceil(TESTIMONIALS.length / 2);
const ROW_ONE = TESTIMONIALS.slice(0, half);
const ROW_TWO = TESTIMONIALS.slice(half);

const STATS = [
  { value: REVIEW_STATS.average, label: "de nota, em 5 possíveis" },
  { value: REVIEW_STATS.total, label: "clientes já avaliaram" },
  { value: REVIEW_STATS.fiveStars, label: "deram a nota máxima" },
];

function Row({ items, reverse }) {
  return (
    <div className={`${styles.row} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.track}>
        {[...items, ...items].map((item, index) => (
          <QuoteCard key={`${item.project}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className={styles.section} id="depoimentos">
      <div className={styles.head}>
        <SectionHead
          layout="split"
          kicker="depoimentos"
          title={"Quem contratou uma vez,\n*volta* a contratar."}
          lead="Não são frases que eu escrevi. São 60 avaliações deixadas por clientes reais no Workana e no 99Freelas, cada uma com o nome do serviço e a data. A nota média ficou em 4,9 de 5."
        />

        <div className={styles.verify}>
          <span className={styles.verifyLabel}>Confira você mesmo</span>
          <a
            className={styles.verifyLink}
            href={PROFILES.workana}
            target="_blank"
            rel="noreferrer"
          >
            Perfil no Workana
            <span aria-hidden="true">↗</span>
          </a>
          <a
            className={styles.verifyLink}
            href={PROFILES.freelas}
            target="_blank"
            rel="noreferrer"
          >
            Perfil no 99Freelas
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <dl className={styles.stats}>
          {STATS.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.rows}>
        <Row items={ROW_ONE} />
        <Row items={ROW_TWO} reverse />
      </div>
    </section>
  );
}
