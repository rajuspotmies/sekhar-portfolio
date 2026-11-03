import HeroBadge from "@/components/HeroBadge";
import HeroDrift from "@/components/HeroDrift";
import OpenPlanLogo from "@/components/OpenPlanLogo";
import { hero, resolveHref } from "@/data/portfolio";

const HERO_ID = "hero";

/**
 * Hero: "between Hardware & Software." around the ID badge (docs/hero-footer-addendum.md §2).
 * Desktop (≥ 1024px): the badge keeps its original box in the right column; the giant words are
 * positioned from the card's geometry (see .hero in globals.css) so they never cover the card.
 * Below 1024px everything stacks in the addendum's mobile order.
 */
export default function Hero() {
  const { statement: s } = hero;

  return (
    <section id={HERO_ID} aria-labelledby="hero-title" className="hero relative isolate overflow-x-clip">
      {/* Hairline frame inset 24px (desktop only) */}
      <div aria-hidden className="pointer-events-none absolute inset-6 hidden border border-border lg:block" />

      {/* Faint outline year marker (decorative) */}
      <div aria-hidden className="hero-marker pointer-events-none absolute hidden items-start gap-1 lg:flex">
        <Asterisk />
        <span className="hero-outline font-sans text-[1em] leading-none font-medium tracking-tight">{hero.marker}</span>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="hero-box relative flex flex-col pt-24 pb-14 lg:justify-end lg:pt-0">
          {/* Screen readers hear the statement once, as one phrase; the visual words are aria-hidden. */}
          <p className="sr-only">{s.spoken}</p>

          {/* Status chip */}
          <p className="hero-edge hero-identity relative z-20 order-1 inline-flex items-center gap-2 self-start rounded-full border border-border px-3 py-1 font-mono text-xs text-muted lg:order-2">
            <span className="h-2 w-2 rounded-full bg-foreground" aria-hidden />
            {hero.status.prefix}
            <OpenPlanLogo className="h-3.5 w-3.5 text-foreground" />
            {hero.status.product}
          </p>

          {/* between / Hardware */}
          <div aria-hidden className="hero-words hero-words-top relative z-0 order-2 mt-8 font-serif lg:mt-0">
            <span className="hero-lead block text-[28px] italic leading-none lg:text-[34px]">{s.lead}</span>
            <span className="hero-line hero-drift-l block">
              <span className="hero-giant" style={{ animationDelay: "120ms" }}>
                {s.first}
              </span>
            </span>
          </div>

          {/* The ID badge (above the words) */}
          <HeroBadge alt={hero.badgeAlt} hint={hero.badgeHint} className="relative z-10 order-3" />

          {/* & / Software. */}
          <div aria-hidden className="hero-words hero-words-bottom relative z-0 order-4 font-serif">
            <span className="hero-amp italic leading-none">{s.joiner}</span>
            <span className="hero-line hero-drift-r block">
              <span className="hero-giant" style={{ animationDelay: "240ms" }}>
                {s.second}
              </span>
            </span>
          </div>

          {/* Identity block: the real content, visible on first paint (no opacity gating). */}
          <div className="hero-edge hero-identity relative z-20 order-5 mt-12 lg:order-3 lg:mt-6">
            <h1 id="hero-title" className="text-[40px] leading-[1.05] font-semibold tracking-tight lg:text-[48px]">
              {hero.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-3 font-mono text-[13px] uppercase tracking-[0.12em] text-muted">{hero.role}</p>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-muted">{hero.bio}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={resolveHref(hero.ctas.primary.href)}
                className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-85"
              >
                {hero.ctas.primary.label}
              </a>
              <a
                href={resolveHref(hero.ctas.secondary.href)}
                className="inline-flex h-11 items-center rounded-full border border-foreground/25 px-6 text-sm font-medium transition hover:border-foreground"
              >
                {hero.ctas.secondary.label}
              </a>
            </div>
          </div>

          {/* Venture trail */}
          <nav aria-label="Ventures" className="relative z-20 order-6 mt-10 lg:order-4 lg:self-center">
            <ol className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted">
              {hero.trail.map((t, i) => (
                <li key={t.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>→</span>}
                  <a href={resolveHref(t.href)} className="inline-flex min-h-11 items-center underline-offset-4 transition hover:text-foreground hover:underline">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Scroll indicator (desktop only) */}
      <a
        href={resolveHref(hero.scroll.href)}
        aria-label="Scroll to the story"
        className="hero-scroll absolute z-20 hidden flex-col items-center text-muted transition hover:text-foreground lg:flex"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-current">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">{hero.scroll.label}</span>
        </span>
        <span className="hero-scroll-line relative mt-2 block h-12 w-px overflow-hidden bg-border" aria-hidden>
          <span className="absolute inset-x-0 top-0 h-1/2 bg-current" />
        </span>
      </a>

      <HeroDrift heroId={HERO_ID} />
    </section>
  );
}

function Asterisk() {
  // "✳" drawn as an outline so it matches the outline year without relying on a symbol font.
  return (
    <svg viewBox="0 0 40 40" className="mt-[0.06em] h-[0.62em] w-[0.62em]" fill="none" stroke="var(--muted)" strokeWidth="1" aria-hidden>
      <path d="M17.5 2h5v13.2l9.3-9.3 3.5 3.5-9.3 9.3H39v5H26l9.3 9.3-3.5 3.5-9.3-9.3V38h-5V26.2l-9.3 9.3-3.5-3.5 9.3-9.3H1v-5h13l-9.3-9.3 3.5-3.5 9.3 9.3z" />
    </svg>
  );
}
