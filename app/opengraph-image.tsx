import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Philosopher AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 18% 18%, rgba(251,191,36,0.22), transparent 26%), linear-gradient(135deg, #18181B 0%, #09090B 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
          padding: "52px 64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 36,
            border: "1px solid rgba(251,191,36,0.18)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                fontSize: 70,
                fontWeight: 700,
                letterSpacing: "-0.06em",
              }}
            >
              <span style={{ color: "#FBBF24" }}>Philosopher</span>
              <span style={{ marginLeft: 14, color: "#F8FAFC" }}>Ai</span>
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                color: "#A1A1AA",
                fontSize: 22,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Conversational wisdom from history
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                lineHeight: 1.02,
                fontWeight: 700,
                maxWidth: 960,
                letterSpacing: "-0.06em",
              }}
            >
              Explore the minds of history&apos;s greatest thinkers.
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "sans-serif",
                color: "#D4D4D8",
                fontSize: 30,
                maxWidth: 920,
                lineHeight: 1.35,
              }}
            >
              Deep philosophical conversations, secure accounts, and Pro access
              for longer daily dialogue.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
