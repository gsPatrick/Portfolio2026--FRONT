import styles from "./Logo.module.css";

export default function Logo({ size = "md" }) {
  return (
    <span className={`${styles.logo} ${styles[size]}`}>
      Patrick
      <span className={styles.dot}>.</span>
      <span className={styles.suffix}>Developer</span>
    </span>
  );
}
