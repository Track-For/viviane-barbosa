export const siteConfig = {
  name: "Viviane Barbosa",
  alternateName: "Viviane Barbosa Psicologia",
  title: "Psicóloga online para brasileiros no exterior | Viviane Barbosa",
  description:
    "Psicoterapia online em português para brasileiros que vivem fora do país: acolhimento para solidão, ansiedade e burnout. Mentoria de comunicação para quem empreende.",
  language: "pt-BR",
  locale: "pt_BR",
  themeColor: "#f5f1eb",
  keywords: [
    "psicóloga online para brasileiros no exterior",
    "psicoterapia online em português",
    "terapia para brasileiros no exterior",
    "solidão morando fora do país",
    "crise de ansiedade no exterior",
    "burnout e crise do guerreiro",
    "mentoria de comunicação para empreendedores",
    "posicionamento para empreendedores",
    "liderança e comunicação para empreendedores",
  ],
} as const;

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  return withProtocol(configuredUrl.trim()).replace(/\/$/, "");
}

export function getAbsoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
