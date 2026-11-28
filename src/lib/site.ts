export const siteConfig = {
  name: "Viviane Barbosa",
  alternateName: "Viviane Barbosa Psicologia",
  title: "Psicóloga online para brasileiros no exterior | Viviane Barbosa",
  description:
    "Psicoterapia online em português com Viviane Barbosa para brasileiros no exterior. Atendimento para lidar com saudade, solidão, ansiedade e adaptação a outro país.",
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
