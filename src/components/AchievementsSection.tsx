import { Building2, Cpu, Rocket, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import CountUp from "@/components/CountUp";
import { achievements } from "@/data/portfolio";

/**
 * 00 Achievements: right after the hero. One featured panel (Spotmies, with its numbers) and three cards under it.
 * Cards rise in on scroll (the site's .npc-reveal), numbers count up, hover lifts a card. All wording is in
 * portfolio.ts (`achievements`).
 */
const ICONS = [Building2, Cpu, Sparkles, Rocket];

type Item = (typeof achievements.items)[number];

function Numbers({ numbers, inverted }: { numbers: Item["numbers"]; inverted?: boolean }) {
  return (
    <dl className={inverted ? "grid grid-cols-2 gap-x-5 gap-y-5 sm:gap-x-6 sm:gap-y-8" : "mt-6 flex flex-wrap gap-x-8 gap-y-4 sm:mt-8 sm:gap-x-10"}>
      {numbers.map((n) => (
        <div key={n.label} className={inverted ? "border-t border-background/25 pt-3 sm:pt-4" : "border-t border-border pt-3"}>
          <dd className={"font-serif leading-none tracking-[-0.02em] " + (inverted ? "text-[34px] sm:text-[64px]" : "text-[34px] sm:text-[48px]")}>
            <CountUp to={n.to} prefix={n.prefix} suffix={n.suffix} />
          </dd>
          <dt className={"mt-1.5 text-[13px] leading-snug sm:mt-2 sm:text-sm " + (inverted ? "text-background/70" : "text-muted")}>{n.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export default function AchievementsSection() {
  const [feature, ...rest] = achievements.items;
  const FeatureIcon = ICONS[0]!;
  return (
    <Section id="achievements" index="00" eyebrow={achievements.eyebrow} title={achievements.title}>
      {/* Featured: inverted panel (black in light mode, white in dark), like the site's primary pill */}
      <article className="npc-reveal group relative overflow-hidden rounded-3xl bg-foreground p-5 text-background sm:p-10 lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent opacity-40 blur-[90px] transition-opacity duration-700 group-hover:opacity-70"
        />
        <div className="relative grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-background/70 uppercase">
              <FeatureIcon size={16} aria-hidden /> 01 · {feature!.kicker}
            </p>
            <h3 className="mt-3 font-serif text-[28px] leading-[1.1] text-balance sm:mt-5 sm:text-[44px]">{feature!.title}</h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-pretty text-background/75 sm:mt-5 sm:text-lg">{feature!.body}</p>
          </div>
          <div>
            <Numbers numbers={feature!.numbers} inverted />
          </div>
        </div>
      </article>

      {/* Two short cards stacked on the left, the one with numbers (Reaidy) as a tall card on the right, so no card is stretched to fit another */}
      <ol className="mt-3 grid gap-3 sm:mt-5 sm:gap-5 md:grid-cols-2">
        {rest.map((a, i) => {
          const Icon = ICONS[i + 1]!;
          const tall = a.numbers.length > 0;
          const logo = "logo" in a ? a.logo : null;
          return (
            <li
              key={a.title}
              style={{ "--npc-i": i + 1 } as React.CSSProperties}
              className={
                "npc-reveal group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-accent sm:p-7 " +
                (tall ? "md:col-start-2 md:row-span-2 md:row-start-1" : "md:col-start-1")
              }
            >
              <div className="flex items-center gap-3">
                {logo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.alt} className={"h-auto w-28 sm:w-32 " + (logo.darkSrc ? "dark:hidden" : "")} />
                    {logo.darkSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo.darkSrc} alt={logo.alt} className="hidden h-auto w-28 sm:w-32 dark:block" />
                    )}
                  </>
                ) : (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-accent transition group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                    <Icon size={18} aria-hidden />
                  </span>
                )}
                <p className={"font-mono text-xs tracking-[0.2em] text-muted uppercase " + (logo ? "ml-auto" : "")}>
                  {String(i + 2).padStart(2, "0")} · {a.kicker}
                </p>
              </div>
              <h3 className="mt-3 font-serif text-[22px] leading-tight text-balance sm:mt-4 sm:text-[28px]">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-pretty text-muted sm:mt-3 sm:text-base">{a.body}</p>
              {tall && (
                <div className="mt-auto">
                  <Numbers numbers={a.numbers} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
