import { ParallaxMain } from "@/components/layout/ParallaxMain";
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
import { ShaderStory } from "@/components/sections/ShaderStory";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeStructuredData } from "@/lib/structured-data";

export default function HomePage() {
  const structuredData = getHomeStructuredData();

  return (
    <>
      <ParallaxMain>
        <Hero />
        <ClarityStrip />
        <CinematicMarquee />
        <About />
        <FocusAreas />
        <ShaderStory />
        <AttendanceModes />
        <FinalCta />
        <EditorialGallery />
        <Approach />
        <Process />
        <Faq />
        <Contact />
      </ParallaxMain>
      <JsonLd id="viviane-barbosa-structured-data" data={structuredData} />
    </>
  );
}
