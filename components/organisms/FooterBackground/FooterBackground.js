import BgVideo from "@/components/atoms/BgVideo/BgVideo";
import styles from "./FooterBackground.module.css";

export default function FooterBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.inner}>
        <div className={styles.gradient} />
        <BgVideo
          src="/media/hero-loop.mp4"
          poster="/media/hero-poster.jpg"
          className={styles.video}
        />
        <div className={styles.bar}>
          <span>© 2026 Patrick.Developer · CNPJ 58.315.507/0001-14</span>
          <a href="https://www.codebypatrick.dev" target="_blank" rel="noreferrer">
            codebypatrick.dev
          </a>
        </div>
      </div>
    </div>
  );
}
