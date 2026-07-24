import Logo from "@/components/atoms/Logo/Logo";
import { CONTACT } from "@/lib/contact";
import StripeDividers from "@/components/organisms/StripeDividers/StripeDividers";
import styles from "./Footer.module.css";

const NAV = [
  { label: "Início", href: "/" },
  { label: "Projetos", href: "/projetos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Processo", href: "/#processo" },
  { label: "Carreira", href: "/carreira" },
  { label: "Dúvidas", href: "/#duvidas" },
  { label: "Contato", href: "/#contato" },
];

function ArrowIcon() {
  return (
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
      <rect x="3.95" y="4.29" width="1.42" height="1.42" fill="currentColor" />
      <rect x="1.13" y="1.47" width="1.42" height="1.42" fill="currentColor" />
      <rect x="1.13" y="7.11" width="1.42" height="1.42" fill="currentColor" />
      <rect x="2.53" y="2.88" width="1.42" height="1.42" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.block}>
          <a className={styles.brand} href="/" aria-label="Patrick.Developer">
            <Logo size="lg" />
          </a>

          <h2 className={styles.heading}>
            Construo produtos digitais para quem não pode errar o prazo
          </h2>

          <p className={styles.text}>
            Se isso faz sentido para o seu projeto,{" "}
            <a
              className={styles.link}
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                "Olá Patrick! Vim pelo seu site e quero conversar sobre um projeto."
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>vamos conversar</span>
              <span className={styles.linkArrow} aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </p>
        </div>

        <div className={styles.bottom}>
          <nav className={styles.nav} aria-label="Rodapé">
            <ul className={styles.navList}>
              {NAV.map((item) => (
                <li key={item.label}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <form
              className={styles.newsletter}
              action={CONTACT.formspree}
              method="POST"
            >
              <div className={styles.inputWrap}>
                <input
                  id="footer-email"
                  required
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder=" "
                />
                <label className={styles.inputLabel} htmlFor="footer-email">
                  Deixe seu e-mail que eu te chamo
                </label>
              </div>
              <button
                className={styles.submit}
                type="submit"
                aria-label="Inscrever"
              >
                <span className={styles.submitArrow}>
                  <ArrowIcon />
                </span>
              </button>
            </form>

            <div className={styles.social}>
              <a
                className={styles.socialBtn}
                href="https://github.com/gsPatrick"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3z" />
                </svg>
              </a>
              <a
                className={styles.socialBtn}
                href="mailto:patricksiqueira.developer@gmail.com"
                aria-label="E-mail"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 4.76-8-4.76V6l8 4.76L20 6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <StripeDividers />
    </footer>
  );
}
