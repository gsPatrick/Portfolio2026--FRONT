import styles from "./ChannelList.module.css";

export default function ChannelList({ channels }) {
  return (
    <ul className={styles.list}>
      {channels.map((channel) => (
        <li key={channel.label}>
          <a
            className={styles.channel}
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noreferrer" : undefined}
          >
            <span className={styles.label}>{channel.label}</span>
            <span className={styles.value}>{channel.value}</span>
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
