import { createSocialCard } from "@/lib/social-card";

export const alt = "Viviane Barbosa, psicoterapia online para quem vive fora do Brasil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialCard();
}
