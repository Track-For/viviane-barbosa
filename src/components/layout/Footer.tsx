import { Link } from "next-view-transitions";

import { profile, profileLinks } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <strong>{profile.displayName}</strong>
          <span>
            {profile.fullName} | {profile.crp}
          </span>
        </div>
        <div className="footer-contact">
          <span>{profileLinks.email}</span>
          <span>{profileLinks.instagram}</span>
        </div>
        <nav aria-label="Links do rodapé">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/#inicio">Voltar ao início</Link>
        </nav>
      </div>
    </footer>
  );
}
