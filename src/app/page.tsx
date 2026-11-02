import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import CurrentYear from "@/components/CurrentYear";
import Lanyard from "@/components/ui/Lanyard";
import OpenPlanLogo from "@/components/OpenPlanLogo";
import FooterWordmark from "@/components/FooterWordmark";
import FounderMat from "@/components/FounderMat";
import {
  about,
  capabilities,
  journey,
  profile,
  proofNote,
  proofPoints,
  storyChapters,
  storyIntro,
  thinking,
  ventures,
  work,
} from "@/data/portfolio";

const primaryBtn =
  "rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 dark:text-stone-950";
const secondaryBtn =
  "rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent";

export default function Home() {
  const [featured, ...pastVentures] = ventures;

  return (
    <>
      <Navbar />
      <main id="top" className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        {/* Hero */}
        <section className="grid min-h-svh items-center gap-6 pb-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* The card hangs from the top edge of this column, right under the navbar. On desktop the
              canvas is much wider (and a bit taller) than the column, centred on it, so the swinging card
              is never clipped; the text and stats sit above it (z-10) and stay clickable. */}
          <div className="relative h-[520px] self-stretch lg:col-start-2 lg:row-start-1 lg:h-auto lg:min-h-[640px]">
            <div className="absolute inset-0 lg:inset-auto lg:top-0 lg:-bottom-24 lg:left-1/2 lg:w-[1200px] lg:-translate-x-1/2">
              <Lanyard
                frontImage="/lanyard/card-front.jpg"
                backImage="/lanyard/card-back.svg"
                strapImage="/lanyard/strap.svg"
                finish="glossy"
                metal="silver"
                size={0.48}
                strapLength={0.23}
              />
            </div>
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs text-muted">
              Drag it · click to flip
            </p>
          </div>
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:pt-12">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Building
              <OpenPlanLogo className="h-3.5 w-3.5 text-foreground" />
              OpenPlan AI
            </p>
            <h1 className="text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
              {profile.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-accent">{profile.headline}</p>
            <p className="mt-6 text-2xl font-medium tracking-tight sm:text-3xl">{profile.tagline}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#openplan" className={primaryBtn}>
                Explore OpenPlan AI
              </a>
              <a href="#about" className={secondaryBtn}>
                Read my founder story
              </a>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-2 lg:row-start-2">
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {proofPoints.map((p) => (
                <div key={p.label} className="bg-background p-5">
                  <dt className="sr-only">{p.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight">{p.value}</dd>
                  <dd className="mt-1 text-sm text-muted">{p.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted">{proofNote}</p>
          </div>
        </section>

        {/* About */}
        <Section id="about" index="01" eyebrow="Founder story" title="I build technology by understanding how people actually work.">
          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-muted">{storyIntro}</p>
          <FounderMat chapters={storyChapters} />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <blockquote className="border-l-2 border-accent pl-5 text-xl leading-relaxed font-medium tracking-tight text-balance">
              {about.throughLine}
            </blockquote>
            <div className="space-y-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                {about.facts.map((f) => (
                  <div key={f.label} className="border-b border-border pb-3">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                    <dd className="mt-1 text-sm font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Curious about</h3>
                <ul className="flex flex-wrap gap-2">
                  {about.interests.map((i) => (
                    <li key={i} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Ventures */}
        <Section id="ventures" index="02" eyebrow="Ventures" title="Companies and products I've built.">
          {/* Featured: OpenPlan AI */}
          <article id={featured.id} className="scroll-mt-24 rounded-3xl border border-accent/40 bg-card p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs text-white dark:text-stone-950">
                {featured.status}
              </span>
              <span className="font-mono text-xs text-muted">{featured.period}</span>
            </div>
            <h3 className="mt-6 flex items-center gap-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <OpenPlanLogo className="h-10 w-10 sm:h-12 sm:w-12" />
              {featured.name}
            </h3>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{featured.summary}</p>
            {featured.href && (
              <a
                href={featured.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
              >
                Visit openplanai.com ↗
              </a>
            )}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {featured.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-xl border border-border p-4 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </article>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {pastVentures.map((v) => (
              <article key={v.id} id={v.id} className="flex scroll-mt-24 flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">{v.status}</span>
                  <span className="font-mono text-xs text-muted">{v.period}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{v.name}</h3>
                {v.role && <p className="mt-1 text-sm text-accent">{v.role}</p>}
                <p className="mt-4 leading-relaxed text-muted">{v.summary}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                  {v.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                {v.metrics && (
                  <div className="mt-8">
                    <dl className="grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
                      {v.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="sr-only">{m.label}</dt>
                          <dd className="text-2xl font-semibold tracking-tight">{m.value}</dd>
                          <dd className="text-xs text-muted">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                    {v.metricsNote && <p className="mt-3 text-xs text-muted">{v.metricsNote}</p>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>

        {/* Journey */}
        <Section id="journey" index="03" eyebrow="Journey" title="From IoT to AI to hardware software.">
          <ol className="relative space-y-10 border-l border-border pl-8">
            {journey.map((j) => (
              <li key={j.phase} className="relative">
                <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                <h3 className="text-lg font-semibold">{j.phase}</h3>
                <div className="mt-2 grid gap-2 text-muted md:grid-cols-2 md:gap-8">
                  <p>{j.what}</p>
                  <p>
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">Taught me · </span>
                    {j.learned}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Work + capabilities */}
        <Section id="work" index="04" eyebrow="Selected work" title="Products shipped with the Spotmies team, and before.">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {work.map((p) => (
              <article key={p.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent">
                <p className="font-mono text-xs text-muted">{p.context}</p>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-muted">
                  {p.tags.map((t) => (
                    <li key={t}>#{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h3 className="mt-20 mb-8 text-2xl font-semibold tracking-tight">Capabilities</h3>
          <div className="divide-y divide-border border-y border-border">
            {capabilities.map((c) => (
              <div key={c.domain} className="grid gap-3 py-5 md:grid-cols-[200px_1fr_1fr] md:gap-8">
                <h4 className="font-medium">{c.domain}</h4>
                <ul className="flex flex-wrap gap-2">
                  {c.tools.map((t) => (
                    <li key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted">{c.context}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Thinking */}
        <Section id="thinking" index="05" eyebrow="How I build" title={thinking.mindset}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {thinking.principles.map((p, i) => (
              <div key={p.title} className="bg-background p-6">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-muted">Lessons learned</h3>
              <ol className="space-y-4">
                {thinking.lessons.map((l, i) => (
                  <li key={i} className="flex gap-4 leading-relaxed text-muted">
                    <span className="font-mono text-sm text-accent">{i + 1}.</span>
                    {l}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="mb-6 font-mono text-xs uppercase tracking-wider text-muted">Vision</h3>
              <p className="text-2xl font-medium leading-snug tracking-tight text-balance">“{thinking.vision}”</p>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" index="06" eyebrow="Contact" title="Let's talk about investment, acceleration, or collaboration.">
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Whether you&apos;re an investor, a fellow founder, or a hardware team wrestling with product data — I&apos;d
            like to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} className={primaryBtn}>
              Get in touch
            </a>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={secondaryBtn}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <FooterWordmark text={profile.name} />
          <p className="text-center font-mono text-xs text-muted">Hover the letters · drag them · click to kick</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>
            © <CurrentYear /> {profile.name} · {profile.location}
          </p>
          <ul className="flex items-center gap-5">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#top" className="transition hover:text-accent">
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
