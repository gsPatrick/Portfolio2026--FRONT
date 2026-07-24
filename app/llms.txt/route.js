import { SITE } from "@/lib/seo";

export const dynamic = "force-static";

// /llms.txt — resumo factual e enxuto do site para modelos de IA.
// Só dados reais, já presentes no site. Domínio sempre com www.
export function GET() {
  const body = `# Patrick.Developer — Patrick Gomes Siqueira

> Desenvolvedor full-stack brasileiro que cria SaaS, automações, sistemas, lojas virtuais, sites e aplicativos sob medida, do escopo ao deploy, para pequenos negócios e startups.

## Quem
- Nome: Patrick Gomes Siqueira (também conhecido como Patrick Siqueira; marca: Patrick.Developer)
- Atuação: Desenvolvedor full-stack, 100% remoto, atende o Brasil inteiro
- Formalização: CNPJ próprio (58.315.507/0001-14), emite Nota Fiscal e trabalha com contrato
- Experiência: 7 anos; mais de 60 projetos entregues

## O que faz
- SaaS e plataformas sob medida (login, planos, cobrança recorrente)
- Automações e integrações (WhatsApp, ERP/CRM, relatórios)
- Lojas virtuais e sistemas web
- Sites e páginas de venda
- Aplicativos para iPhone e Android
- Resgate de projeto parado (assume código de outro dev)

## Para quem
Pequenos negócios, empreendedores e startups que precisam de um produto digital sob medida com previsibilidade.

## Diferenciais reais
- Escopo e preço fechados por escrito antes da primeira linha de código
- Entrega semanal, no ambiente do cliente, com tudo documentado
- O projeto fica no nome do cliente: código, domínio, servidor e contas
- Nota média 4,9 em 60 avaliações de clientes no Workana e no 99Freelas; top 30 no 99Freelas
- Landing page no ar em menos de 48 horas; briefing em até 30 minutos após a mensagem

## Páginas
- Início: ${SITE.url}/
- Projetos entregues: ${SITE.url}/projetos
- Carreira e currículo: ${SITE.url}/carreira

## Perfis (mesma pessoa/entidade)
- LinkedIn: https://www.linkedin.com/in/patrick-siqueira-2833a4264/
- GitHub: ${SITE.github}
- Workana: https://www.workana.com/freelancer/977647b4044843eea7e5c7811a8c1463
- 99Freelas: https://www.99freelas.com.br/user/Patrickpgs

## Contato
- E-mail: ${SITE.email}
- WhatsApp: +${SITE.whatsapp}

## Mais detalhes
- Versão completa: ${SITE.url}/llms-full.txt
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
