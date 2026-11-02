"use client";

import { useEffect, useState } from "react";
import PillNav from "@/components/ui/PillNav";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, profile } from "@/data/portfolio";
import { useIsDark } from "@/lib/useIsDark";

// Matches --accent in globals.css (the nav needs real colours, not CSS variables, for its contrast maths).
const ACCENT = { light: "#4f46e5", dark: "#818cf8" };

// Which section is crossing the middle of the viewport; "" while on the hero.
function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const current = sections.find((s) => visible.has(s.id));
        setActive(current ? `#${current.id}` : "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [hrefs]);
  return active;
}

const hrefs = navLinks.map((l) => l.href);
const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("");

export default function Navbar() {
  const dark = useIsDark();
  const active = useActiveSection(hrefs);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-4">
      {/* Spacer | nav | toggle: keeps the pill centred while the toggle sits on the right. */}
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-2 px-4 sm:px-6 md:grid-cols-[44px_1fr_44px]">
        <span className="hidden md:block" />
        <div className="pointer-events-auto flex min-w-0 justify-center">
          <PillNav
            logo={<span className="text-[13px] font-bold tracking-tight">{initials}</span>}
            logoAlt={`${profile.name} — back to top`}
            logoHref="#top"
            items={navLinks}
            activeHref={active}
            theme={dark ? "dark" : "light"}
            highlightColor={dark ? ACCENT.dark : ACCENT.light}
            itemStyle="plain"
            hoverEffect="fill"
            indicator="dot"
            surface="glass"
            size="md"
          />
        </div>
        <ThemeToggle className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-[rgba(240,240,243,0.8)] text-zinc-600 shadow-[0_22px_44px_-22px_rgba(24,24,27,0.3),0_6px_16px_-10px_rgba(24,24,27,0.16)] ring-1 ring-black/5 backdrop-blur-xl transition hover:text-zinc-900 dark:bg-[rgba(38,35,46,0.66)] dark:text-zinc-300 dark:ring-white/10 dark:hover:text-white" />
      </div>
    </header>
  );
}
