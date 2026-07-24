# Checklist de SEO — o que foi feito e o que ficou pra você

**Data:** 24/07/2026 · **Domínio:** https://www.codebypatrick.dev · **Deploy:** Vercel
**Build:** ✅ passa (`next build`, 11 rotas estáticas) · **JSON-LD:** ✅ todos os blocos válidos

Legenda: ✅ feito · 🟡 pendente com você · ⚪ avaliado e dispensado (com justificativa)

---

## Fase 1 — Indexação e rastreamento ✅
- ✅ `app/robots.js` → gera `/robots.txt`. Produção libera tudo e aponta o sitemap; **preview/staging da Vercel bloqueia indexação** (via `VERCEL_ENV`).
- ✅ `app/sitemap.js` → gera `/sitemap.xml` com `/`, `/projetos`, `/carreira` + `lastModified`.
- ✅ `app/not-found.js` → página 404 amigável, com **status 404 real** e links para Início/Projetos/Contato.
- ✅ `metadataBase` alinhado para `https://www.codebypatrick.dev` (com www).
- **Verificado:** `curl /robots.txt` e `/sitemap.xml` retornam o conteúdo certo com o domínio www.

## Fase 2 — Canonical e metadados ✅
- ✅ `canonical` **absoluto em todas as páginas** (`/`, `/projetos`, `/carreira`) — verificado no HTML.
- ✅ Open Graph + Twitter Card **próprios** para `/projetos` e `/carreira` (não herdam mais o da home).
- ✅ Descriptions reescritas (150–160 caracteres, com CTA) nas subpáginas.
- ✅ `title.template` global + títulos por página (a carreira mantém o nome completo).
- ✅ `theme-color`, `colorScheme`, `viewport` (via `export const viewport`).
- ✅ `app/manifest.js` → `/manifest.webmanifest` (PWA básico).
- ✅ `app/apple-icon.js` → apple-touch-icon 180×180 (mesma identidade do `icon.svg`).
- ✅ `authors`, `creator`, `publisher`, `keywords` (marca + serviços, sem stuffing).
- ✅ `robots` directives (index/follow + `max-image-preview:large`).

## Fase 3 — Dados estruturados (JSON-LD) ✅ *(bônus, ver nota sobre FAQ)*
- ✅ Grafo global (no layout): `WebSite`, `Person`, `Organization`, `ProfessionalService`.
- ✅ **Identidade unificada** (como você pediu): `Person.name = "Patrick Gomes Siqueira"`, `alternateName = ["Patrick Siqueira", "Patrick.Developer"]`; `Organization.name = "Patrick.Developer"` com `founder` **e** `employee` apontando para o Person (`@id`), e `Person.worksFor` para a Organization. As duas identidades são uma entidade só.
- ✅ `sameAs` **só com perfis reais confirmados**: LinkedIn, GitHub, Workana, 99Freelas. **Nada inventado.** (Instagram/Behance não existem — confirmado.)
- ✅ `Service` (×6, de `lib/services.js`), `BreadcrumbList` nas subpáginas.
- ⚠️ **`AggregateRating` REMOVIDO** (correção pós-GEO): review sobre a própria Organization/Person, hospedado no seu site, é "self-serving" e **proibido pelo Google** (desde 2019) — não gera estrela e pode render ação manual. A nota 4,9 e os 60 depoimentos ficam como **texto real visível** na página, que é o que a IA cita e o que converte. Ver `CHECKLIST-GEO.md`.
- ✅ `FAQPage` (das 8 dúvidas). **Nota honesta:** o Google aposentou o rich snippet de FAQ (07/05/2026), então isso **não** gera resultado expandido — fica como bônus de compreensão para buscadores/IA.
- ✅ **`sameAs` completo:** LinkedIn adicionado (`patrick-siqueira-2833a4264`). Instagram/Behance não existem — confirmado. Nada pendente aqui.

## Fase 4 — Semântica, acessibilidade e link building ✅
- ✅ **`TypeCycle` agora é crawlável**: renderiza `words[0]` ("sites") no HTML e a animação assume a partir daí. Verificado: `...word__">sites` está no HTML. **Sem texto escondido** (ao contrário do site antigo).
- ✅ **Link building interno**: `/carreira` adicionada ao **Footer** (estava ausente) e o **NavBar "Carreira"** agora aponta para a página `/carreira` (antes ia para `/#hiring`). Como o Footer está em todas as páginas, `/projetos` passa a linkar `/carreira`.
- ✅ Um `<h1>` por página + hierarquia de headings — já estava correto, mantido.
- ⚪ **`alt` das imagens**: avaliado. Os logos de empresa/escola (`CareerBody`) são **decorativos** e estão marcados `aria-hidden` — o nome da empresa está como texto (`<h3>`) ao lado, então `alt=""` é o correto por acessibilidade (não duplica). O `<img>` do `BrowserFrame` é **código morto** hoje (nenhum projeto usa imagem estática — todos usam vídeo). Ou seja, não há imagem de conteúdo precisando de `alt` no momento.

