import NavBar from "@/components/organisms/NavBar/NavBar";
import WorkShowcase from "@/components/organisms/WorkShowcase/WorkShowcase";
import WorkHero from "@/components/organisms/WorkHero/WorkHero";
import Footer from "@/components/organisms/Footer/Footer";
import FooterBackground from "@/components/organisms/FooterBackground/FooterBackground";
import JsonLd from "@/components/system/JsonLd/JsonLd";
import { PROJECTS } from "@/lib/projects";
import { breadcrumbGraph } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = {
  title: "Projetos entregues",
  description:
    "Sites, lojas virtuais, sistemas e aplicativos reais entregues do escopo ao deploy, com nome e resultado. Veja o que já está no ar e comece o seu.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos entregues | Patrick.Developer",
    description:
      "Projetos reais no ar, com nome e resultado. Sites, lojas, sistemas e aplicativos do escopo ao deploy.",
    url: "/projetos",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function Projetos() {
  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projetos" },
        ])}
      />
      <NavBar lightHero />
      <main className={styles.main}>
        <WorkHero total={String(PROJECTS.length).padStart(2, "0")} years="7" />
        <WorkShowcase tone="light" />
      </main>
      <Footer />
      <FooterBackground />
    </>
  );
}
