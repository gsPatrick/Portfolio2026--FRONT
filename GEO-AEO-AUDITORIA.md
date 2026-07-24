# Auditoria GEO / AEO — ser citado pelas IAs

**Data:** 24/07/2026 · **Site:** Next.js 14 App Router, SSG · **Domínio:** https://www.codebypatrick.dev
**Objetivo:** ser encontrado, entendido e **citado** por ChatGPT, Perplexity, Gemini, Copilot, Claude e AI Overviews quando alguém pergunta a uma IA por um desenvolvedor.
**Fase:** 0 — diagnóstico (nada foi alterado).

---

## Resumo executivo

Partimos de um **bom lugar** graças ao SEO técnico já feito: o site é **SSG** (todo o conteúdo no HTML bruto — crawlers de IA que leem mal JS enxergam tudo), já tem **schema Person/Organization com identidade unificada** e `sameAs` dos perfis, e uma **FAQ real** (formato que a IA adora). Também há **material de citação de ouro**: estatísticas reais (60 projetos, nota 4,9, 90% cinco estrelas, top 30) e **7+ depoimentos reais de clientes com nome de projeto, data e nota**.

O que falta é **orientar os crawlers de IA explicitamente**, criar o **llms.txt**, e **reestruturar o conteúdo no formato que as IAs extraem e citam** (resposta-primeiro, títulos em forma de pergunta, blocos auto-contidos, dados soltos em frases citáveis). Nenhum dado precisa ser inventado — o que falta, eu sinalizo pra você fornecer.

### Placar

| Área | Situação | Nota |
|------|----------|------|
| Acesso dos crawlers de IA | Liberados por wildcard, mas nenhum nomeado | 🟡 Médio |
| Extração de conteúdo (HTML) | SSG, tudo no HTML | 🟢 Bom |
| Conteúdo citável (resposta-primeiro, Q&A) | Só a FAQ; resto é copy de marketing | 🟠 Alto |
| Sinais de entidade (schema/nome) | Schema unificado já feito no SEO | 🟢 Bom |
| Estatísticas e depoimentos | Existem e são reais, mas pouco "extraíveis" | 🟡 Médio |
| Datas / frescor | Nenhuma data de publicação/atualização | 🟡 Médio |
| llms.txt | Não existe | 🟠 Alto |
| Cobertura temática | FAQ cobre bem; faltam temas | 🟡 Médio |

---

## 1. Acesso dos crawlers de IA (robots.txt)

**Situação atual:** o `app/robots.js` gera, em produção, `User-agent: * / Allow: /`. Ou seja, **todos os agentes de IA estão liberados por padrão** (nenhum bloqueado), mas **nenhum é nomeado explicitamente**. Em preview/staging, tudo é `Disallow: /` (correto — bloqueia até os de IA fora de produção).

| Agente | O que faz | Status hoje |
|--------|-----------|-------------|
| **OAI-SearchBot** | Busca/citação do ChatGPT (mostra e linka fontes) | Liberado (via `*`), não nomeado |
| **GPTBot** | Crawler da OpenAI (treino + recuperação) | Liberado, não nomeado |
| **PerplexityBot** | Indexação do Perplexity (para citar) | Liberado, não nomeado |
| **Perplexity-User** | Busca ao vivo quando um usuário pergunta | Liberado, não nomeado |
| **ClaudeBot** | Crawler da Anthropic (Claude) | Liberado, não nomeado |
| **Google-Extended** | Grounding/treino do **Gemini** | Liberado, não nomeado |
| **CCBot** | Common Crawl (alimenta vários modelos) | Liberado, não nomeado |
| **Applebot-Extended** | Uso no Apple Intelligence | Liberado, não nomeado |

**Problema:** liberação implícita funciona, mas **nomear explicitamente** deixa a intenção clara, é mais robusto se um dia mudarmos o `*`, e é o padrão recomendado em GEO.

**Nuance importante (registrada):** os **AI Overviews / AI Mode do Google usam o Googlebot normal** — que o SEO já liberou. O **Google-Extended NÃO controla os AI Overviews**; ele controla o uso no grounding/treino do Gemini. Ou seja, **você já está habilitado para os resumos de IA do Google**; aqui estamos abrindo as portas dos **outros** motores (ChatGPT, Perplexity, etc.).

