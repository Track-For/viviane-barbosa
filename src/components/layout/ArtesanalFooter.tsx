import Link from "next/link";
import { ArtesanalBrand } from "./ArtesanalBrand";
import { artesanal } from "@/data/artesanal";
export function ArtesanalFooter() {
  return <footer className="art-footer"><div className="art-container">
    <div className="art-footer-top"><Link href="/" aria-label="Artesanal — início"><ArtesanalBrand /></Link><p>Cada negócio,<br /><em>uma peça única.</em></p><div><a href={artesanal.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={artesanal.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></div>
    <div className="art-footer-bottom"><span>© {new Date().getFullYear()} Artesanal · Soluções Médicas</span><Link href="/privacidade">Privacidade</Link><Link href="/#inicio">Voltar ao topo ↑</Link></div>
  </div></footer>;
}
