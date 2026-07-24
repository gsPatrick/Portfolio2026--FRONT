import styles from "./StepList.module.css";

export default function StepList({ steps, active }) {
  return (
    <ol className={styles.list}>
      {steps.map((step, index) => (
        <li
          className={`${styles.item} ${index === active ? styles.on : ""} ${
            index < active ? styles.done : ""
          }`}
          key={step.title}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.index}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={styles.label}>{step.title}</span>
        </li>
      ))}
    </ol>
  );
}
