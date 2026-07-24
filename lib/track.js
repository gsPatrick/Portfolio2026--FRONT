// Cliente de rastreamento — coleta eventos no front e envia em lote para a API.
// Endpoint fixo (produção). Pode ser sobrescrito por NEXT_PUBLIC_TRACK_URL.

const DEFAULT_ENDPOINT =
  "https://geral-api-portfolio.r954jc.easypanel.host/api/v1/events";

const ENDPOINT =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_TRACK_URL) ||
  DEFAULT_ENDPOINT;

const HEARTBEAT_MS = 15000; // pulso enquanto a aba está ativa
const FLUSH_MS = 8000; // envia a fila a cada 8s
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // sessão nova após 30min inativo

let queue = [];
let visitorId = null;
let sessionId = null;
let started = false;

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxxyxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getVisitorId() {
  try {
    let id = localStorage.getItem("pd_vid");
    if (!id) {
      id = uuid();
      localStorage.setItem("pd_vid", id);
    }
    return id;
  } catch (e) {
    return uuid();
  }
}

function getSessionId() {
  try {
    const now = Date.now();
    const last = Number(sessionStorage.getItem("pd_sid_ts") || 0);
    let id = sessionStorage.getItem("pd_sid");
    if (!id || now - last > SESSION_TIMEOUT_MS) {
      id = uuid();
      sessionStorage.setItem("pd_sid", id);
    }
    sessionStorage.setItem("pd_sid_ts", String(now));
    return id;
  } catch (e) {
    return uuid();
  }
}

// Classifica o aparelho em celular/tablet/computador (facilita a análise
// de tráfego pago sem precisar interpretar o userAgent no servidor).
function deviceType() {
  try {
    const ua = navigator.userAgent || "";
    if (/iPad|Tablet/i.test(ua)) return "tablet";
    if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "celular";
    return "computador";
  } catch (e) {
    return "desconhecido";
  }
}

let maxScrollPct = 0;
function registraScroll() {
  try {
    const doc = document.documentElement;
    const total = doc.scrollHeight - innerHeight;
    if (total <= 0) return;
    const pct = Math.min(100, Math.round(((scrollY || doc.scrollTop) / total) * 100));
    if (pct > maxScrollPct) maxScrollPct = pct;
  } catch (e) {
    /* ignore */
  }
}

function parseUtm(search) {
  const params = new URLSearchParams(search || "");
  const utm = {};
  ["source", "medium", "campaign", "term", "content"].forEach((k) => {
    const v = params.get(`utm_${k}`);
    if (v) utm[k] = v;
  });
  return utm;
}

function context() {
  return {
    visitorId,
    sessionId,
    path: typeof location !== "undefined" ? location.pathname : "",
  };
}

// Envia a fila. Usa sendBeacon quando disponível (sobrevive ao fechar a aba).
function flush(useBeacon = false) {
  if (!ENDPOINT || queue.length === 0) return;

  const payload = JSON.stringify({
    visitorId,
    sessionId,
    sentAt: Date.now(),
    events: queue,
  });
  queue = [];

  try {
    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {
    /* silencioso */
  }
}

// Registra um evento na fila.
export function track(type, payload = {}) {
  if (!started) return;
  queue.push({
    type,
    ts: Date.now(),
    path: typeof location !== "undefined" ? location.pathname : "",
    ...payload,
  });
  if (queue.length >= 20) flush();
}

let heartbeatTimer = 0;
let flushTimer = 0;

export function initTracking() {
  if (started || typeof window === "undefined") return;
  if (navigator.doNotTrack === "1") return; // respeita "Não rastrear"

  visitorId = getVisitorId();
  sessionId = getSessionId();
  started = true;

  const isNewSession = !sessionStorage.getItem("pd_started");
  sessionStorage.setItem("pd_started", "1");

  if (isNewSession) {
    track("session_start", {
      entryPath: location.pathname,
      referrer: document.referrer || null,
      utm: parseUtm(location.search),
      device: deviceType(),
      screen: { w: screen.width, h: screen.height },
      viewport: { w: innerWidth, h: innerHeight },
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: navigator.userAgent,
    });
  }

  window.addEventListener("scroll", registraScroll, { passive: true });

  heartbeatTimer = window.setInterval(() => {
    if (document.visibilityState === "visible") {
      getSessionId(); // renova o timestamp da sessão
      track("heartbeat");
    }
  }, HEARTBEAT_MS);

  flushTimer = window.setInterval(() => flush(false), FLUSH_MS);

  const onHidden = () => {
    track("session_end", {
      durationMs: performance.now(),
      maxScrollPct, // até onde a pessoa rolou a página (0–100)
    });
    flush(true);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onHidden();
  });
  window.addEventListener("pagehide", onHidden);
}

export function stopTracking() {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  if (flushTimer) clearInterval(flushTimer);
  flush(true);
  started = false;
}

export { context, ENDPOINT as TRACK_ENDPOINT };
