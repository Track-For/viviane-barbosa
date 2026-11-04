import { artesanal } from "@/data/artesanal";
import { getSiteUrl, siteConfig } from "@/lib/site";
export function getHomeStructuredData() {
  const url = getSiteUrl();
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${url}/#organization`, name: siteConfig.alternateName, url, description: siteConfig.description, founder: { "@id": `${url}/#rubia` }, sameAs: [artesanal.instagram] },
    { "@type": "Person", "@id": `${url}/#rubia`, name: "Rúbia Pinheiro", jobTitle: "Consultora de gestão de clínicas" },
    { "@type": "WebSite", "@id": `${url}/#website`, url, name: siteConfig.alternateName, inLanguage: "pt-BR", publisher: { "@id": `${url}/#organization` } },
    ...artesanal.services.map(service => ({ "@type": "Service", name: service.title, description: service.text, provider: { "@id": `${url}/#organization` }, audience: { "@type": "Audience", audienceType: "Clínicas" } })),
    { "@type": "FAQPage", mainEntity: artesanal.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ] };
}
