# Plano de execução — SEO (reorganizado por impacto real)

**Data:** 24/07/2026
**Baseado em:** `AUDITORIA-SEO.md` + `AUDITORIA-SEO-SITE-ANTIGO.md` + correções do dono do projeto.
**Regra:** nada destrutivo sem mostrar antes; build passando a cada fase; só white-hat.

---

## Correção importante que muda a prioridade

**FAQPage não gera mais rich snippet.** O Google aposentou os FAQ rich results da busca geral (final em **07/05/2026**; desde 2023 já era restrito a governo/saúde). Então adicionar `FAQPage` **não** vai destravar aquele resultado expandido. Ainda vale — ajuda buscadores e IAs a entender o conteúdo, custo zero — mas é **bônus de baixa prioridade**, não "o maior ganho".

**Onde está o ganho real de posicionamento:**
1. **Indexação** (Fase 1) — sem isso o Google nem entra direito.
2. **Canonical + metadados** (Fase 2) — evita duplicação e melhora como cada página aparece.
3. **Search Console** (Fase 6) — enviar sitemap e forçar indexação.
4. **Performance / Core Web Vitals** (Fase 5) — afeta ranqueamento e a experiência (público mobile de tráfego pago).

Dados estruturados (Fase 3) e semântica/conteúdo (Fase 4) entram como **reforço**, não como motor principal.

---

## ✅ Dois dados que bloqueavam — CONFIRMADOS (24/07/2026)

| # | Dado | Resposta | Consequência |
|---|------|----------|--------------|
| A | **Domínio de produção definitivo** | **`https://www.codebypatrick.dev` (com www)** | Uso esse domínio em canonical, sitemap, robots, OG e JSON-LD. Ajusto o `metadataBase` (hoje sem www) e configuramos o **301 sem-www → com-www** no deploy/DNS. |
| B | **Onde o front roda** | **Vercel** | `next/image` **otimiza automaticamente** (WebP/AVIF, responsivo, lazy-load). Fase 5 usa `next/image` + recompressão — ganho completo, sem loader custom nem `unoptimized`. |

---

## Ordem de execução (por prioridade de ganho)

### ▶ Fase 1 — Indexação e rastreamento **(ALTA)** · depende de A
- `app/robots.ts` — libera produção, aponta o sitemap, e **bloqueia indexação em preview/staging** (noindex fora de produção).
- `app/sitemap.ts` — gera `/sitemap.xml` com `/`, `/projetos`, `/carreira` + `lastModified`. (Só referencio o sitemap no robots **depois** que ele existe — o site antigo errou nisso.)
- `app/not-found.js` — 404 amigável, com status 404 real e links para Início/Projetos/Contato.
- Alinhar `metadataBase` ao domínio definitivo (com www).
- **Risco:** baixo. **Entrega:** o Google passa a descobrir e indexar tudo rápido.

### ▶ Fase 2 — Canonical e metadados on-page **(ALTA)** · depende de A
- `alternates.canonical` **em todas as páginas** (absoluto, domínio final).
- OG/Twitter **próprios** para `/projetos` e `/carreira` (hoje herdam o da home).
- Descriptions de 150–160 caracteres com CTA nas subpáginas (hoje curtas).
- `themeColor`, `manifest` (PWA básico via `app/manifest.ts`), `apple-touch-icon`.
- `authors` no metadata (boa ideia herdada do site antigo).
- Incorporar, **em texto visível**, os termos de marca ("Patrick Siqueira", "Patrick.Developer", "CodeByPatrick", ângulo CNPJ/NF) — sem nada escondido.
- **Risco:** baixo.

