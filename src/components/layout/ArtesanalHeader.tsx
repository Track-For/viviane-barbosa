"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArtesanalBrand } from "./ArtesanalBrand";
import { artesanal } from "@/data/artesanal";
const links = [["A Artesanal", "/#artesanal"], ["Soluções", "/#solucoes"], ["Nossa essência", "/#essencia"], ["Dúvidas", "/#duvidas"]];
export function ArtesanalHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function close(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <header className="art-header">
    <a className="art-skip" href="#conteudo">Ir para o conteúdo</a>
    <div className="art-container art-header-inner">
      <Link href="/" aria-label="Artesanal — início" onClick={() => setOpen(false)}><ArtesanalBrand compact /></Link>
      <nav className="art-desktop-nav" aria-label="Navegação principal">{links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</nav>
      <a className="art-header-cta" href={artesanal.whatsapp} target="_blank" rel="noopener noreferrer">Vamos conversar <span aria-hidden="true">↗</span></a>
      <button className="art-menu-button" aria-expanded={open} aria-controls="art-mobile-nav" onClick={() => setOpen(!open)}>{open ? "Fechar −" : "Menu +"}</button>
    </div>
    {open && <nav id="art-mobile-nav" className="art-mobile-nav" aria-label="Navegação móvel">{links.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{name}</Link>)}<a href={artesanal.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Vamos conversar ↗</a></nav>}
  </header>;
}
