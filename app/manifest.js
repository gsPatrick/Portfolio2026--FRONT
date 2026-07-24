import { SITE } from "@/lib/seo";

// Gera /manifest.webmanifest (PWA básico).
export default function manifest() {
  return {
    name: "Patrick.Developer — Sites, Sistemas e SaaS sob medida",
    short_name: "Patrick.Developer",
    description:
      "SaaS, automações, sistemas e sites do escopo ao deploy. Escopo e preço fechados, entrega semanal e o projeto no seu nome.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
