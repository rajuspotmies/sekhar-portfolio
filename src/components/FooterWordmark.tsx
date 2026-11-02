"use client";

import TechText from "@/components/ui/TechText";
import { useIsDark } from "@/lib/useIsDark";

// Canvas can't read CSS variables, so the accent is passed as a real colour (matches --accent).
const ACCENT = { light: "#4f46e5", dark: "#818cf8" };

export default function FooterWordmark({ text }: { text: string }) {
  const dark = useIsDark();

  return (
    <div className="h-36 text-foreground sm:h-52 lg:h-64">
      <TechText
        text={text}
        fontWeight={600}
        fontSize={190}
        letterSpacing={-0.05}
        color="currentColor"
        accentColor={dark ? ACCENT.dark : ACCENT.light}
        reveal="letter"
        specks={15}
        intro="metrics"
        introDuration={2.2}
        guides
        clickKick
      />
    </div>
  );
}
