import styles from "./QuoteCard.module.css";

function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((star) => (
        <svg key={star} viewBox="0 0 24 24" width="12" height="12">
          <path
            fill="currentColor"
            d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3 1.1-6.5L2.6 9.3l6.5-.9z"
          />
        </svg>
      ))}
    </span>
  );
}

export default function QuoteCard({ item }) {
  return (
    <figure className={styles.card}>
      <header className={styles.head}>
        <Stars />
        <span className={styles.score}>{item.score}</span>
      </header>

      <blockquote className={styles.quote}>{item.quote}</blockquote>

      <figcaption className={styles.foot}>
        <span className={styles.project}>{item.project}</span>
        <span className={styles.meta}>
          {item.author ? (
            <>
              <span className={styles.author}>{item.author}</span>
              <span className={styles.sep} aria-hidden="true">
                ·
              </span>
            </>
          ) : null}
          <span className={styles.date}>{item.date}</span>
        </span>
      </figcaption>
    </figure>
  );
}
