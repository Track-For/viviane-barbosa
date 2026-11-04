import { artesanal } from "@/data/artesanal";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
export const dynamic = "force-static";
export function GET() {
  const services = artesanal.services.map(item => `### ${item.title}\n${item.text}`).join("\n\n");
  const faq = artesanal.faq.map(item => `### ${item.question}\n${item.answer}`).join("\n\n");
  const content = `# ${siteConfig.alternateName}\n\n> ${siteConfig.description}\n\n## Site\n${getAbsoluteUrl("/")}\n\n## Sobre\nA Artesanal é uma consultoria para clínicas liderada por Rúbia Pinheiro. Cada negócio, uma peça única.\n\n## Soluções\n${services}\n\n## Perguntas frequentes\n${faq}\n\n## Contato\n${getAbsoluteUrl("/#contato")}\n`;
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
