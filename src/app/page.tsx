import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { AttendanceModes } from "@/components/sections/AttendanceModes";
import { ClarityStrip } from "@/components/sections/ClarityStrip";
import { CinematicMarquee } from "@/components/sections/CinematicMarquee";
import { Contact } from "@/components/sections/Contact";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FocusAreas } from "@/components/sections/FocusAreas";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: profile.displayName,
    url: getSiteUrl(),
    description:
      "Psicoterapia online e Mentoria de Comunicação para compreender padrões, fortalecer a segurança emocional e se posicionar com clareza.",
    serviceType: ["Psicoterapia", "Mentoria de Comunicação"],
  };

  return (
    <>
      <main className="overflow-x-clip">
        <Hero />
        <ClarityStrip />
        <CinematicMarquee />
        <About />
        <FocusAreas />
        <AttendanceModes />
        <EditorialGallery />
        <Approach />
        <Process />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
