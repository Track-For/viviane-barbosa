import { About } from "@/components/sections/About";
import { ClarityStrip } from "@/components/sections/ClarityStrip";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <ClarityStrip />
      <About />
    </main>
  );
}
