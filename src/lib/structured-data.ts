import { faqItems } from "@/data/faq";
import { media } from "@/data/media";
import { profile, profileLinks } from "@/data/profile";
import { getConfiguredValue, getInstagramUrl } from "@/lib/content";
import { getAbsoluteUrl, getSiteUrl, siteConfig } from "@/lib/site";

export function getHomeStructuredData() {
  const siteUrl = getSiteUrl();
  const homeUrl = getAbsoluteUrl("/");
  const professionalName = getConfiguredValue(profile.fullName) ?? profile.displayName;
  const crp = getConfiguredValue(profile.crp);
  const education = getConfiguredValue(profile.education);
  const email = getConfiguredValue(profileLinks.email);
  const instagram = getInstagramUrl(profileLinks.instagram);
  const sameAs = [instagram].filter((value): value is string => Boolean(value));

  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#viviane-barbosa`,
    name: professionalName,
    alternateName: profile.displayName,
    url: homeUrl,
    image: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(media.portrait.src),
      width: media.portrait.width,
      height: media.portrait.height,
      caption: media.portrait.alt,
    },
    jobTitle: profile.profession,
    description: profile.bio,
    knowsAbout: [
      "Psicoterapia online",
      "Saúde emocional de brasileiras no exterior",
      "Solidão e adaptação cultural",
      "Crises de ansiedade",
      "Burnout",
      "Comunicação e posicionamento para mulheres empreendedoras",
      "Liderança de pessoas",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Psicóloga",
      skills: ["Psicoterapia", "Escuta qualificada", "Comunicação", "Liderança"],
    },
    ...(crp
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Registro profissional",
            name: crp,
          },
        }
      : {}),
    ...(education ? { alumniOf: { "@type": "EducationalOrganization", name: education } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.alternateName,
    alternateName: siteConfig.name,
    url: homeUrl,
    founder: { "@id": `${siteUrl}/#viviane-barbosa` },
    description: siteConfig.description,
    areaServed: "Internacional",
    ...(email ? { email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  const psychotherapyService = {
    "@type": "Service",
    "@id": `${siteUrl}/#psicoterapia-online`,
    name: "Psicoterapia online em português para brasileiras no exterior",
    serviceType: "Psicoterapia online",
    description:
      "Acompanhamento psicológico em português para brasileiras que vivem fora do país e enfrentam solidão, ansiedade, dificuldade de pertencimento, exaustão ou burnout.",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Internacional",
    audience: {
      "@type": "Audience",
      audienceType: "Brasileiras adultas que vivem no exterior",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${homeUrl}#contato`,
      availableLanguage: {
        "@type": "Language",
        name: "Português do Brasil",
        alternateName: "pt-BR",
      },
    },
  };

  const mentoringService = {
    "@type": "Service",
    "@id": `${siteUrl}/#mentoria-comunicacao`,
    name: "Mentoria de comunicação para mulheres empreendedoras",
    serviceType: "Mentoria de comunicação e posicionamento",
    description:
      "Mentoria para mulheres empreendedoras que querem comunicar o valor do próprio trabalho, liderar pessoas e vender mais sem sustentar uma persona que as desconecta de si.",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Internacional",
    audience: {
      "@type": "Audience",
      audienceType: "Mulheres empreendedoras e líderes",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${homeUrl}#contato`,
      availableLanguage: {
        "@type": "Language",
        name: "Português do Brasil",
        alternateName: "pt-BR",
      },
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#perguntas-frequentes`,
    name: "Dúvidas sobre psicoterapia online e mentoria de comunicação",
    url: `${homeUrl}#duvidas`,
    inLanguage: siteConfig.language,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: homeUrl,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: homeUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: [
          { "@id": `${siteUrl}/#viviane-barbosa` },
          { "@id": `${siteUrl}/#psicoterapia-online` },
          { "@id": `${siteUrl}/#mentoria-comunicacao` },
        ],
        mainEntity: [
          { "@id": `${siteUrl}/#psicoterapia-online` },
          { "@id": `${siteUrl}/#mentoria-comunicacao` },
          { "@id": `${siteUrl}/#perguntas-frequentes` },
        ],
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: getAbsoluteUrl(media.hero.src),
          caption: media.hero.alt,
        },
      },
      person,
      organization,
      psychotherapyService,
      mentoringService,
      faqPage,
    ],
  };
}
