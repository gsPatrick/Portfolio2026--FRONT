import styles from "./StripeDividers.module.css";

const BANDS = ["one", "two", "three"];

export default function StripeDividers() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {BANDS.map((band) => (
        <div className={styles.band} key={band}>
          <div className={`${styles.color} ${styles[band]}`} />
          <div className={styles.line} />
        </div>
      ))}
    </div>
  );
}
