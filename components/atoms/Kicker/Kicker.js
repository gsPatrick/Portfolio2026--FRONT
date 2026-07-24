import styles from "./Kicker.module.css";

export default function Kicker({ children, as = "span" }) {
  const Tag = as;
  return (
    <Tag className={styles.kicker}>
      <span className={styles.rule} aria-hidden="true" />
      {children}
    </Tag>
  );
}
