# Auditoria de SEO técnico — Patrick.Developer

**Data:** 24/07/2026
**Escopo:** site em `frontend/` (Next.js 14 App Router)
**Fase:** 0 — diagnóstico (nada foi alterado ainda)
**Método:** leitura do código + `next build` + inspeção do HTML estático gerado (`.next/server/app/index.html`)

---

## Resumo executivo

A base é **melhor do que o esperado**: todas as rotas são **estáticas (SSG)** — o Next pré-renderiza o HTML no build, então o conteúdo principal (H1, serviços, FAQ com perguntas **e** respostas, textos) **já está no HTML e é crawlável**. Confirmei isso inspecionando o HTML gerado, não só o código.

O que falta é a **camada de SEO técnico** (não existe hoje): sem `robots.txt`, sem `sitemap.xml`, sem `canonical`, sem dados estruturados (JSON-LD), sem manifest/theme-color. Além disso, há **um gap real de conteúdo crawlável** (o texto animado do hero) e um **problema sério de performance** (14 MB de imagens não otimizadas).

Nenhum indício de black-hat (sem texto escondido, sem keyword stuffing, sem cloaking). O conteúdo é real e honesto.

### Placar por área

| Área | Situação | Nota |
|------|----------|------|
| Renderização (SSR/SSG) | Estático, conteúdo no HTML | 🟢 Bom |
| Indexação (robots/sitemap/canonical) | Não existe | 🔴 Crítico |
| Metadados on-page | Home boa; subpáginas fracas; sem canonical/OG por página | 🟡 Médio |
| Dados estruturados (JSON-LD) | Nenhum | 🟠 Alto (oportunidade grande no FAQ) |
| Semântica / acessibilidade | Headings bons; `alt` vazio; texto animado sem fallback | 🟡 Médio |
| Performance / Core Web Vitals | 14 MB de imagens, `<img>` cru, sem `next/image` | 🔴 Crítico |
| Higiene técnica (HTTPS, www, 404) | Depende do deploy; a definir | 🟡 A confirmar |

---

## ⚠️ Preciso da sua confirmação antes de implementar

1. **Qual é o domínio de produção do site?** O código hoje usa `https://codebypatrick.dev` (em `app/layout.js`, `metadataBase`). O `canonical`, o `sitemap.xml`, o `robots.txt` e as URLs do Open Graph **dependem do domínio real e definitivo**. Se for outro (ex.: um domínio `.com.br`, ou a URL da Vercel), me diga qual — não vou adivinhar.
2. **www ou sem www?** Preciso escolher a versão canônica (recomendo **sem www**) e redirecionar a outra com 301. Isso normalmente se configura no provedor de DNS/deploy (Vercel/EasyPanel), não só no código — vou te instruir.
3. **Código do Google Search Console** — quando você criar a propriedade, me passa a meta tag de verificação (ou o TXT de DNS) para eu inserir.

---

## Inventário de rotas

| Rota | Arquivo | Tipo | H1 | `<title>` atual |
|------|---------|------|----|-----------------|
| `/` | `app/page.js` | Estática (SSG) | "Seu projeto no ar em semanas, não em meses." | Patrick.Developer \| Engenheiro de Software |
| `/projetos` | `app/projetos/page.js` | Estática (SSG) | (WorkHero) | Projetos \| Patrick.Developer |
| `/carreira` | `app/carreira/page.js` | Estática (SSG) | "Patrick Gomes Siqueira" | Carreira \| Patrick Gomes Siqueira |
| `/icon.svg` | `app/icon.svg` | Ícone | — | — |
| `/_not-found` | (padrão do Next) | Estática | — | — |

Observação: o `/painel` e o `/clientes` **são da API** (outro serviço, no EasyPanel), não fazem parte deste site e **não devem ser indexados** — a API já não tem link público apontando pra eles, mas vou garantir isso no `robots.txt` da API depois, se você quiser.

---

## 1. Stack e renderização

