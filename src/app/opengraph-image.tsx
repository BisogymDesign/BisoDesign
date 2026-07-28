import { ImageResponse } from "next/og";
import { readContent } from "@/lib/store";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const content = await readContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#0d0d0d",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, #2a0f05 0%, #0d0d0d 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundImage: "linear-gradient(135deg, #ff5f1f, #8b5cf6)",
            }}
          />
          <span style={{ fontSize: 40, fontWeight: 800, color: "#fff7ed" }}>
            {content.brand}
          </span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#fff7ed",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {content.heroTitle}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#ff5f1f",
            fontWeight: 600,
          }}
        >
          {content.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
