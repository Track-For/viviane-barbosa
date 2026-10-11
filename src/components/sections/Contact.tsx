"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile, profileLinks } from "@/data/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Digite seu nome."),
  contact: z.string().trim().min(6, "Informe um WhatsApp ou e-mail válido."),
  mode: z.enum(["online", "presencial", "a-definir"]),
  message: z.string().trim().max(600, "Use no máximo 600 caracteres."),
  consent: z.boolean().refine(Boolean, "Confirme que leu o aviso de privacidade."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "placeholder" | "ready">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      contact: "",
      mode: "a-definir",
      message: "",
      consent: false,
    },
  });

  const submit = async (data: ContactFormData) => {
    const message = [
      `Olá, meu nome é ${data.name}.`,
      `Tenho interesse em atendimento ${data.mode === "a-definir" ? "e gostaria de entender as modalidades" : data.mode}.`,
      `Meu contato: ${data.contact}.`,
      data.message ? `Mensagem: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = buildWhatsAppUrl(profileLinks.whatsapp, message);

    if (!url) {
      setStatus("placeholder");
      return;
    }

    setStatus("ready");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contato" className="section contact-section">
      <div className="site-container contact-layout">
        <div className="contact-copy">
          <SectionLabel>Primeiro contato</SectionLabel>
          <h2>Uma conversa simples pode abrir o caminho.</h2>
          <p>
            Envie seus dados de contato e sua preferência de modalidade. Nenhuma informação clínica precisa ser
            compartilhada aqui.
          </p>

          <ul className="contact-details">
            <li>
              <MessageCircle aria-hidden="true" size={19} strokeWidth={1.5} />
              <span>{profileLinks.whatsapp}</span>
            </li>
            <li>
              <Mail aria-hidden="true" size={19} strokeWidth={1.5} />
              <span>{profileLinks.email}</span>
            </li>
            <li>
              <MapPin aria-hidden="true" size={19} strokeWidth={1.5} />
              <span>{profile.city}</span>
            </li>
            <li>
              <Clock3 aria-hidden="true" size={19} strokeWidth={1.5} />
              <span>{profile.hours}</span>
            </li>
          </ul>
        </div>

        <form className="contact-form glass-panel" onSubmit={handleSubmit(submit)} noValidate>
          <div className="field-group">
            <label htmlFor="name">Seu nome</label>
            <input id="name" type="text" autoComplete="name" {...register("name")} />
            {errors.name ? <p className="field-error">{errors.name.message}</p> : null}
          </div>

          <div className="field-group">
            <label htmlFor="contact">WhatsApp ou e-mail</label>
            <input id="contact" type="text" autoComplete="email" {...register("contact")} />
            {errors.contact ? <p className="field-error">{errors.contact.message}</p> : null}
          </div>

          <fieldset className="field-group">
            <legend>Modalidade de preferência</legend>
            <div className="radio-grid">
              <label>
                <input type="radio" value="online" {...register("mode")} />
                <span>Online</span>
              </label>
              <label>
                <input type="radio" value="presencial" {...register("mode")} />
                <span>Presencial</span>
              </label>
              <label>
                <input type="radio" value="a-definir" {...register("mode")} />
                <span>A definir</span>
              </label>
            </div>
          </fieldset>

          <div className="field-group">
            <label htmlFor="message">Mensagem breve (opcional)</label>
            <textarea id="message" rows={4} {...register("message")} />
            {errors.message ? <p className="field-error">{errors.message.message}</p> : null}
          </div>

          <div className="consent-field">
            <label>
              <input type="checkbox" {...register("consent")} />
              <span>
                Li o <Link href="/privacidade">aviso de privacidade</Link> e autorizo o uso destes dados para retorno.
              </span>
            </label>
            {errors.consent ? <p className="field-error">{errors.consent.message}</p> : null}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Preparando mensagem" : "Agendar conversa"}
          </Button>

          <div className="form-status" aria-live="polite">
            {status === "placeholder" ? (
              <p>Formulário validado. Insira [WHATSAPP] para ativar o envio da mensagem.</p>
            ) : null}
            {status === "ready" ? <p>A conversa foi aberta em uma nova janela.</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
