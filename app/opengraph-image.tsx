import { ImageResponse } from "next/og";

// Branded social-share image used as the default Open Graph / Twitter card.
export const alt = "ADUYes — Free ADU feasibility & cost calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #064e3b 0%, #0f172a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>ADUYes</div>
        </div>
        <div style={{ marginTop: 40, fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 980 }}>
          Can you build an ADU? Find out in 60 seconds.
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#a7f3d0" }}>
          Free feasibility &amp; cost calculator · rules for all 50 states
        </div>
      </div>
    ),
    { ...size }
  );
}
