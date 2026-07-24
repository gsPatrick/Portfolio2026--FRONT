import NavBar from "@/components/organisms/NavBar/NavBar";
import Hero from "@/components/organisms/Hero/Hero";
import Comparison from "@/components/organisms/Comparison/Comparison";
import WorkShowcase from "@/components/organisms/WorkShowcase/WorkShowcase";
import About from "@/components/organisms/About/About";
import Testimonials from "@/components/organisms/Testimonials/Testimonials";
import Services from "@/components/organisms/Services/Services";
import Process from "@/components/organisms/Process/Process";
import Tech from "@/components/organisms/Tech/Tech";
import Trust from "@/components/organisms/Trust/Trust";
import Faq from "@/components/organisms/Faq/Faq";
import Contact from "@/components/organisms/Contact/Contact";
import Hiring from "@/components/organisms/Hiring/Hiring";
import Footer from "@/components/organisms/Footer/Footer";
import FooterBackground from "@/components/organisms/FooterBackground/FooterBackground";
import JsonLd from "@/components/system/JsonLd/JsonLd";
import { servicesGraph, faqGraph } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={servicesGraph()} />
      <JsonLd data={faqGraph()} />
      <NavBar />
      <main className={styles.main}>
        <Hero />
        <About />
        <Comparison />
        <WorkShowcase
          tone="light"
          compact
          limit={5}
          kicker="trabalhos"
          title={"Projeto real, no ar,\ncom nome e *resultado*."}
          lead="Nada de tela genérica de banco de imagem. Cada um destes começou com uma conversa, teve escopo fechado e está funcionando hoje."
          cta={{
            text: "Tem mais projeto do que cabe aqui.",
            label: "Ver todos os projetos",
            href: "/projetos",
          }}
        />
        <Testimonials />
        <Services />
        <Process />
        <Tech />
        <Trust />
        <Faq />
        <Contact />
        <Hiring />
      </main>
      <Footer />
      <FooterBackground />
    </>
  );
}
