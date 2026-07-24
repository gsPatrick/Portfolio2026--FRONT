// Envia o conteúdo do formulário de contato para a API (grava no banco).
// Deriva a URL do mesmo endpoint de rastreamento (.../events -> .../leads).
import { context, TRACK_ENDPOINT } from "@/lib/track";

function leadsEndpoint() {
  if (!TRACK_ENDPOINT) return "";
  return TRACK_ENDPOINT.replace(/\/events\/?$/, "/leads");
}

// Não bloqueia o fluxo do usuário: falhou, seguimos (Formspree/WhatsApp continuam).
export async function enviarLead(dados) {
  const endpoint = leadsEndpoint();
  if (!endpoint) return { ok: false, skipped: true };

  let ctx = {};
  try {
    ctx = context();
  } catch (e) {
    ctx = {};
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...dados,
        visitorId: ctx.visitorId || null,
        sessionId: ctx.sessionId || null,
        path: ctx.path || (typeof location !== "undefined" ? location.pathname : null),
      }),
      keepalive: true,
    });
    return { ok: res.ok };
  } catch (e) {
    return { ok: false, error: true };
  }
}