**Severidade:** Médio. **Correção (Fase 1):** adicionar regras `allow` nomeadas para os 8 agentes, mantendo Googlebot e os demais liberados, sem bloquear nada em produção.

---

## 2. Extração de conteúdo

**Situação atual:** SSG — confirmei no SEO que H1, serviços, FAQ (perguntas **e** respostas) e textos estão no HTML bruto. A **FAQ** já é Q&A. O **Process** é lista de passos (formato que a IA gosta). Os **depoimentos** são aspas reais.

**Problema:**
- **Copy de marketing, não resposta-primeiro.** A maioria das seções abre com frase de efeito ("Você não contrata código. Contrata o problema resolvido."), não com uma resposta factual e auto-contida. A IA prefere extrair a 1ª frase objetiva ("Desenvolvo SaaS, sistemas, sites e automações sob medida, do escopo ao deploy, para pequenos negócios e startups.").
- **Títulos são afirmações, não perguntas** (exceto a FAQ). As IAs casam melhor headings com a pergunta do usuário.
- **Blocos dependem de contexto.** Alguns parágrafos só fazem sentido lendo o anterior; a IA cita trechos isolados.

**Severidade:** Alto (é o coração do AEO). **Correção (Fase 3):** para cada seção, abrir com 1–3 frases de resposta direta e auto-contida; adicionar/ajustar headings em forma de pergunta; manter a copy de marca **depois** da resposta factual. Sem remover conteúdo — só reordenar e acrescentar a "primeira frase citável".

---

## 3. Sinais de entidade

**Situação atual (já forte, graças ao SEO):**
- ✅ Schema `Person` (Patrick Gomes Siqueira, alternateName Patrick Siqueira / Patrick.Developer) + `Organization` (Patrick.Developer) unificados por `founder`/`employee`/`worksFor`.
- ✅ `sameAs`: LinkedIn, GitHub, Workana, 99Freelas.
- ✅ Nome pessoal rastreável (About, rodapé, carreira, schema).

**Problema:**
- **Sem datas de publicação/atualização** em lugar nenhum (`dateModified`/`datePublished`) — as IAs valorizam frescor.
- **Sem um bloco de "bio de autor"** consolidado com experiência/credenciais (a bio está diluída no About e na Carreira).
- **Cross-linking incompleto:** o site linka **visivelmente** para GitHub, Workana e 99Freelas (Testimonials/Trust/Contact), mas o **LinkedIn** só está no schema — falta um link visível. E é preciso colocar o link do site **de volta** em cada perfil (mão dupla).

**Severidade:** Médio. **Correção (Fase 4):** adicionar `dateModified` no schema (e datas visíveis onde fizer sentido); consolidar uma bio de autor; adicionar link visível ao LinkedIn; te instruir a linkar o site de volta em cada perfil.

---

## 4. Elementos que aumentam citação

**Situação atual:** você tem **muito** material real e valioso:
- Estatísticas: **60 projetos**, **nota 4,9**, **90% cinco estrelas**, **top 30 no 99Freelas**, **7 anos**, **48h para landing**, **30min para o briefing**.
- **7+ depoimentos reais** com projeto, autor, **data** (nov/2025 a jul/2026) e nota 5.0.

**Problema:**
- Os números vivem em **"stat rails" visuais** (pares número/rótulo), não em **frases citáveis** ("Já entreguei mais de 60 projetos, com nota média 4,9 em 60 avaliações."). A IA extrai frase, não layout.
- **Sem citação de fontes** quando se afirma algo do mercado (ex.: prazos, tendências). Uma afirmação com fonte é mais citável.
- Os depoimentos são ótimos, mas poderiam estar em marcação mais explícita (`Review`/`quotedText`) para a IA reconhecer como aspas.

**Severidade:** Médio. **Correção (Fase 3/4):** transformar os números em frases auto-contidas; marcar depoimentos como `Review` no schema; onde houver afirmação de mercado, citar fonte real (ou remover a afirmação).

---

## 5. llms.txt