### ▶ Fase 5 — Performance / Core Web Vitals **(ALTA)** · deploy = Vercel ✅
- **Recompressão das imagens** de `public/images/projetos` (14 MB).
- Imagens: migrar para **`next/image`** (Vercel otimiza sozinho: WebP/AVIF, tamanhos responsivos, `width/height`, lazy-load fora da tela, `priority` no LCP).
- **Vídeo do hero** (`BgVideo`, `hero-loop.mp4` 1,3 MB): hoje usa `preload="auto"` + `video.load()` forçado, baixando tudo na hora e competindo com o LCP no celular. Proposta: `preload="none"`/`metadata`, iniciar o play **após o carregamento inicial** (ex.: `requestIdleCallback`/evento `load`), mantendo o **poster** como quadro do LCP (leve, 44 KB). Garante que o vídeo **não bloqueie** a primeira pintura.
- Lighthouse **antes/depois** (mobile + desktop): LCP, CLS, INP, Performance, SEO.
- **Risco:** médio (mexe em render de imagem/vídeo) — **mostro antes**.

### ▶ Fase 6 — Verificação no Google **(ALTA)** · depende de A + Fase 1
- Meta tag do Search Console no `<head>` (você me passa o código).
- Passo a passo: verificar propriedade, enviar `sitemap.xml`, "Inspecionar URL" para forçar indexação das páginas principais e confirmar que o Google lê o conteúdo renderizado.
- **Risco:** baixo.

### ▶ Fase 4 — Semântica, acessibilidade e link building **(MÉDIA)**
- **Link building interno** (novo, não estava na auditoria):
  - Adicionar **`/carreira` ao Footer** (hoje ausente) — ela só é alcançável por 1 botão na home.
  - No NavBar, decidir: "Carreira" apontar para a **página `/carreira`** (hoje vai para `/#hiring`, seção da home) — ou manter os dois com rótulos claros.
  - Linkar **`/projetos` → `/carreira`** (hoje não existe) para interligar as duas subpáginas.
  - Âncoras descritivas (já estão razoáveis: "Ver todos os projetos"; melhorar as genéricas).
- `alt` descritivo nas imagens de conteúdo (screenshots de projeto, logos) — hoje `alt=""`. Usar os nomes já presentes em `lib/projects.js` / `lib/career.js`.
- Fallback crawlável do `TypeCycle` (hoje o `<span>` sai vazio no HTML): renderizar `words[0]` como texto inicial **ou** `sr-only` com a lista. Zero impacto visual.
- **Risco:** baixo.

### ▶ Fase 3 — Dados estruturados (JSON-LD) **(BAIXA — bônus)**
- Portar o `@graph` do site antigo **corrigindo os dados**: `Person` (nome real, `sameAs` GitHub/WhatsApp), `Organization` (`taxID` = CNPJ real 58.315.507/0001-14, `logo` só se existir), `ProfessionalService` (telefone, área BA/Brasil, `priceRange`).
- Somar `Service` (×5, de `Services.js`), `FAQPage` (das 8 dúvidas — **bônus, ciente de que não vira rich snippet**) e `BreadcrumbList` nas subpáginas.
- Validar no Rich Results Test / validador do schema.org.
- **Risco:** baixo. **Por que baixa prioridade:** ajuda entendimento por IA/busca, mas **não** destrava resultado expandido nem move ranking sozinho.

---

## Resumo visual da prioridade

```
ALTA   →  Fase 1 (indexação) · Fase 2 (canonical/meta) · Fase 5 (performance) · Fase 6 (Search Console)
MÉDIA  →  Fase 4 (semântica + link building interno)
BÔNUS  →  Fase 3 (JSON-LD, incl. FAQPage sem rich snippet)
```

## Entregáveis finais (quando concluirmos)
- `AUDITORIA-SEO.md` ✅ · `AUDITORIA-SEO-SITE-ANTIGO.md` ✅ · este `PLANO-SEO.md` ✅
- `CHECKLIST-SEO.md` (marcando feito/pendente) — ao longo da execução.
- Validações: build ok · robots/sitemap válidos · JSON-LD validado · Lighthouse antes/depois · nenhuma URL pública em `noindex` por engano · nenhum conteúdo real removido.

---

**Status:** ✅ **IMPLEMENTADO** (24/07/2026). Todas as fases executadas e verificadas — ver `CHECKLIST-SEO.md`. Pendências com o Patrick: URL do LinkedIn (sameAs), configurar www+301 e Search Console na Vercel, rodar Lighthouse após deploy.