## Fase 5 — Performance / Core Web Vitals ✅ *(com correção de diagnóstico)*
- ✅ **Vídeo do hero otimizado**: era `preload="auto"` + `video.load()` forçado (baixava 1,3 MB na hora, competindo com o LCP). Agora: `preload="none"`, e o vídeo só carrega/toca **após o `load` da página** (via `requestIdleCallback`). O **poster** virou `preload` de **alta prioridade** (`ReactDOM.preload`) — é a primeira pintura (LCP) e é leve (44 KB).
- ⚪ **"14 MB de imagens" — correção honesta:** investigando, os 14 MB são **9 vídeos `.mp4`** de demonstração de projeto, e eles **já** usam `preload="none"` (só carregam quando o carrossel os ativa). **Não bloqueiam** o carregamento inicial. A auditoria tratou a pasta como "imagens"; na prática já estão bem servidos.
- ⚪ **`next/image` — avaliado, não aplicável agora:** não há imagem de conteúdo carregada de imediato (projetos = vídeo; hero = vídeo + poster; logos = 52 KB decorativos). Migrar não traria ganho real hoje. Fica documentado para quando houver imagens estáticas de peso.
- 🟡 **Lighthouse antes/depois:** não rodei localmente (sem Chrome/Lighthouse nesta máquina). **Melhor rodar contra a URL da Vercel** (CDN real). Método abaixo.

## Fase 6 — Verificação no Google 🟡 (depende de você)
- ✅ Suporte pronto: `layout.js` injeta a meta de verificação se você definir `NEXT_PUBLIC_GSC_VERIFICATION` (ver `.env.local.example`).
- 🟡 Passos com você (abaixo).

---

## 🟡 O que precisa de você (passo a passo)

### 1. Configurar o domínio www + 301 na Vercel
1. No projeto na Vercel → **Settings → Domains** → adicione `www.codebypatrick.dev` e marque como **Primary Domain**.
2. Adicione também `codebypatrick.dev` (sem www) — a Vercel cria **automaticamente o redirect 301** do sem-www para o www (o primary). Confirme que a seta de redirect aponta para `www`.
3. Assim canonical, sitemap e OG (todos em `www`) ficam 100% consistentes.

### 2. Variável de ambiente na Vercel
- Em **Settings → Environment Variables**, adicione `NEXT_PUBLIC_GSC_VERIFICATION` com o código do passo 3 (só depois de criar a propriedade no Search Console). Redeploy.

### 3. Google Search Console
1. Acesse [search.google.com/search-console](https://search.google.com/search-console) → **Adicionar propriedade** → prefixo de URL → `https://www.codebypatrick.dev`.
2. Escolha o método **Tag HTML** → copie só o valor do `content=` → cole em `NEXT_PUBLIC_GSC_VERIFICATION` (Vercel) → redeploy → clique em **Verificar**.
   - (Alternativa: verificação por **DNS TXT**, se preferir não usar a meta.)
3. Em **Sitemaps**, envie: `sitemap.xml`.
4. Use **Inspecionar URL** em `/`, `/projetos` e `/carreira` → **Solicitar indexação**. Confira em "Testar URL publicada" que o Google **renderiza o conteúdo** (o HTML já traz tudo — inclusive as palavras do hero).

### 4. Lighthouse (antes/depois)
Depois do deploy, rode (precisa de Node + Chrome na sua máquina):
```bash
npx lighthouse https://www.codebypatrick.dev --preset=desktop --view
npx lighthouse https://www.codebypatrick.dev --form-factor=mobile --view
```
Registre LCP, CLS, INP e as notas de Performance/SEO. Meta: Performance e SEO ≥ 95, LCP < 2,5s, CLS < 0,1, INP < 200ms.

### 5. Validar os dados estruturados
- Cole a URL (após deploy) no **[Rich Results Test](https://search.google.com/test/rich-results)** e no **[Schema Markup Validator](https://validator.schema.org/)**. Já validei que **todo o JSON-LD é JSON válido** localmente; os validadores confirmam contra o vocabulário schema.org.

---

## Validações executadas
- ✅ `next build` passa sem erros (11 rotas, todas estáticas).
- ✅ `/robots.txt` e `/sitemap.xml` acessíveis e corretos (domínio www).
- ✅ Canonical, OG (www), theme-color e manifest presentes no HTML.
- ✅ Texto do hero (`sites`) agora presente no HTML renderizado.
- ✅ JSON-LD: 3/3 (home), 2/2 (projetos), 2/2 (carreira) blocos válidos.
- ✅ Nenhuma URL pública ficou `noindex` por engano (só o `/_not-found`, que é correto).
- ✅ Nenhum conteúdo real removido (FAQ e Serviços apenas movidos para `lib/`, mesmo texto).
- 🟡 Lighthouse: pendente (rodar contra a Vercel após deploy).

## Arquivos criados/alterados
**Criados:** `lib/seo.js`, `lib/faq.js`, `lib/services.js`, `components/system/JsonLd/JsonLd.js`, `app/robots.js`, `app/sitemap.js`, `app/manifest.js`, `app/apple-icon.js`, `app/not-found.js`, `app/not-found.module.css`.
**Alterados:** `app/layout.js`, `app/page.js`, `app/projetos/page.js`, `app/carreira/page.js`, `components/organisms/Services/Services.js`, `components/organisms/Faq/Faq.js`, `components/atoms/TypeCycle/TypeCycle.js`, `components/atoms/BgVideo/BgVideo.js`, `components/organisms/Footer/Footer.js`, `components/organisms/NavBar/NavBar.js`, `.env.local.example`.
