import Kicker from "@/components/atoms/Kicker/Kicker";
import RevealText from "@/components/atoms/RevealText/RevealText";
import styles from "./SectionHead.module.css";

export default function SectionHead({ kicker, title, lead, layout = "stack" }) {
  return (
    <div className={`${styles.head} ${styles[layout]}`}>
      <Kicker>{kicker}</Kicker>

      <div className={styles.body}>
        <RevealText as="h2" className={styles.title} text={title} />
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
    </div>
  );
}
