"use client";

import { useState } from "react";
import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
import Field from "@/components/atoms/Field/Field";
import ChannelList from "@/components/molecules/ChannelList/ChannelList";
import ChoiceChips from "@/components/molecules/ChoiceChips/ChoiceChips";
import SectionHead from "@/components/molecules/SectionHead/SectionHead";
import { CONTACT } from "@/lib/contact";
import { enviarLead } from "@/lib/leads";
import styles from "./Contact.module.css";

const TYPES = [
  "SaaS ou plataforma",
  "Automação",
  "Loja ou sistema",
  "Site ou página de venda",
  "Resgatar projeto parado",
  "Ainda não sei",
];

const CHANNELS = [
  {
    label: "e-mail",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    label: "whatsapp",
    value: "(71) 98286-2912",
    href: CONTACT.whatsapp
      ? `https://wa.me/${CONTACT.whatsapp}`
      : `mailto:${CONTACT.email}`,
    external: Boolean(CONTACT.whatsapp),
  },
  {
    label: "github",
    value: "@gsPatrick",
    href: "https://github.com/gsPatrick",
    external: true,
  },
  {
    label: "linkedin",
    value: "Patrick Siqueira",
    href: "https://www.linkedin.com/in/patrick-siqueira-2833a4264/",
    external: true,
  },
];

export default function Contact() {
  const [type, setType] = useState(TYPES[0]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    mensagem: "",
  });
  const [status, setStatus] = useState("idle");

  const update = (key) => (event) =>
    setForm((state) => ({ ...state, [key]: event.target.value }));

  const buildMessage = () =>
    [
      `Olá Patrick! Sou ${form.nome || "um novo contato"}.`,
      `O que eu preciso: ${type}`,
      form.email ? `E-mail: ${form.email}` : "",
      form.mensagem ? `\nSobre o projeto: ${form.mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const whatsappLink = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
        buildMessage()
      )}`
    : null;

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus("sending");

    // Grava o conteúdo do formulário no meu banco (aparece na página de Clientes).
    enviarLead({
      nome: form.nome,
      email: form.email,
      whatsapp: form.whatsapp,
      tipo: type,
      mensagem: form.mensagem,
    });

    // Registra o lead completo por e-mail (Formspree) e abre o WhatsApp.
    fetch(CONTACT.formspree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        tipo: type,
        mensagem: form.mensagem,
        _subject: `Novo projeto: ${type} — ${form.nome}`,
      }),
    })
      .then((response) => setStatus(response.ok ? "done" : "error"))
      .catch(() => setStatus("error"));

    if (whatsappLink) window.open(whatsappLink, "_blank", "noopener");
  };

  return (
    <section className={styles.section} id="contato">
      <div className={styles.inner}>
        <div className={styles.aside}>
          <SectionHead
            kicker="vamos conversar"
            title={"Me conta o que\nvocê quer *construir*."}
            lead="A primeira conversa é gratuita e dura 30 minutos. Se eu não for a pessoa certa para o seu caso, eu digo na hora e indico alguém."
          />

          <Badge pulse>Respondo em até 30 minutos</Badge>

          <ChannelList channels={CHANNELS} />
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <Field
            id="nome"
            label="Seu nome"
            placeholder="Como devo te chamar"
            value={form.nome}
            onChange={update("nome")}
            required
          />

          <div className={styles.grid}>
            <Field
              id="email"
              type="email"
              label="Seu e-mail"
              placeholder="voce@email.com"
              value={form.email}
              onChange={update("email")}
              required
            />

            <Field
              id="whatsapp"
              type="tel"
              label="Seu WhatsApp"
              placeholder="(00) 00000-0000"
              value={form.whatsapp}
              onChange={update("whatsapp")}
              required
            />
          </div>

          <ChoiceChips
            label="O que você precisa"
            options={TYPES}
            value={type}
            onChange={setType}
          />

          <Field
            id="mensagem"
            as="textarea"
            label="Sobre o projeto"
            hint="opcional"
            placeholder="O que você quer construir, para quem é e se já existe alguma coisa pronta."
            value={form.mensagem}
            onChange={update("mensagem")}
          />

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="primary"
              icon="→"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando..." : "Enviar mensagem"}
            </Button>

            <p className={styles.note}>
              Chega no meu e-mail e abre o WhatsApp com tudo pronto.
            </p>
          </div>

          {status === "done" ? (
            <p className={`${styles.status} ${styles.ok}`} role="status">
              <span className={styles.statusDot} aria-hidden="true" />
              Recebido! Já abri o WhatsApp com sua mensagem. Respondo em até 30
              minutos.
            </p>
          ) : null}

          {status === "error" ? (
            <p className={`${styles.status} ${styles.fail}`} role="status">
              Não consegui enviar agora. Me chama direto no{" "}
              <a className={styles.statusLink} href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              .
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
