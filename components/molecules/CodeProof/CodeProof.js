"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CodeProof.module.css";

const SNIPPETS = [
  {
    file: "pedido.js",
    note: "Automação de pedido + WhatsApp",
    code: [
      'app.post("/pedido", async (req, res) => {',
      "  const pedido = await salvar(req.body)",
      '  await whatsapp.enviar(pedido.tel, "Confirmado")',
      "  res.json({ ok: true })",
      "})",
    ],
  },
  {
    file: "checkout.jsx",
    note: "Pagamento online em uma tela",
    code: [
      "function Checkout({ produto }) {",
      "  async function pagar() {",
      "    const url = await stripe.criar(produto)",
      "    window.location = url",
      "  }",
      "  return <Botao onClick={pagar}>Comprar</Botao>",
      "}",
    ],
  },
  {
    file: "agenda.js",
    note: "Agendamento com lembrete automático",
    code: [
      "export async function agendar(cliente, hora) {",
      "  const consulta = await agenda.criar(cliente, hora)",
      "  await enviarLembrete(cliente)",
      "  return consulta",
      "}",
    ],
  },
];

const TOKEN =
  /("(?:[^"\\]|\\.)*")|(\/\/[^\n]*)|(\b(?:export|const|async|await|return|function|window|new|true|false)\b)|(<\/?[A-Z][\w]*)|([a-zA-Z_$][\w$]*(?=\s*\())/g;

function highlight(text) {
  const out = [];
  let last = 0;
  let m;
  let key = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const cls = m[1]
      ? styles.str
      : m[2]
      ? styles.cm
      : m[3]
      ? styles.kw
      : m[4]
      ? styles.jsx
      : styles.fn;
    out.push(
      <span className={cls} key={key++}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function CodeProof() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const seen = useRef(false);

  const snippet = SNIPPETS[index];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = [];
    const clearAll = () => timers.forEach((t) => window.clearTimeout(t));

    const run = (idx) => {
      const full = SNIPPETS[idx].code.join("\n");

      if (reduce) {
        setTyped(full);
        setDone(true);
        return;
      }

      setDone(false);
      setTyped("");

      let i = 0;
      const type = () => {
        i += 1;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          setDone(true);
          timers.push(
            window.setTimeout(() => {
              const next = (idx + 1) % SNIPPETS.length;
              setIndex(next);
              run(next);
            }, 4200)
          );
          return;
        }
        const ch = full[i - 1];
        const delay = ch === "\n" ? 160 : 22 + Math.random() * 48;
        timers.push(window.setTimeout(type, delay));
      };

      timers.push(window.setTimeout(type, 500));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !seen.current) {
          seen.current = true;
          run(0);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearAll();
    };
  }, []);

  return (
    <div className={styles.wrap} ref={ref} aria-hidden="true">
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.file}>{snippet.file}</span>
      </div>

      <pre className={styles.code}>
        <code>
          {highlight(typed)}
          {!done ? <span className={styles.caret} /> : null}
        </code>
      </pre>

      <div className={`${styles.status} ${done ? styles.statusOn : ""}`}>
        <span className={styles.pass}>
          <span className={styles.check}>
            <svg viewBox="0 0 12 12" width="9" height="9">
              <path
                d="M2 6.4l2.6 2.6L10 3.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          {snippet.note}
        </span>
        <span className={styles.meta}>no ar</span>
      </div>
    </div>
  );
}
