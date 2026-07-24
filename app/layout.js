import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Tracker from "@/components/system/Tracker/Tracker";
import JsonLd from "@/components/system/JsonLd/JsonLd";
import { SITE, siteGraph } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Patrick.Developer | Sites, Sistemas e SaaS sob Medida",
    template: "%s | Patrick.Developer",
  },
  description:
    "SaaS, automações, sistemas e sites do escopo ao deploy. Escopo e preço fechados, entrega semanal e o projeto no seu nome. 60+ projetos, nota 4,9.",
  applicationName: "Patrick.Developer",
  authors: [{ name: SITE.personName, url: SITE.url }],
  creator: SITE.personName,
  publisher: SITE.name,
  keywords: [
    "Patrick.Developer",
    "Patrick Siqueira",
    "CodeByPatrick",
    "desenvolvedor full stack",
    "criação de sites",
    "desenvolvimento de SaaS",
    "automação de processos",
    "loja virtual",
    "desenvolvedor com CNPJ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "Seu projeto no ar em semanas, não em meses.",
    description:
      "SaaS, automações, sistemas e sites do escopo ao deploy. 60+ projetos entregues, nota 4,9, CNPJ próprio.",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Patrick.Developer — Sites, Sistemas e SaaS sob medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seu projeto no ar em semanas, não em meses.",
    description:
      "SaaS, automações, sistemas e sites do escopo ao deploy. 60+ projetos, nota 4,9.",
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  // Verificação do Google Search Console (token público). Fixo no código para a
  // meta tag estar sempre presente; pode ser sobrescrito por env se precisar.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GSC_VERIFICATION ||
      "G9QhN9LFJf7rI9ka1T1ofnpAW1fZW04OJYVZubLz-9M",
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <JsonLd data={siteGraph()} />
      </head>
      <body>
        {children}
        <Tracker />
      </body>
    </html>
  );
}
