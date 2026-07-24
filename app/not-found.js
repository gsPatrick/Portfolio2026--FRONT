import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Essa página não existe (ou saiu do ar).</h1>
        <p className={styles.lead}>
          O link pode estar errado ou o conteúdo mudou de lugar. Vamos te levar
          de volta para o caminho certo.
        </p>
        <nav className={styles.actions} aria-label="Links principais">
          <Link className={styles.primary} href="/">
            Voltar para o início
          </Link>
          <Link className={styles.ghost} href="/projetos">
            Ver projetos
          </Link>
          <Link className={styles.ghost} href="/#contato">
            Falar comigo
          </Link>
        </nav>
      </div>
    </main>
  );
}
