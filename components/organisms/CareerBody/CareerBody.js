import Tag from "@/components/atoms/Tag/Tag";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import { EDUCATION, EXPERIENCE, SKILLS } from "@/lib/career";
import { PROJECTS } from "@/lib/projects";
import styles from "./CareerBody.module.css";

const SAAS = PROJECTS.filter((p) => p.category === "SaaS e plataformas");

export default function CareerBody() {
  return (
    <>
      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.inner}>
          <SectionHead
            layout="split"
            kicker="experiência"
            title={"Onde eu já\ntrabalhei."}
            lead="Sete anos entre produto próprio e times de tecnologia, sempre como PJ e 100% remoto. Hoje concilio um emprego full-time com os projetos que atendo como freelancer."
          />

          <ol className={styles.timeline}>
            {EXPERIENCE.map((company) => {
              const multi = company.roles.length > 1;
              return (
                <li className={styles.company} key={company.company}>
                  <div className={styles.companyTop}>
                    {company.logo ? (
                      <span
                        className={`${styles.logo} ${styles.logoImg}`}
                        aria-hidden="true"
                      >
                        <img src={company.logo} alt="" />
                      </span>
                    ) : (
                      <span className={styles.logo} aria-hidden="true">
                        {company.company.charAt(0)}
                      </span>
                    )}
                    <div className={styles.companyInfo}>
                      <h3 className={styles.companyName}>{company.company}</h3>
                      <span className={styles.companySpan}>
                        {company.span} · {company.field}
                      </span>
                      <span className={styles.companyMode}>{company.mode}</span>
                    </div>
                  </div>

                  <div
                    className={`${styles.roles} ${multi ? styles.nested : ""}`}
                  >
                    {company.roles.map((role) => (
                      <div className={styles.role} key={role.title}>
                        {multi ? (
                          <span className={styles.roleDot} aria-hidden="true" />
                        ) : null}
                        <div className={styles.roleBody}>
                          <h4 className={styles.roleTitle}>
                            {role.title}
                            {role.tag ? (
                              <span className={styles.roleTag}>{role.tag}</span>
                            ) : null}
                          </h4>
                          <span className={styles.rolePeriod}>
                            {role.period}
                          </span>
                          <p className={styles.roleText}>{role.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.inner}>
          <div className={styles.block}>
            <SectionHead
              layout="split"
              kicker="formação"
              title={"Formação\n*acadêmica*."}
              lead="Base prática no técnico, aprofundamento teórico na faculdade. Os dois se completam no que eu entrego."
            />

            <ul className={styles.eduList}>
              {EDUCATION.map((item) => (
                <li className={styles.edu} key={item.course}>
                  <span
                    className={`${styles.eduLogo} ${styles.eduLogoImg}`}
                    aria-hidden="true"
                  >
                    <img src={item.logo} alt="" />
                  </span>

                  <div className={styles.eduBody}>
                    <div className={styles.eduHead}>
                      <h3 className={styles.eduSchool}>{item.school}</h3>
                      <span
                        className={`${styles.eduBadge} ${
                          item.status === "Cursando" ? styles.eduActive : ""
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <span className={styles.eduCourse}>{item.course}</span>
                    <span className={styles.eduPeriod}>{item.period}</span>

                    <p className={styles.eduLearned}>{item.learned}</p>

                    <p className={styles.eduTopics}>
                      <span className={styles.eduGem} aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                          <path
                            d="M6 3h12l3 5-9 13L3 8z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {item.topics.join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <SectionHead
              layout="split"
              kicker="stack"
              title={"O foco é o problema.\nA stack é só a *ferramenta*."}
              lead="Não me caso com linguagem nenhuma. Primeiro entendo o que precisa ser resolvido, depois escolho a tecnologia certa para aquilo. Tenho especialização de sobra em cada uma destas — mas elas são meio, não fim."
            />

            <ul className={styles.skills}>
              {SKILLS.map((group) => (
                <li className={styles.skillRow} key={group.group}>
                  <span className={styles.skillLabel}>{group.group}</span>
                  <div className={styles.skillTags}>
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.light}`}>
        <div className={styles.inner}>
          <SectionHead
            layout="split"
            kicker="produtos que construí"
            title={"SaaS e plataformas\nno *ar*."}
            lead="Estes são produtos próprios ou de clientes que estão funcionando hoje. Veja todos, com o site rodando por dentro, na página de projetos."
          />

          <div className={styles.highlights}>
            {SAAS.map((project) => (
              <a
                className={styles.highlight}
                href="/projetos"
                key={project.slug}
              >
                <span className={styles.highlightMeta}>
                  <span className={styles.highlightField}>
                    {project.category}
                  </span>
                  <span className={styles.highlightYear}>{project.year}</span>
                </span>
                <h3 className={styles.highlightTitle}>{project.name}</h3>
                <p className={styles.highlightText}>{project.summary}</p>
                <div className={styles.highlightTools}>
                  {project.tools.map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