**Situação atual:** Next.js 14.2 (App Router), React 18, JavaScript, CSS Modules. `next build` mostra **todas as rotas como `○ Static`**. Inspecionei o HTML gerado e confirmei que estão presentes: o H1 do hero, os 5 serviços, as 8 perguntas do FAQ **com as respostas** (mesmo fechadas — o acordeão só esconde via CSS), títulos e descrições. Componentes `"use client"` (Hero, Faq, etc.) também são pré-renderizados no servidor pelo App Router.

**Problema encontrado:** **um** ponto de conteúdo não chega ao HTML:
- **Texto animado do hero (`TypeCycle`)** — o componente inicia com `text = ""` e só "digita" as palavras via JavaScript. No HTML gerado, o `<span>` sai **vazio**: o Google lê *"Construo ___ sob medida para pequenos negócios e startups"*. As palavras-alvo **sites, sistemas, SaaS, automações, lojas virtuais, aplicativos** não estão no DOM inicial. (As palavras "SaaS/automações/sistemas/sites" aparecem em outros lugares da página — na seção Serviços e na meta description —, então o dano é parcial, mas é uma frase de destaque logo abaixo do H1 e merece correção.)
- Menor: a data de hoje no badge ("Agenda aberta · 24 de julho…") é montada no cliente (`useEffect`) — irrelevante para SEO, só não aparece no HTML.
- Menor: no carrossel de projetos (`WorkShowcase`), os **nomes** de todos os projetos ficam no DOM (há `items.map`), mas a **descrição completa** só do projeto ativo. Baixo impacto.

**Severidade:** Médio (o hero) / Baixo (o resto).

**Correção proposta:** renderizar `words[0]` como texto inicial do `TypeCycle` (o servidor manda "sites" já escrito e a animação assume a partir daí) **ou** adicionar um fallback com todas as palavras em `sr-only` (visível para leitores de tela e crawlers). Zero impacto visual. Nada destrutivo.

---

## 2. Metadados on-page

**Situação atual:**
- `app/layout.js` tem um bom conjunto **global**: `metadataBase`, `title`, `description` (boa, ~150 caracteres), Open Graph completo (title, description, url, siteName, image 1200×630, `locale: pt_BR`, type), Twitter Card `summary_large_image`. `lang="pt-BR"` no `<html>`. `charset` e `viewport` são injetados automaticamente pelo Next 14 (confirmado no HTML).
- Subpáginas (`/projetos`, `/carreira`) têm `title` e `description` próprios.

**Problema encontrado:**
- **Sem `canonical` em nenhuma página** (`alternates.canonical`). É o item mais importante que falta aqui — evita conteúdo duplicado e fixa a URL preferida. 🔴
- Subpáginas **sem Open Graph/Twitter próprios** — ao compartilhar `/projetos` ou `/carreira`, herdam o card da home (title/imagem genéricos).
- Descriptions das subpáginas **curtas** (`/projetos` tem ~70 caracteres; o ideal é 150–160) e sem chamada para ação.
- Sem `theme-color`, sem `manifest` (PWA básico), sem `apple-touch-icon` explícito (só existe `app/icon.svg`).
- Sem controle de `robots` por ambiente (produção deve ser `index,follow`; preview/staging deve ser `noindex`).

**Severidade:** Alto (canonical) / Médio (o resto).

**Correção proposta:** centralizar defaults no `layout.js` (adicionar `alternates.canonical`, `robots`, `themeColor`, `manifest`, ícones) e usar `generateMetadata`/`metadata` por página para `canonical` próprio, OG/Twitter próprios e descriptions de 150–160 caracteres com CTA. Tudo via API nativa do Next (`export const metadata`).

---

## 3. Arquivos de indexação (robots.txt / sitemap.xml)

**Situação atual:** **não existem.** Nenhum `robots.txt`, `sitemap.xml`, `app/robots.ts`, `app/sitemap.ts` ou `manifest`.

