// Fonte única de verdade para SEO: domínio, identidade e geradores de JSON-LD.
// Domínio de produção confirmado: https://www.codebypatrick.dev (com www).

import { FAQ } from "@/lib/faq";
import { SERVICES } from "@/lib/services";

export const SITE = {
  url: "https://www.codebypatrick.dev",
  name: "Patrick.Developer",
  personName: "Patrick Gomes Siqueira",
  jobTitle: "Desenvolvedor Full Stack",
  cnpj: "58.315.507/0001-14",
  github: "https://github.com/gsPatrick",
  whatsapp: "5571982862912",
  email: "patricksiqueira.developer@gmail.com",
  ogImage: "/og.png",
  locale: "pt_BR",
  region: "BA",
  country: "BR",
  reviews: { average: 4.9, count: 60, best: 5 },

  // Perfis oficiais (sameAs). SÓ URLs reais confirmadas — nada inventado.
  // Ligam a marca "Patrick.Developer" à autoridade do nome pessoal.
  // (Instagram/Behance não existem — confirmado pelo Patrick.)
  profiles: [
    "https://www.linkedin.com/in/patrick-siqueira-2833a4264/",
    "https://github.com/gsPatrick",
    "https://www.workana.com/freelancer/977647b4044843eea7e5c7811a8c1463",
    "https://www.99freelas.com.br/user/Patrickpgs",
  ],
};

// URL absoluta a partir de um caminho relativo.
export const abs = (path = "/") => new URL(path, SITE.url).toString();

// ---- Geradores de JSON-LD (schema.org) ----

// Grafo global: aplica ao site inteiro (vai no layout).
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE.url}/#person` },
        // Frescor: reflete a data do último build/deploy (real, não inventado).
        dateModified: new Date().toISOString(),
      },
      {
        // Uma pessoa e uma marca são a MESMA entidade: o Person carrega a
        // autoridade do nome; a Organization é a marca comercial.
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.personName,
        alternateName: ["Patrick Siqueira", "Patrick.Developer"],
        url: SITE.url,
        jobTitle: SITE.jobTitle,
        email: `mailto:${SITE.email}`,
        image: abs(SITE.ogImage),
        description:
          "Patrick Gomes Siqueira é desenvolvedor full-stack há 7 anos, com mais de 60 projetos entregues para pequenos negócios e startups. Cria SaaS, automações, sistemas, lojas virtuais, sites e aplicativos sob medida, do escopo ao deploy, com CNPJ próprio, Nota Fiscal e contrato. Atende 100% remoto em todo o Brasil.",
        knowsAbout: [
          "Desenvolvimento full-stack",
          "SaaS",
          "Automação de processos",
          "Sistemas web",
          "Lojas virtuais e e-commerce",
          "Aplicativos mobile",
          "Next.js",
          "React",
          "Node.js",
        ],
        sameAs: SITE.profiles,
        worksFor: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.personName,
        url: SITE.url,
        taxID: SITE.cnpj,
        email: `mailto:${SITE.email}`,
        founder: { "@id": `${SITE.url}/#person` },
        employee: { "@id": `${SITE.url}/#person` },
        logo: { "@type": "ImageObject", url: abs(SITE.ogImage) },
        sameAs: SITE.profiles,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#service`,
        name: "Patrick.Developer — Desenvolvimento de software sob medida",
        url: SITE.url,
        image: abs(SITE.ogImage),
        telephone: `+${SITE.whatsapp}`,
        priceRange: "$$",
        areaServed: { "@type": "Country", name: "Brasil" },
        address: {
          "@type": "PostalAddress",
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        provider: { "@id": `${SITE.url}/#person` },
        description:
          "Desenvolvimento de SaaS, automações, sistemas, lojas virtuais e sites do escopo ao deploy, com escopo e preço fechados, entrega semanal e Nota Fiscal.",
        // NOTA: sem aggregateRating/Review apontando para a própria Organization/Person.
        // O Google trata isso como avaliação "self-serving" (proibida desde 2019):
        // não gera estrela e pode render ação manual. Os depoimentos e a nota 4,9
        // ficam como TEXTO REAL VISÍVEL na página — que é o que a IA cita.
      },
    ],
  };
}

// Lista de Serviços (home).
export function servicesGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": SERVICES.map((s, i) => ({
      "@type": "Service",
      "@id": `${SITE.url}/#service-${i + 1}`,
      name: s.title,
      description: s.description,
      serviceType: s.title,
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: { "@type": "Country", name: "Brasil" },
    })),
  };
}

// FAQ (home). Ciente de que o Google não gera mais rich snippet de FAQ —
// mantido como bônus de compreensão para buscadores e IAs.
export function faqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

// Trilha de navegação (subpáginas).
export function breadcrumbGraph(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
