import styles from "./StatRail.module.css";

export default function StatRail({ items }) {
  return (
    <dl className={styles.rail}>
      {items.map((item) => (
        <div className={styles.item} key={item.label}>
          <dt className={styles.value}>{item.value}</dt>
          <dd className={styles.label}>{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}
