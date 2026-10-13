import { Link } from "next-view-transitions";

import { SocialHighlightCards } from "@/components/ui/SocialHighlightCards";
import { profile, profileLinks } from "@/data/profile";
import { getConfiguredValue } from "@/lib/content";

export function Footer() {
  const professionalName = getConfiguredValue(profile.fullName) ?? profile.displayName;
  const crp = getConfiguredValue(profile.crp);
  const email = getConfiguredValue(profileLinks.email);

  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <strong>{profile.displayName}</strong>
          <span>{crp ? `${professionalName} | ${crp}` : `${profile.profession} · Atendimento online`}</span>
        </div>
        <div className="footer-contact">
          {email ? <span>{email}</span> : null}
          <SocialHighlightCards />
        </div>
        <nav aria-label="Links do rodapé">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/#inicio">Voltar ao início</Link>
        </nav>
      </div>
    </footer>
  );
}
