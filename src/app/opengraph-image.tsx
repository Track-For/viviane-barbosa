import { createSocialCard } from "@/lib/social-card";

export const alt = "Artesanal — BPO financeiro e consultoria para clínicas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialCard();
}
