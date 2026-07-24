import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
import Kicker from "@/components/atoms/Kicker/Kicker";
import { CAREER } from "@/lib/career";
import { CONTACT } from "@/lib/contact";
import styles from "./CareerHero.module.css";

const HIRE_MESSAGE =
  "Olá Patrick! Vi seu perfil e gostaria de conversar sobre uma oportunidade.";

export default function CareerHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          <Kicker>perfil profissional</Kicker>
          <Badge pulse>Aberto a novas oportunidades</Badge>
        </div>

        <h1 className={styles.name}>Patrick Gomes Siqueira</h1>

        <p className={styles.role}>
          {CAREER.title} · {CAREER.stack} · {CAREER.location}
        </p>

        <p className={styles.pitch}>{CAREER.pitch}</p>

        <div className={styles.actions}>
          <Button
            href="/CV_Patrick_Gomes_Siqueira_PT_Final.pdf"
            variant="dark"
            icon="↓"
          >
            CV — Português
          </Button>
          <Button
            href="/CV_Patrick_Gomes_Siqueira_EN_Final.pdf"
            variant="outline"
          >
            CV — English
          </Button>
          <Button
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
              HIRE_MESSAGE
            )}`}
            variant="outline"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
}
