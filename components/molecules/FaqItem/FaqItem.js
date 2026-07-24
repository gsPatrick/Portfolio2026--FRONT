import styles from "./FaqItem.module.css";

export default function FaqItem({ id, index, question, answer, open, onToggle }) {
  return (
    <li className={`${styles.item} ${open ? styles.open : ""}`}>
      <h3 className={styles.heading}>
        <button
          className={styles.trigger}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          id={`faq-trigger-${id}`}
        >
          <span className={styles.index}>{index}</span>
          <span className={styles.question}>{question}</span>
          <span className={styles.icon} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </h3>

      <div
        className={styles.panel}
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-trigger-${id}`}
      >
        <div className={styles.panelInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </li>
  );
}
