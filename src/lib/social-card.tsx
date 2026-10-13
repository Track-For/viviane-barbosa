import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export function createSocialCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: siteConfig.themeColor,
          color: "#292c27",
          padding: "72px 82px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            right: -85,
            top: -115,
            background: "#a8b2a1",
            opacity: 0.72,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: 999,
            right: 150,
            bottom: -125,
            background: "#a66d56",
            opacity: 0.9,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 860,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontFamily: "Arial, sans-serif",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 54, height: 1, background: "#a66d56" }} />
            Psicoterapia online em português
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              Viver longe não precisa significar viver sozinha
            </div>
            <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 23, color: "#50564f" }}>
              Acolhimento para brasileiras no exterior
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 25, fontWeight: 700 }}>
            Viviane Barbosa · Psicóloga
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
