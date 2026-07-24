import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import ServiceRow from "@/components/molecules/ServiceRow/ServiceRow";
import { SERVICES } from "@/lib/services";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className={styles.section} id="servicos">
      <div className={styles.inner}>
        <SectionHead
          layout="split"
          kicker="serviços"
          title={"Site, loja, sistema,\nautomação ou *SaaS*."}
          lead="Você fala com uma pessoa só, do começo ao fim. Desenho das telas, programação, banco de dados, integrações, colocar no ar e o suporte depois da entrega. Tudo comigo, sem repassar para terceiros."
        />

        <div className={styles.listHead}>
          <span className={styles.listLabel}>O que eu construo</span>
          <span className={styles.listCount}>
            {String(SERVICES.length).padStart(2, "0")} frentes
          </span>
        </div>

        <ul className={styles.list}>
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.title}
              index={String(index + 1).padStart(2, "0")}
              title={service.title}
              description={service.description}
              tags={service.tags}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
