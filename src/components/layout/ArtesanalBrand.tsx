export function ArtesanalBrand({ compact = false }: { compact?: boolean }) {
  return <span className={`art-brand${compact ? " art-brand--compact" : ""}`}>
    <svg viewBox="0 0 48 64" fill="none" aria-hidden="true"><path d="M8 57C8 30 14 6 24 4C34 6 40 30 40 57C35 45 30 38 24 38C18 38 13 45 8 57Z" stroke="currentColor" strokeWidth="1.3"/><path d="M11 45C15 31 20 23 24 23C28 23 33 31 37 45" stroke="currentColor" strokeWidth="1.3"/></svg>
    <span className="art-brand-name">ARTESANAL<small>SOLUÇÕES MÉDICAS</small></span>
  </span>;
}
