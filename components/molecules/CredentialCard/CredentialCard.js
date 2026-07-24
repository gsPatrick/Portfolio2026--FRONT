import styles from "./CredentialCard.module.css";

export default function CredentialCard({ label, value, text }) {
  return (
    <li className={styles.card}>
      <span className={styles.label}>
        <span className={styles.pip} aria-hidden="true" />
        {label}
      </span>

      <p className={styles.value}>{value}</p>
      <p className={styles.text}>{text}</p>
    </li>
  );
}