**Problema encontrado:** sem `sitemap.xml`, o Google descobre as páginas só por links (mais lento e incompleto). Sem `robots.txt`, não há como apontar o sitemap nem controlar o rastreamento. 🔴

**Severidade:** Crítico (para velocidade de indexação).

**Correção proposta:** criar `app/robots.ts` e `app/sitemap.ts` (recursos nativos do Next — geram `/robots.txt` e `/sitemap.xml` automaticamente). O sitemap listará `/`, `/projetos`, `/carreira` com `lastModified`. O robots liberará tudo em produção e apontará o sitemap; em preview/staging, bloqueará a indexação. **Depende do domínio (item de confirmação nº 1).**

---

## 4. Dados estruturados (JSON-LD)

**Situação atual:** **nenhum.**

**Problema encontrado:** o site está deixando na mesa o maior ganho "de graça": a seção **Dúvidas** tem 8 perguntas e respostas reais, perfeitas para `FAQPage` — que pode virar **rich snippet** (resultado expandido) no Google. Também dá para descrever os 5 serviços com `Service` e o autor com `Person`/`Organization` (CNPJ 58.315.507/0001-14 já está no site, GitHub também). 🟠

**Severidade:** Alto (oportunidade, não erro).

**Correção proposta:** injetar JSON-LD via `<script type="application/ld+json">` (Server Component, sem custo de JS no cliente):
- `WebSite` (com `SearchAction` só se fizer sentido — provavelmente não, não há busca interna).
- `Person` + `Organization` — populando **só com o que já existe**: nome (Patrick Gomes Siqueira), URL, `sameAs` (GitHub), CNPJ como `Organization.taxID`, e-mail. **Vou sinalizar o que faltar em vez de inventar** (ex.: logo dedicada, endereço).
- `Service` (×5) a partir do `components/organisms/Services/Services.js`.
- `FAQPage` a partir das 8 perguntas do `Faq.js`.
- `BreadcrumbList` nas subpáginas.
Validação obrigatória no **Rich Results Test** antes de dar como pronto.

---

## 5. Semântica e acessibilidade