**Situação atual:** **não existe** (`/llms.txt` nem `/llms-full.txt`).

**Problema:** é o "mapa para IA" — um resumo factual em markdown na raiz, que alguns motores já consultam para entender o site rápido. Barato e alinhado ao GEO.

**Severidade:** Alto (baixo esforço, bom retorno). **Correção (Fase 2):** criar `/llms.txt` (quem é, o que faz, serviços, para quem, diferenciais reais, links das páginas-chave, contato) e, opcionalmente, `/llms-full.txt` mais completo — sempre alinhado ao conteúdo real.

---

## 6. Cobertura temática

**Situação atual:** a FAQ cobre bem: custo, prazo, contrato, pagamento, mudanças, manutenção, propriedade do código, atendimento remoto.

**Problema — lacunas de perguntas que as pessoas fazem à IA:**
- "Quais **tecnologias/stack** ele usa?" (Next.js, Node, etc. estão na seção Tech, mas não em Q&A citável.)
- "Vale a pena um **SaaS próprio** ou usar uma plataforma pronta?"
- "Quanto custa um **site** / um **sistema** / um **SaaS** especificamente?" (a FAQ diz "depende" — a IA cita melhor uma faixa real, **se você topar publicar**.)
- "**App nativo ou web**, o que escolher?"
- "Como funciona **do briefing à entrega**?" (o Process mostra visualmente; falta em texto Q&A.)
- "Ele emite **nota fiscal** / trabalha com **contrato**?" (está na seção Trust, não na FAQ.)

**Severidade:** Médio. **Correção (Fase 3):** ampliar a FAQ e, com seu ok, criar 1–2 páginas/artigos que respondam diretamente essas perguntas. **Vou te propor a lista de perguntas — você aprova/ajusta; não invento as respostas.**

---

## 🟡 Dados que vou precisar de você (para não inventar nada)

1. **Faixas de preço reais** (se topar publicar): "sites a partir de R$…", "sistemas a partir de R$…". Aumenta MUITO a citação em "quanto custa", mas só entra se for real e você quiser expor.
2. **Stack/tecnologias oficiais** que quer destacar (confirmar a lista da seção Tech).
3. **Credenciais para a bio de autor** (formação, anos, especializações — já temos na Carreira; confirmar o que destacar).
4. Confirmar se posso usar os **depoimentos** (já no site) marcados como `Review` no schema (são públicos do Workana/99Freelas).
5. **Link do site de volta nos perfis** (LinkedIn/GitHub/Workana/99Freelas) — isso é execução sua, eu te dou o passo a passo.

---

## Plano das próximas fases (só executo após sua aprovação)

| Fase | O que farei | Risco |
|------|-------------|-------|
| 1. Crawlers de IA | Nomear os 8 agentes no `robots.js` (allow), sem bloquear nada | Baixo |
| 2. llms.txt | Criar `/llms.txt` (+ `/llms-full.txt` opcional) factual | Baixo |
| 3. Conteúdo citável | Resposta-primeiro, headings-pergunta, blocos auto-contidos, FAQ ampliada, números em frases | Médio (reordena copy — mostro antes) |
| 4. Entidade/E-E-A-T | `dateModified`, `Review` no schema, bio de autor, link visível LinkedIn, cross-linking | Baixo |
| 5. Off-site (documento) | `ESTRATEGIA-OFFSITE-GEO.md` — você executa | — |
| 6. Medição | Detectar referrers de IA no seu tracking + roteiro de teste mensal | Baixo |

**Regras que sigo:** nunca inventar número/depoimento/credencial; não bloquear Googlebot; white-hat; build passando; não remover conteúdo real; parar e perguntar quando faltar dado.

---

## O que já está pronto (do trabalho de SEO) e conta a favor do GEO
- SSG com toda a copy no HTML bruto (crawler de IA lê tudo).
- Schema `Person`+`Organization` unificado, `sameAs` com 4 perfis reais, `FAQPage`, `Service`×6, `AggregateRating` (4,9/60).
- Sitemap, canonical, metadados e um site limpo, sem black-hat.

**Nada implementado nesta fase. Aguardo sua aprovação do relatório para começar pela Fase 1.**
