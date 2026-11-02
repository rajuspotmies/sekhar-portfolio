"use client";

import { GlassIconReveal } from "@/components/ui/glass-icon-reveal";
import { logo, profile } from "@/data/portfolio";
import { useIsDark } from "@/lib/useIsDark";

// Must match --background / --accent in globals.css: the canvas paints its own backdrop.
const THEME = {
  light: { background: "#fafaf9", logoColor: "#4f46e5" },
  dark: { background: "#0c0a09", logoColor: "#818cf8", plateColor: "#161412" },
};

export default function HeroReveal({ className }: { className?: string }) {
  const dark = useIsDark();
  const look = dark ? "dark" : "light";

  return (
    <GlassIconReveal
      logo={logo}
      look={look}
      label={`${profile.name} logo`}
      tileSize={300}
      logoScale={0.6}
      finalScale={0.8}
      tuning={{ startZoom: 2.3 }}
      {...THEME[look]}
      className={className}
      style={{ backgroundColor: "var(--background)" }}
      title="Click to replay"
    />
  );
}