**Situação atual:**
- **Headings:** um único `<h1>` por página (confirmado). `SectionHead` usa `<h2>`, cards usam `<h3>`. Hierarquia coerente.
- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` presentes. FAQ usa `<button aria-expanded>` + `role="region"` corretos.

**Problema encontrado:**
- **`alt` vazio em imagens de conteúdo.** Todas as imagens usam `alt=""`: screenshots de projeto (`BrowserFrame`) e logos de empresas/escolas (`CareerBody`). Marcar como decorativo (`alt=""`) esconde conteúdo real de quem usa leitor de tela e do Google Imagens. 🟡
- O texto animado do hero (item 1) também é uma questão de acessibilidade/crawlabilidade.

**Severidade:** Médio.

**Correção proposta:** `alt` descritivo vindo dos dados que já existem (ex.: `alt="Tela do projeto {nome}"`, `alt="Logo {empresa}"`). Onde a imagem for puramente decorativa, manter `alt=""` de propósito. Sem inventar descrições — uso os nomes já presentes em `lib/projects.js` e `lib/career.js`.

---

## 6. Performance / Core Web Vitals

**Situação atual:**
- Bundle enxuto: home com **109 KB** de First Load JS (bom). Fontes via `next/font` com `display: swap` (bom — sem bloqueio, sem FOIT).
- **Imagens: `public/images/projetos` tem 14 MB.** Servidas com `<img>` cru, sem `next/image`, sem `width/height`, sem WebP/AVIF, sem lazy-load explícito.
- Vídeo de fundo do hero: `hero-loop.mp4` = 1,3 MB (com `poster` de 44 KB — bom ter poster).

**Problema encontrado:**
- **14 MB de imagens** é o maior risco de **LCP** e consumo de dados no celular (justo o público de tráfego pago). 🔴
- `<img>` sem `width/height` → risco de **CLS** (layout shift). 🟡
- Sem `next/image` → sem otimização automática (formato moderno, tamanhos responsivos, lazy-load).
- Preconnect: as fontes do Google já vêm otimizadas pelo `next/font` (self-hosted no build), então aqui está ok.

**Severidade:** Crítico (imagens).

**Correção proposta:** migrar `<img>` de conteúdo para **`next/image`** (gera WebP/AVIF, tamanhos responsivos, `width/height` automáticos, lazy-load no que está fora da tela e `priority` na imagem do LCP). Recomprimir os PNG/JPG pesados de `images/projetos`. Medir **antes/depois** com Lighthouse.

---

## 7. Higiene técnica (HTTPS, www, trailing slash, 404)

**Situação atual:**
- **404:** existe `/_not-found` (padrão do Next). O Next retorna **status 404 de verdade** (não 200) para rotas inexistentes — ok. Dá para deixar a página mais amigável, com links de volta.
- **Trailing slash:** o Next usa sem barra final por padrão (`trailingSlash: false`) e é consistente. Ok.
- **HTTPS / www vs não-www / redirect 301:** dependem do **deploy** (Vercel/EasyPanel/DNS), não dá para auditar só pelo código. A definir junto com o domínio (item de confirmação nº 1 e 2).

**Severidade:** Baixo (404) / A confirmar (domínio/redirect).

**Correção proposta:** página 404 amigável em `app/not-found.js` com links para Home/Projetos/Contato. Definir domínio canônico e configurar redirect 301 www→não-www no provedor (te instruo no passo a passo).

---

## 8. Lighthouse (Core Web Vitals medidos)

**Situação atual:** **ainda não medido.** O Lighthouse precisa de uma URL rodando (idealmente a de produção) e Chrome headless. Como o site ainda não está publicado num domínio final, faz mais sentido rodar **na Fase 5**, com número **antes/depois**, contra o site já no ar (ou contra `next start` local).

**Correção proposta:** na Fase 5, rodo Lighthouse mobile + desktop e registro LCP, CLS, INP e as notas de Performance/SEO, antes e depois das otimizações de imagem. Meta: Performance e SEO ≥ 95, LCP < 2,5s, CLS < 0,1, INP < 200ms.

---

## Plano das próximas fases (só executo após sua aprovação)

| Fase | O que farei | Arquivos | Risco |
|------|-------------|----------|-------|
| 1. Indexação | `app/robots.ts`, `app/sitemap.ts`, canonical global, `not-found.js` | novos | Baixo |
| 2. Metadados | canonical + OG/Twitter por página, descriptions 150–160, `manifest.ts`, theme-color, ícones | `layout.js`, páginas | Baixo |
| 3. JSON-LD | `WebSite`, `Person`/`Organization`, `Service`×5, `FAQPage`, `BreadcrumbList` | componente `<JsonLd>` | Baixo |
| 4. Semântica | `alt` descritivo, fallback crawlável do `TypeCycle` | componentes | Baixo |
| 5. Performance | migrar para `next/image`, recomprimir imagens, Lighthouse antes/depois | componentes de imagem | Médio (mexe em render de imagem — mostro antes) |
| 6. Verificação | meta do Search Console + passo a passo de indexação | `layout.js` | Baixo |

**Regras que vou seguir:** nada destrutivo sem te mostrar antes; build passando a cada fase; nenhum conteúdo real removido; nenhuma URL pública em `noindex` por engano; só white-hat.

---

## O que **não** encontrei de errado (para sua tranquilidade)

- Sem texto escondido, sem keyword stuffing, sem cloaking, sem links suspeitos.
- Conteúdo real, honesto e específico (bom para E-E-A-T).
- SSG puro — a maior parte do conteúdo já é crawlável hoje.
- Bundle de JS pequeno; fontes já otimizadas.
- Um `<h1>` por página e hierarquia de headings correta.
