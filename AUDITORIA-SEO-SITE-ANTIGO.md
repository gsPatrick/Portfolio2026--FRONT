# Auditoria do site antigo — o que copiar e o que evitar

**Repositório analisado:** https://github.com/gsPatrick/novo-portfolio.git
**Data:** 24/07/2026
**Objetivo:** puxar o que ele acerta em SEO para o site novo e **não repetir** o que ele erra.
**Stack dele:** Next.js 16 + React 19, App Router, **página única**, `framer-motion` para tudo.
**Domínio de produção confirmado por você:** **https://www.codebypatrick.dev** (com `www`).

---

## Resumo em uma frase

O site antigo teve **boas ideias de SEO** (dados estruturados, foco no nome da marca, `alt` nas imagens), mas está **contaminado por um erro grave (texto escondido = black-hat)**, aponta para o **domínio errado** em todo lugar (`.com` em vez de `.dev`) e tem **dados estruturados quebrados**. Copiamos a estratégia, **não** a execução.

---

## 🚫 PARTE 1 — O que **NÃO** clonar (erros a evitar)

### 1. Texto escondido com keyword stuffing — BLACK-HAT 🔴🔴
Em `src/Components/Sections/Hero/Hero.js` existe isto:

```jsx
{/* SEO Hidden Keywords */}
<div style={{ position:'absolute', width:'1px', height:'1px', overflow:'hidden', clip:'rect(0,0,0,0)' }}>
  Patrick Siqueira Patrick Dev Patrick.Developer CodeByPatrick Patrick Siqueira Dev
</div>
```

É um bloco **invisível** cheio de palavras-chave repetidas, escondido do usuário e mostrado só pro robô. Isso é exatamente o tipo de técnica que o Google **penaliza** (texto oculto / keyword stuffing / cloaking). **Nunca** levar isso pro site novo.
> Boa notícia: o site **novo não tem nada disso** — está limpo. Se um dia a intenção era ranquear pelo nome "Patrick Siqueira", a gente faz isso do jeito certo: com o nome em texto **visível** (H1, título, JSON-LD `Person`), que funciona e não arrisca punição.

### 2. Domínio errado em todo lugar — `.com` em vez de `.dev` 🔴
Há **10 referências a `codebypatrick.com`** (OG `url`, JSON-LD `@id`/`url`/`logo`, `robots.txt` → `sitemap`). O seu domínio real é **`www.codebypatrick.dev`**. Se esse site rodou no `.dev` apontando tudo pro `.com`, o Google recebeu sinais conflitantes (canonical, OG e structured data para um domínio que não é o do site). **Lição para o site novo:** um único domínio canônico — `https://www.codebypatrick.dev` — repetido de forma idêntica em `metadataBase`, `canonical`, `sitemap`, `robots` e JSON-LD. (O site novo hoje usa `codebypatrick.dev` **sem www** no `metadataBase` — vamos alinhar para `www`.)

### 3. Dois `<h1>` e nenhum descritivo 🔴
O hero usa **dois** `<motion.h1>` ("Patrick" e "Siqueira"). Fora isso, o site inteiro **não tem H1 nenhum** com termo de negócio. Regra: **um** `<h1>` por página, com o termo-alvo (ex.: "Desenvolvedor Full Stack" + nome), não o nome quebrado em dois.
> O site novo já acerta: um H1 único por página.

### 4. Dados estruturados quebrados / placeholder 🟠
O JSON-LD tem gente boa (Person, Organization, ProfessionalService), mas com dados inválidos:
- `"taxID": "CNPJ"` — a string literal "CNPJ", **não** o número. (O número real, `58.315.507/0001-14`, está no site novo em texto — dá pra usar de verdade.)
- `"logo": "https://codebypatrick.com/logo.png"` — esse arquivo **não existe** no projeto (404). Logo quebrada em structured data pode invalidar o rich result.
**Lição:** só colocar no JSON-LD dado **real e existente**; onde faltar (ex.: uma logo dedicada), sinalizo em vez de inventar.

### 5. `robots.txt` aponta para um `sitemap.xml` que não existe 🟠
`Sitemap: https://codebypatrick.com/sitemap.xml` — mas **não há** sitemap gerado no projeto. Robô segue o link e bate num 404. **Lição:** só referenciar o sitemap depois de gerá-lo (no site novo vou usar `app/sitemap.ts`, que garante que existe).

### 6. GIF de 4,1 MB no hero 🔴 (performance)
`public/patrick-hero.gif` = **4,1 MB**. GIF é o pior formato para isso — pesa muito e destrói o LCP no celular (seu público de tráfego pago). Existe um `.webm` de 528 KB ao lado, bem mais leve. **Lição:** vídeo em `.webm`/`.mp4` com `poster`, nunca GIF pesado. (O site novo já usa `.mp4` + poster — melhor.)

