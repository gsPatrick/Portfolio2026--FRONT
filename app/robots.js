import { SITE } from "@/lib/seo";

// Agentes de IA de busca/citação e de treino. Todos LIBERADOS em produção —
// o objetivo é máxima visibilidade (ser encontrado e citado pelas IAs).
// Se um dia quiser que o conteúdo seja usado só por quem cita (e não para treino
// anônimo), basta mover GPTBot/CCBot/Applebot-Extended/Google-Extended para disallow.
const AI_AGENTS = [
  "OAI-SearchBot", // ChatGPT (busca e citação)
  "GPTBot", // OpenAI (rastreio/treino)
  "ChatGPT-User", // ChatGPT (busca ao vivo acionada pelo usuário)
  "PerplexityBot", // Perplexity (indexação para citar)
  "Perplexity-User", // Perplexity (busca ao vivo do usuário)
  "ClaudeBot", // Anthropic (Claude)
  "Claude-User", // Claude (busca ao vivo do usuário)
  "Google-Extended", // Grounding/treino do Gemini (NÃO afeta os AI Overviews)
  "CCBot", // Common Crawl (alimenta vários modelos)
  "Applebot-Extended", // Apple Intelligence
];

// Gera /robots.txt. Produção: libera tudo (inclusive IAs) e aponta o sitemap.
// Preview/staging (Vercel): bloqueia indexação para não competir com produção.
export default function robots() {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" }, // Googlebot (SEO + AI Overviews) e todos os demais
      { userAgent: AI_AGENTS, allow: "/" }, // agentes de IA nomeados explicitamente
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
