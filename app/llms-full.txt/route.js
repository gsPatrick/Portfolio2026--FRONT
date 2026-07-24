import { SITE } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { FAQ } from "@/lib/faq";

export const dynamic = "force-static";

// /llms-full.txt — versão completa: resumo + serviços detalhados + perguntas e
// respostas reais (as mesmas da seção Dúvidas). Só conteúdo real do site.
export function GET() {
  const servicos = SERVICES.map(
    (s) => `### ${s.title}\n${s.description}\n- ${s.tags.join("\n- ")}`
  ).join("\n\n");

  const perguntas = FAQ.map((q) => `### ${q.question}\n${q.answer}`).join("\n\n");

  const body = `# Patrick.Developer — Patrick Gomes Siqueira (versão completa)

> Desenvolvedor full-stack brasileiro que cria SaaS, automações, sistemas, lojas virtuais, sites e aplicativos sob medida, do escopo ao deploy, para pequenos negócios e startups. CNPJ próprio, Nota Fiscal e contrato. 60+ projetos, nota 4,9.

## Sobre
Patrick Gomes Siqueira (Patrick Siqueira / marca Patrick.Developer) atua há 7 anos como desenvolvedor full-stack, 100% remoto, atendendo o Brasil inteiro. Antes de programar, entende onde o negócio do cliente trava e propõe só a tecnologia que resolve. Entrega a solução inteira — telas, código, banco de dados, integrações e publicação — e segue dando suporte depois da entrega.

## Como trabalha
- Escopo e preço fechados por escrito antes da primeira linha de código
- Entrega semanal, no ambiente do cliente, com tudo documentado
- Pagamento por etapas (Pix, cartão parcelado, transferência; ou retido em garantia no Workana/99Freelas)
- O projeto fica no nome do cliente: código, domínio, servidor e contas
- 7 dias de suporte gratuito após a entrega; manutenção mensal opcional

## Provas reais
- Mais de 60 projetos entregues; nota média 4,9 em 60 avaliações; 90% de avaliações 5 estrelas
- Top 30 no ranking do 99Freelas
- Landing page no ar em menos de 48 horas; sistemas de duas a seis semanas
- Briefing em até 30 minutos após a primeira mensagem

## Serviços
${servicos}

## Perguntas frequentes
${perguntas}

## Páginas e perfis
- Início: ${SITE.url}/
- Projetos: ${SITE.url}/projetos
- Carreira: ${SITE.url}/carreira
- LinkedIn: https://www.linkedin.com/in/patrick-siqueira-2833a4264/
- GitHub: ${SITE.github}
- Workana: https://www.workana.com/freelancer/977647b4044843eea7e5c7811a8c1463
- 99Freelas: https://www.99freelas.com.br/user/Patrickpgs

## Contato
- E-mail: ${SITE.email}
- WhatsApp: +${SITE.whatsapp}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
