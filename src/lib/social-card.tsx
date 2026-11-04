import { ImageResponse } from "next/og";
export function createSocialCard() {
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#68432e",color:"#f5e9d7",padding:"65px 80px",fontFamily:"Georgia, serif"}}><div style={{display:"flex",fontSize:28,letterSpacing:".15em",color:"#dabb91"}}>ARTESANAL · SOLUÇÕES MÉDICAS</div><div style={{display:"flex",fontSize:74,lineHeight:1.05,maxWidth:1000}}>Sua clínica tem uma história. O próximo capítulo precisa de clareza.</div><div style={{display:"flex",fontSize:24,color:"#dabb91"}}>BPO financeiro e consultoria para clínicas · Rúbia Pinheiro</div></div>,{width:1200,height:630});
}
