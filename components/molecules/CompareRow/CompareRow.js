import styles from "./CompareRow.module.css";

export default function CompareRow({ index, pain, fix, visible = false }) {
  return (
    <li className={`${styles.row} ${visible ? styles.on : ""}`}>
      <span className={styles.index}>{index}</span>

      <div className={styles.pain}>
        <span className={styles.iconPain} aria-hidden="true">
          <svg viewBox="0 0 12 12" width="10" height="10">
            <path
              d="M2 2l8 8M10 2l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className={styles.painText}>{pain}</p>
      </div>

      <span className={styles.link} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path
            d="M4 12h15M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <div className={styles.fix}>
        <span className={styles.iconFix} aria-hidden="true">
          <svg viewBox="0 0 12 12" width="10" height="10">
            <path
              d="M2 6.4l2.6 2.6L10 3.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
        <p className={styles.fixText}>{fix}</p>
      </div>
    </li>
  );
}
