export const siteConfig = {
  name: "Artesanal",
  alternateName: "Artesanal — Soluções Médicas",
  title: "Artesanal | BPO Financeiro e Consultoria para Clínicas",
  description: "Gestão financeira e consultoria para clínicas com Rúbia Pinheiro. Organização, relatórios estratégicos e acompanhamento próximo. Cada negócio, uma peça única.",
  language: "pt-BR", locale: "pt_BR", themeColor: "#f5f0e8",
  keywords: ["BPO financeiro para clínicas", "consultoria para clínicas", "gestão de clínicas", "Artesanal Soluções Médicas", "Rúbia Pinheiro", "gestão financeira"],
} as const;
function withProtocol(value: string) { return /^https?:\/\//i.test(value) ? value : `https://${value}`; }
export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";
  return withProtocol(configuredUrl.trim()).replace(/\/$/, "");
}
export function getAbsoluteUrl(path = "/") { return new URL(path, `${getSiteUrl()}/`).toString(); }
