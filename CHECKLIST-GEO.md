# Checklist GEO / AEO — feito e pendente

**Data:** 24/07/2026 · **Domínio:** https://www.codebypatrick.dev (com www, consistente em tudo)
**Build:** ✅ passa (13 rotas estáticas) · **Correção crítica aplicada:** AggregateRating self-serving removido.

Legenda: ✅ feito · 🟡 pendente com você · ⚪ decisão registrada

---

## Fase 1 — Crawlers de IA ✅
- ✅ `app/robots.js` nomeia e libera explicitamente **10 agentes**: OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, Google-Extended, CCBot, Applebot-Extended.
- ✅ Googlebot segue liberado (via `*`) — cobre SEO **e** os AI Overviews do Google.
- ⚪ **Decisão registrada:** liberamos **tudo, inclusive treino** (GPTBot, CCBot) para máxima visibilidade. Se um dia quiser só citação (sem treino anônimo), basta mover esses para `disallow` — comentário no arquivo explica.
- **Verificado:** `curl /robots.txt` lista os 10 agentes com `Allow: /`.

## Fase 2 — llms.txt ✅ *(prioridade rebaixada — aposta de futuro)*
- ✅ `/llms.txt` (resumo factual) e `/llms-full.txt` (com serviços + FAQ) — gerados da fonte real (`lib/seo`, `lib/services`, `lib/faq`), domínio www.
- ⚪ **Expectativa honesta:** nenhum grande motor (ChatGPT, Perplexity, Gemini) confirmou usar llms.txt hoje. Fizemos porque custa quase nada e posiciona se virar padrão — **não espere resultado agora**. O retorno real está na Fase 3 e no off-site.

## Fase 3 — Conteúdo citável ✅
- ✅ **FAQ ampliada de 8 → 13 perguntas**, todas com resposta direta primeiro e ancoradas em conteúdo real:
  - "Quais tecnologias você usa?" (stack real da seção Tech)
  - "Você emite nota fiscal?" (CNPJ/NF-e da seção Trust)
  - "Como funciona, do briefing à entrega?" (os 6 passos reais do Process)
  - "Vale a pena um SaaS próprio ou usar uma plataforma pronta?" (balanceada, "depende do caso", funil pro orçamento)
  - "App nativo ou web: qual escolher?" (balanceada, funil pro orçamento)
  - Todas entram na página, no `FAQPage` (13 perguntas no schema) e no `llms-full.txt`.
- ✅ Números reais viram frases citáveis no `llms.txt`/`llms-full.txt` (60 projetos, 4,9, 90% 5★, top 30, 48h, 30min).
- ⚪ **Preço:** decisão registrada — **sem tabela/faixa publicada**. O objetivo é o cliente vir fazer o orçamento; a FAQ "Quanto custa" já responde assim (honesto e converte). Nada inventado.
- ⚪ Não reescrevi a copy de marca do hero/About (você a ajustou com cuidado). Se quiser, aplico "resposta-primeiro" nelas também — mostro antes.

## Fase 4 — Entidade e E-E-A-T ✅
- ✅ **Removido** `AggregateRating` da Organization/ProfessionalService (era self-serving — proibido pelo Google).
- ✅ **Não** marcamos depoimentos como `Review` sobre você — ficam como **texto real visível** (o que a IA cita).
- ✅ Identidade unificada (do SEO): `Person` "Patrick Gomes Siqueira" (alternateName Patrick Siqueira / Patrick.Developer) ↔ `Organization` "Patrick.Developer" por `founder`/`employee`/`worksFor`.
- ✅ `sameAs` com 4 perfis reais: LinkedIn, GitHub, Workana, 99Freelas.
- ✅ **Bio de autor** real no `Person.description` + `knowsAbout` (stack/áreas reais).
- ✅ **Frescor:** `dateModified` (data do build) no `WebSite`.
- ✅ **Link visível do LinkedIn** adicionado aos canais de contato (cross-linking do lado do site).
- 🟡 **Falta você:** colocar o link do site **de volta** em cada perfil (LinkedIn/GitHub/Workana/99Freelas) — passo a passo em `ESTRATEGIA-OFFSITE-GEO.md` (Prioridade 0).

## Fase 5 — Off-site ✅ (documento entregue)
- ✅ `ESTRATEGIA-OFFSITE-GEO.md` — plano priorizado (cross-linking, GitHub, conteúdo próprio, listas/comparativos, provas sociais, grafo de entidade). Você executa.

## Fase 6 — Medição 🟡
- ✅ **Já instrumentado (parcial):** seu tracking captura o `referrer` de cada visita, então acessos vindos de **chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com** já aparecem no card **"Origem do tráfego"** do seu painel.
- 🟡 **Melhoria opcional (na API):** posso adicionar um rótulo explícito "IA" agrupando esses referrers no painel, com um card dedicado "Visitas vindas de IA". É no repositório da API (precisa redeploy) — me dá o ok que eu faço.
- 🟡 **Roteiro de teste mensal (você roda):** uma vez por mês, pergunte ao ChatGPT, Perplexity e Gemini as perguntas-alvo e anote se/como você aparece:
  - "quem contratar para criar um SaaS sob medida no Brasil"
  - "desenvolvedor freelancer para sistema web sob medida"
  - "desenvolvedor full stack com CNPJ e nota fiscal"
  - "quem faz automação de WhatsApp / integração de sistemas"
  - Registre: apareceu? citado como fonte? qual página/perfil citado? Repita mês a mês.

---

## Validações executadas
- ✅ `next build` passa (13 rotas estáticas).
- ✅ `/robots.txt` libera os 10 agentes de IA + Googlebot (verificado).
- ✅ `/llms.txt` e `/llms-full.txt` acessíveis e factuais (verificado).
- ✅ Conteúdo principal no HTML bruto (SSG — já confirmado no SEO; FAQ nova incluída).
- ✅ Schema **sem** AggregateRating/Review self-serving; **com** bio, knowsAbout, dateModified. Todos os blocos JSON-LD válidos.
- 🟡 Validar no Rich Results Test / Schema Validator após deploy (com a URL no ar).

## 🟡 O que depende de você
1. **Cross-linking:** colocar o link do site nos seus perfis (ver off-site, Prioridade 0).
2. **Faixas de preço reais** (se quiser publicar) + aprovar as perguntas de opinião da Fase 3.
3. **Roteiro de teste mensal** nas IAs.
4. (Opcional) Ok para eu adicionar o card "Visitas vindas de IA" no painel.

## Arquivos criados/alterados (GEO)
**Criados:** `app/llms.txt/route.js`, `app/llms-full.txt/route.js`, `GEO-AEO-AUDITORIA.md`, `ESTRATEGIA-OFFSITE-GEO.md`, `CHECKLIST-GEO.md`.
**Alterados:** `app/robots.js` (agentes de IA), `lib/seo.js` (removeu AggregateRating; add bio/knowsAbout/dateModified), `lib/faq.js` (+2 perguntas reais), `components/organisms/Contact/Contact.js` (link LinkedIn).