### 7. Sem `og:image`, sem Twitter Card, sem canonical, sem `metadataBase` 🟡
O card de compartilhamento sai **sem imagem**. Não há Twitter Card nem canonical. **Lição:** o site novo já tem `og.png` 1200×630 e Twitter Card — manter e completar com canonical.

### 8. Página 100% dependente de `framer-motion` 🟡
Todos os componentes são `'use client'` com `initial: opacity 0`. O conteúdo até fica no HTML (crawlável), mas invisível até o JS rodar, e o custo de JS é bem maior (framer-motion + lucide + react-icons). **Lição:** animar com CSS quando der (como o site novo faz), reservando JS para o essencial.

---

## ✅ PARTE 2 — O que **vale copiar** (boas ideias, com execução corrigida)

### 1. Estratégia de dados estruturados com `@graph` ⭐
A ideia de um `@graph` com **`Person` + `Organization` + `ProfessionalService`** é ótima e mais rica do que o site novo (que hoje não tem **nenhum** JSON-LD). Vou portar esse esqueleto para o site novo, **corrigindo os dados**:
- `Person`: Patrick Gomes Siqueira, `jobTitle`, `url` = www.codebypatrick.dev, `sameAs` = [GitHub, WhatsApp].
- `Organization`: Patrick.Developer, `taxID` = **o CNPJ real** (58.315.507/0001-14), `logo` só se existir de verdade.
- `ProfessionalService`: `telephone`, `address` (Brasil/BA), `priceRange`, `description` — bom para busca de serviço.
- **Somando** o que o antigo não tinha: `FAQPage` (as 8 dúvidas do site novo) e `Service` por serviço. Ou seja, copiamos a base e **melhoramos**.

### 2. Foco no nome da marca (SEO de marca própria) ⭐
O antigo mira bem os termos que **um cliente digita**: "Patrick Siqueira", "Patrick.Developer", "CodeByPatrick", e o ângulo "CNPJ / Nota Fiscal / Pessoa Jurídica". Isso é inteligente — quem te conhece do Workana/99 vai te procurar pelo nome. **Como copiar do jeito certo:** colocar esses termos em **texto visível e verdadeiro** — no `<title>`, na description, no H1/subtítulo e no JSON-LD `Person`/`sameAs`. Nunca no bloco escondido. Efeito parecido, sem risco.

### 3. `authors` no metadata ⭐ (pequeno)
O antigo declara `authors: [{ name: "Patrick Siqueira" }]`. Barato e útil — vou incluir no site novo.

### 4. `alt` preenchido nas imagens ⭐
O antigo põe `alt` nas imagens (ex.: `alt={project.title}`) — melhor que o site novo, que hoje usa `alt=""`. **Copiar o hábito**, com descrições específicas (não genéricas como "Background Animation").

### 5. Alternativa `.webm` para a animação ⭐
Ter um `.webm` leve ao lado do GIF foi boa intenção — só faltou **usar** o leve. Lição aproveitada: servir sempre o formato leve.

---

## Síntese — o que isso muda no plano do site novo

| Item do site antigo | Veredito | Ação no site novo |
|---|---|---|
| Texto escondido (keywords) | 🚫 Black-hat | **Não copiar.** Já não existe no novo. |
| Domínio `.com` em tudo | 🚫 Erro | Padronizar **tudo** em `https://www.codebypatrick.dev`. |
| 2× H1 sem termo-alvo | 🚫 Erro | Novo já tem 1 H1; reforçar termo-alvo. |
| JSON-LD Person+Org+Service | ✅ Copiar (corrigido) | Portar `@graph` com dados reais + FAQPage + Service. |
| Foco no nome/marca + CNPJ | ✅ Copiar (visível) | Levar os termos para title/description/H1/JSON-LD. |
| `authors`, `alt`, `.webm` leve | ✅ Copiar | Incluir no novo. |
| GIF 4 MB, sem og:image, sem canonical | 🚫 Evitar | Novo já usa mp4+poster e og.png; falta só canonical. |
| robots→sitemap inexistente | 🚫 Evitar | Gerar sitemap de verdade (`app/sitemap.ts`) antes de referenciar. |

---

## Confirmação registrada

- **Domínio canônico:** `https://www.codebypatrick.dev` (com `www`). Ajuste necessário: o site novo usa `codebypatrick.dev` **sem www** no `metadataBase` — vou alinhar para `www` e, no deploy, garantir o 301 da versão sem-www para a com-www (ou vice-versa, se você preferir — me diga).

**Nada foi implementado.** Aguardo suas ordens para começar (Fase 1 do plano do site novo, já ajustada com os aprendizados acima).
