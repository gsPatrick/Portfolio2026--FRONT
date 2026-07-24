import styles from "./StepCard.module.css";

export default function StepCard({ step, index, active }) {
  const slug = String(index + 1).padStart(2, "0");

  return (
    <article className={`${styles.card} ${active ? styles.on : ""}`}>
      <header className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.file}>etapa-{slug}</span>
        <span className={styles.when}>{step.when}</span>
      </header>

      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </div>

        <div className={styles.progress}>
          <div className={styles.track} aria-hidden="true">
            <span className={styles.fill} />
          </div>
          <span className={styles.count}>
            {step.items.length}/{step.items.length}
          </span>
        </div>

        <ul className={styles.checklist}>
          {step.items.map((item) => (
            <li className={styles.item} key={item}>
              <span className={styles.box} aria-hidden="true">
                <svg viewBox="0 0 12 12" width="9" height="9">
                  <path
                    d="M2 6.4l2.6 2.6L10 3.2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
              <span className={styles.itemText}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
