import Tag from "@/components/atoms/Tag/Tag";
import styles from "./TechCard.module.css";

export default function TechCard({ index, title, text, tools }) {
  return (
    <li className={styles.card}>
      <header className={styles.head}>
        <span className={styles.index}>{index}</span>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <p className={styles.text}>{text}</p>

      <footer className={styles.foot}>
        <span className={styles.footLabel}>Ferramentas</span>
        <div className={styles.tools}>
          {tools.map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </div>
      </footer>
    </li>
  );
}
