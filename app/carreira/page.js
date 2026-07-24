import NavBar from "@/components/organisms/NavBar/NavBar";
import CareerHero from "@/components/organisms/CareerHero/CareerHero";
import CareerBody from "@/components/organisms/CareerBody/CareerBody";
import Footer from "@/components/organisms/Footer/Footer";
import FooterBackground from "@/components/organisms/FooterBackground/FooterBackground";
import JsonLd from "@/components/system/JsonLd/JsonLd";
import { breadcrumbGraph } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = {
  title: { absolute: "Carreira | Patrick Gomes Siqueira — Desenvolvedor Full Stack" },
  description:
    "A trajetória de Patrick Gomes Siqueira: experiência como Senior Full Stack Engineer, formação acadêmica, stack de tecnologias e currículo (PT/EN) para download.",
  alternates: { canonical: "/carreira" },
  openGraph: {
    title: "Carreira | Patrick Gomes Siqueira",
    description:
      "Senior Full Stack Engineer. Experiência, formação, stack e currículo para download.",
    url: "/carreira",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function Carreira() {
  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Início", path: "/" },
          { name: "Carreira", path: "/carreira" },
        ])}
      />
      <NavBar lightHero />
      <main className={styles.main}>
        <CareerHero />
        <CareerBody />
      </main>
      <Footer />
      <FooterBackground />
    </>
  );
}
