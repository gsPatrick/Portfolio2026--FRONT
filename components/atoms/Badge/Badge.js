import styles from "./Badge.module.css";

export default function Badge({ children, pulse = false, size = "md" }) {
  return (
    <span className={`${styles.badge} ${styles[size]}`}>
      {pulse ? (
        <span className={styles.dot} aria-hidden="true">
          <span className={styles.ping} />
        </span>
      ) : null}
      {children}
    </span>
  );
}
