import { MessageCircle } from "lucide-react";

import { profileLinks } from "@/data/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const url = buildWhatsAppUrl(profileLinks.whatsapp, "Olá, gostaria de informações sobre o atendimento.");

  return (
    <a
      className="whatsapp-float"
      href={url ?? "/#contato"}
      target={url ? "_blank" : undefined}
      rel={url ? "noreferrer" : undefined}
      aria-label="Agendar conversa"
      title="Agendar conversa"
    >
      <MessageCircle aria-hidden="true" size={21} strokeWidth={1.6} />
    </a>
  );
}
