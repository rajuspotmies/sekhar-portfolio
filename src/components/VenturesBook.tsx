"use client";

import * as React from "react";
import { trackRecord } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/HoverIcons";

/**
 * Ventures as a book whose opening is tied to scroll position (cover styling
 * borrowed from the perspective-book component: spine sheen, layered shadows).
 * --p goes 0 → 1 as the book travels up the viewport: 0 = closed and centred,
 * 1 = open spread (Spotmies left, Reaidy right). Scrolling back closes it.
 * Below 1024px the pages stack and the cover flips up instead.
 * Only transform/opacity change; --p is written once per animation frame.
 * Without JS, or with reduced motion, the book is simply open (--p: 1).
 */

const S = trackRecord.spotmies;
const R = trackRecord.reaidy;

// Paper grain: tiny inline SVG noise, no network request.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.11 0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const CSS = `
.vb{--p:1;--s:0;perspective:2000px;perspective-origin:50% 0%}
.vb-book{position:relative;will-change:transform;transform-style:preserve-3d}
.vb-grid{transform-style:preserve-3d}
.vb-cover{position:absolute;inset:0;z-index:2;transform-origin:50% 0;backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:transform;
  transform:rotateX(calc(var(--p) * 180deg)) translateZ(1px);
  border-radius:16px;overflow:hidden;background:#1c1917;color:#fafaf9;
  box-shadow:0 2px 4px rgba(0,0,0,.06),0 12px 24px rgba(0,0,0,.12),inset 0 0 0 1px rgba(250,250,249,.1)}
/* the cover darkens as it lifts away from the light */
.vb-cover::after{content:"";position:absolute;inset:0;background:#000;opacity:calc(var(--p) * .7);pointer-events:none}
.vb-sheen{position:absolute;left:0;top:0;bottom:0;width:6%;min-width:22px;opacity:.4;
  background:linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,0) 12%,hsla(0,0%,100%,.25) 29.25%,hsla(0,0%,100%,0) 50.5%,hsla(0,0%,100%,0) 75.25%,hsla(0,0%,100%,.25) 91%,hsla(0,0%,100%,0)),linear-gradient(90deg,rgba(0,0,0,.03),rgba(0,0,0,.1) 12%,transparent 30%,rgba(0,0,0,.02) 50%,rgba(0,0,0,.2) 73.5%,rgba(0,0,0,.5) 75.25%,rgba(0,0,0,.15) 85.25%,transparent)}
.vb-cover[data-done]{visibility:hidden}

/* paper pages: the site's own stone palette (founder: the book must match the UI). Light ink in both themes. */
.vb{--pg-a:#e4e2df;--pg-b:#fbfbfa}
.dark .vb{--pg-a:#c7c3bf;--pg-b:#e7e5e4}
.vb-paper{--foreground:#1c1917;--muted:#57534e;--border:rgba(28,25,23,.12);--accent:#4f46e5;color:var(--foreground);
  --paper:#fcfcfb;background-color:var(--paper);
  background-image:radial-gradient(130% 100% at 50% 42%,transparent 60%,rgba(28,25,23,.04)),${GRAIN};
  background-size:100% 100%,160px;
  box-shadow:inset 0 0 0 1px rgba(28,25,23,.08)}
/* book details: running head at the top, page number at the bottom */
.vb-head,.vb-folio{position:absolute;font-family:var(--font-geist-mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);opacity:.75;pointer-events:none}
.vb-head{top:14px}
.vb-folio{bottom:12px;font-family:var(--font-instrument-serif);font-size:15px;letter-spacing:0;text-transform:none}
/* hardcover board: a thin dark edge around the page block */
.vb-board,.vb-board-l{position:absolute;inset:-9px;border-radius:22px;pointer-events:none;transform:translateZ(-3px);
  background:#1c1917;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 0 0 1px rgba(255,255,255,.04)}
.vb-board-l{display:none}
.dark .vb-paper{--paper:#e7e5e4}
.vb-paper::after,.vb-paper::before{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit}
.vb-left::after{background:linear-gradient(90deg,rgba(255,255,255,.25),transparent 12%,transparent 82%,rgba(28,25,23,.16))}
.vb-right::after{background:linear-gradient(90deg,rgba(28,25,23,.18),transparent 16%,transparent 90%,rgba(255,255,255,.2))}
.vb-spine{opacity:clamp(0, calc((var(--p) - .6) * 2.5), 1)}
/* the fold: a crease down the gutter, dark at the centre with a thin highlight either side */
.vb-crease{opacity:clamp(0, calc((var(--p) - .6) * 2.5), 1);
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.35) 38%,rgba(28,25,23,.35) 49%,rgba(28,25,23,.5) 50%,rgba(28,25,23,.35) 51%,rgba(255,255,255,.3) 62%,transparent)}
.vb-shadow{position:absolute;inset:0;border-radius:18px;box-shadow:0 24px 48px -22px rgba(0,0,0,.22),0 6px 14px -6px rgba(0,0,0,.1);pointer-events:none;transform:translateZ(-2px)}
.vb-shadow-l{display:none}

/* Phones and tablets (< 1024px): no book animation. The two pages are swipeable slides (scroll-snap), the
   next one peeking in at the edge; the tabs under them show and switch the page. */
@media (max-width:1023px){
  .vb-cover,.vb-board,.vb-board-l,.vb-shadow,.vb-shadow-l{display:none}
  .vb-book{transform:none}
  .vb-grid{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none;
    margin:0 -16px;padding:2px 16px 14px;scroll-padding:0 16px}
  .vb-grid::-webkit-scrollbar{display:none}
  .vb-grid>article{flex:0 0 88%;scroll-snap-align:start;scroll-snap-stop:always}
  .vb-left::after,.vb-right::after{background:linear-gradient(180deg,rgba(255,255,255,.2),transparent 20%)}
  .vb-left,.vb-right{box-shadow:inset 0 0 0 1px rgba(28,25,23,.08),0 1px 0 var(--pg-a),0 2px 0 var(--pg-b),0 3px 0 var(--pg-a),0 4px 0 var(--pg-b),0 10px 18px -10px rgba(0,0,0,.35)}
}
@media (min-width:640px) and (max-width:1023px){
  .vb-grid{margin:0 -24px;padding:2px 24px 14px;scroll-padding:0 24px}
  .vb-grid>article{flex-basis:78%}
}
@media (min-width:1024px){
  /* closed: book centred on the cover; it slides into place as it opens */
  .vb-book{transform:translateX(calc((1 - var(--p)) * -25%))}
  /* one rigid leaf hinged on the spine: front = cover, back = the Spotmies page */
  .vb-cover{left:50%;transform-origin:0 50%;border-radius:6px 16px 16px 6px;transform:rotateY(calc(var(--p) * -180deg)) translateZ(1px)}
  .vb-left{transform-origin:100% 50%;transform:rotateY(calc((1 - var(--p)) * 180deg)) translateZ(1px);
    backface-visibility:hidden;-webkit-backface-visibility:hidden;will-change:transform}
  .vb-left::before{z-index:1;background:#000;opacity:calc((1 - var(--p)) * .8)}
  /* the turning leaf casts a shadow across the right page, strongest when upright */
  .vb-right::before{z-index:1;background:linear-gradient(90deg,rgba(28,25,23,.38),rgba(28,25,23,.12) 45%,transparent 80%);opacity:var(--s)}
  /* page block edges: the book has thickness */
  /* page block: the stack of pages shows along the outer side and the bottom of each half */
  .vb-right{box-shadow:inset 0 0 0 1px rgba(28,25,23,.08),1px 1px 0 var(--pg-a),2px 2px 0 var(--pg-b),3px 3px 0 var(--pg-a),4px 4px 0 var(--pg-b),5px 5px 0 var(--pg-a),6px 6px 0 var(--pg-b),7px 7px 3px rgba(0,0,0,.12)}
  .vb-left{box-shadow:inset 0 0 0 1px rgba(28,25,23,.08),-1px 1px 0 var(--pg-a),-2px 2px 0 var(--pg-b),-3px 3px 0 var(--pg-a),-4px 4px 0 var(--pg-b),-5px 5px 0 var(--pg-a),-6px 6px 0 var(--pg-b),-7px 7px 3px rgba(0,0,0,.12)}
  /* board in two halves like the shadow: the left half appears once the Spotmies page has landed */
  .vb-board{left:50%;right:-12px;top:-10px;bottom:-14px;border-radius:6px 20px 20px 6px}
  .vb-board-l{display:block;left:-12px;right:50%;top:-10px;bottom:-14px;border-radius:20px 6px 6px 20px;opacity:clamp(0, calc((var(--p) - .92) * 12.5), 1)}
  /* Shadow in two halves. The right half (under the cover / Reaidy page) is always there; the left half only
     fades in once the Spotmies page has landed. One full-width shadow outlined an empty "white card" on the
     left while the page was still turning (visible in light mode). */
  .vb-shadow{left:50%;border-radius:6px 18px 18px 6px}
  .vb-shadow-l{display:block;position:absolute;top:0;bottom:0;left:0;right:50%;border-radius:18px 6px 6px 18px;box-shadow:0 24px 48px -22px rgba(0,0,0,.22),0 6px 14px -6px rgba(0,0,0,.1);
    pointer-events:none;transform:translateZ(-2px);opacity:clamp(0, calc((var(--p) - .92) * 12.5), 1)}
  /* open spread: each page curves down into the gutter (shade deepens over the last ~14%), with a soft
     highlight where the page bends, and lifts slightly at its outer edge */
  .vb-left::after{background:
    linear-gradient(90deg,rgba(255,255,255,.28),transparent 7%),
    linear-gradient(90deg,transparent 78%,rgba(255,255,255,.18) 84%,rgba(28,25,23,.08) 90%,rgba(28,25,23,.22) 96%,rgba(28,25,23,.38))}
  .vb-right::after{background:
    linear-gradient(270deg,rgba(255,255,255,.28),transparent 7%),
    linear-gradient(270deg,transparent 78%,rgba(255,255,255,.18) 84%,rgba(28,25,23,.08) 90%,rgba(28,25,23,.22) 96%,rgba(28,25,23,.38))}
}
`;

// Three text styles on the paper (user decision): serif = names, numbers, quote;
// sans = body (same size/grey as other sections); uppercase mono = small labels.
const label = "font-mono text-[11px] leading-relaxed tracking-[0.16em] text-muted uppercase";
const body = "text-[15px] leading-relaxed";

/* ---------- Hand-drawn graphs (pencil on graph paper) ----------
   Only figures with the same unit share a chart. Values are the real figures (lower bounds, "40+").
   Deterministic wobble (seeded), so server and client render the same SVG. */

type Bar = { label: string; value: string };
const num = (v: string) => {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return /k/i.test(v) ? n * 1000 : n;
};
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 - 0.5;
  };
}
// a pencil line: slightly bowed, ends overshoot a little
function pencil(r: () => number, x1: number, y1: number, x2: number, y2: number, j = 1.2) {
  const f = (v: number) => v.toFixed(1);
  const mx = (x1 + x2) / 2 + r() * j * 2;
  const my = (y1 + y2) / 2 + r() * j * 2;
  return `M${f(x1 + r() * j)},${f(y1 + r() * j)} Q${f(mx)},${f(my)} ${f(x2 + r() * j)},${f(y2 + r() * j)}`;
}

function SketchBars({ bars, seed, w = 300, h = 168 }: { bars: Bar[]; seed: number; w?: number; h?: number }) {
  const r = rng(seed);
  // drawn at roughly the size it is shown, so the pencil text stays readable
  const W = w;
  const H = h;
  const left = 20;
  const base = H - 44;
  const top = 30;
  const max = Math.max(...bars.map((b) => num(b.value)));
  const slot = (W - left - 14) / bars.length;
  const bw = Math.min(46, slot * 0.46);
  const id = "vbh" + seed;
  const f = (v: number) => v.toFixed(1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id={id} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#1c1917" strokeWidth="1" opacity=".42" />
        </pattern>
      </defs>
      {/* graph paper */}
      <g stroke="#1c1917" opacity=".07">
        {Array.from({ length: Math.floor(W / 12) + 1 }, (_, i) => (
          <line key={"v" + i} x1={i * 12} y1="0" x2={i * 12} y2={H} />
        ))}
        {Array.from({ length: Math.floor(H / 12) + 1 }, (_, i) => (
          <line key={"h" + i} x1="0" y1={i * 12} x2={W} y2={i * 12} />
        ))}
      </g>
      <g fill="none" stroke="#1c1917" strokeLinecap="round" strokeLinejoin="round">
        {/* axes */}
        <path d={pencil(r, left, top - 12, left, base + 2, 0.8)} strokeWidth="1.3" opacity=".8" />
        <path d={pencil(r, left - 4, base, W - 8, base, 0.8)} strokeWidth="1.3" opacity=".8" />
        <path d={`M${left - 4},${top - 6} L${left},${top - 13} L${left + 4},${top - 6}`} strokeWidth="1.2" opacity=".7" />
        {bars.map((b, i) => {
          const h = Math.max(6, ((base - top) * num(b.value)) / max);
          const x = left + slot * i + (slot - bw) / 2;
          const y = base - h;
          const quad = `M${f(x + r())},${f(base)} L${f(x + r())},${f(y + r())} L${f(x + bw + r())},${f(y + r())} L${f(x + bw + r())},${f(base)} Z`;
          return (
            <g key={b.label}>
              <path d={quad} fill={`url(#${id})`} stroke="none" />
              <path d={pencil(r, x, base, x, y)} strokeWidth="1.25" opacity=".85" />
              <path d={pencil(r, x - 2, y, x + bw + 2, y)} strokeWidth="1.25" opacity=".85" />
              <path d={pencil(r, x + bw, y, x + bw, base)} strokeWidth="1.25" opacity=".85" />
              <text x={x + bw / 2} y={y - 7} textAnchor="middle" fill="#1c1917" stroke="none" fontFamily="var(--font-instrument-serif)" fontSize="22">
                {b.value}
              </text>
              <text x={x + bw / 2} y={base + 15} textAnchor="middle" fill="#57534e" stroke="none" fontFamily="var(--font-geist-sans)" fontSize="11.5">
                {b.label.split(" ").length > 1 ? (
                  <>
                    <tspan x={x + bw / 2}>{b.label.split(" ").slice(0, -1).join(" ")}</tspan>
                    <tspan x={x + bw / 2} dy="13">{b.label.split(" ").slice(-1)}</tspan>
                  </>
                ) : (
                  b.label
                )}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** The figures as hand-drawn graphs; a plain list stays for screen readers. */
function Graphs({ m, kind }: { m: typeof S.metrics; kind: "spotmies" | "reaidy" }) {
  const it = m.items;
  const list = (
    <dl className="sr-only">
      {it.map((x) => (
        <div key={x.label}>
          <dt>{x.label}</dt>
          <dd>{x.value}</dd>
        </div>
      ))}
    </dl>
  );
  if (kind === "spotmies") {
    const counted = it.filter((x) => /^\d+\+$/.test(x.value));
    const other = it.filter((x) => !/^\d+\+$/.test(x.value));
    return (
      <div className="border-y border-border py-4">
        {list}
        <SketchBars seed={11} bars={counted} w={440} h={168} />
        {other.length > 0 && (
          <p className="mt-1 text-right font-serif text-[17px] text-muted italic">
            + {other.map((x) => `${x.value} ${x.label}`).join(" · ")}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 border-y border-border py-4">
      {list}
      <SketchBars seed={23} bars={it.slice(0, 2)} w={220} h={168} />
      <SketchBars seed={37} bars={it.slice(2, 4)} w={220} h={168} />
    </div>
  );
}

// Each page flows on its own (the old shared 7-row subgrid left big gaps wherever the facing page had a
// taller item, and rows emptied by hidden null fields stayed blank).
const pageCls = "vb-paper relative flex scroll-mt-24 flex-col gap-5 px-6 pt-10 pb-12 sm:px-10 sm:pt-11 sm:pb-12";

// Logo on a small dark plate: both logos have white lettering made for dark backgrounds.
function LogoPlate({ logo, h }: { logo: { src: string; width: number; height: number; alt: string }; h: number }) {
  return (
    <span className="vb-plate inline-flex self-start rounded-md bg-[#1c1917] px-3.5 py-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element -- small pre-optimised WebP, fixed size */}
      <img
        src={logo.src}
        width={Math.round((logo.width / logo.height) * h)}
        height={h}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className="block"
        style={{ height: h, width: "auto" }}
      />
    </span>
  );
}

// Logo on the dark cover (its white lettering is made for dark backgrounds).
function CoverLogo({ logo, h }: { logo: { src: string; width: number; height: number; alt: string }; h: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small pre-optimised WebP, fixed size
    <img
      src={logo.src}
      width={Math.round((logo.width / logo.height) * h)}
      height={h}
      alt=""
      loading="lazy"
      decoding="async"
      className="block"
      style={{ height: h, width: "auto" }}
    />
  );
}

function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className={label}>{title}</h4>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((c) => (
          <li key={c} className="rounded-full border border-border px-2.5 py-0.5 text-[12.5px] text-muted">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VenturesBook({ coverKicker }: { coverKicker: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const coverRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [slide, setSlide] = React.useState(0);

  // Phones/tablets: which page slide is showing, and jumping to one from the tabs.
  const onSlide = () => {
    const g = gridRef.current;
    if (!g || g.scrollWidth <= g.clientWidth) return;
    setSlide(g.scrollLeft > (g.scrollWidth - g.clientWidth) / 2 ? 1 : 0);
  };
  const goTo = (i: number) => {
    const g = gridRef.current;
    const page = g?.children[i] as HTMLElement | undefined;
    if (!g || !page) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    g.scrollTo({ left: page.offsetLeft - parseFloat(getComputedStyle(g).paddingLeft), behavior: reduce ? "auto" : "smooth" });
  };

  // Before paint: set --p from the current scroll position (also right after a refresh).
  React.useLayoutEffect(() => {
    const el = ref.current;
    const cover = coverRef.current;
    if (!el || !cover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cover.dataset.done = "";
      return;
    }
    let raf = 0;
    let cur = -1; // shown value
    let lastT = 0;
    const ease = (x: number) => x * x * (3 - 2 * x); // ease in/out
    // Opening is spread over ~80% of a screen of scrolling:
    // closed while the book's top is below 95% of the viewport, fully open at 15%.
    const target = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      return ease(Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.8))));
    };
    const paint = (v: number) => {
      el.style.setProperty("--p", v.toFixed(4));
      el.style.setProperty("--s", Math.sin(Math.PI * v).toFixed(4));
      if (v >= 0.999) cover.dataset.done = "";
      else delete cover.dataset.done;
    };
    // The page eases towards the scroll position, so it moves with weight instead of snapping.
    const tick = (t: number) => {
      const dt = lastT ? Math.min(64, t - lastT) : 16.7;
      lastT = t;
      const goal = target();
      cur += (goal - cur) * (1 - Math.exp(-dt / 140));
      if (Math.abs(goal - cur) < 0.0008) cur = goal;
      paint(cur);
      if (cur !== goal) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        lastT = 0;
      }
    };
    const update = () => {
      if (cur < 0) {
        cur = target(); // first paint / refresh: jump straight to the right state
        paint(cur);
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = update;
    // Only listen while the book is near the viewport.
    let listening = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll, { passive: true });
        } else if (!e.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
        onScroll();
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    io.observe(el);
    update();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="vb">
      <style>{CSS}</style>
      <div className="vb-book">
        <div aria-hidden="true" className="vb-shadow" />
        <div aria-hidden="true" className="vb-shadow-l" />
        <div aria-hidden="true" className="vb-board" />
        <div aria-hidden="true" className="vb-board-l" />
        <div ref={gridRef} onScroll={onSlide} className="vb-grid relative grid lg:grid-cols-2">
          {/* Left page: Spotmies */}
          <article id={S.id} className={"vb-left rounded-2xl lg:rounded-r-none " + pageCls}>
            <span aria-hidden="true" className="vb-head left-6 sm:left-10"><span className="text-accent">01</span> · {S.name}</span>
            <span aria-hidden="true" className="vb-folio left-6 sm:left-10">1</span>
            <LogoPlate logo={S.logo} h={28} />
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-[30px] leading-tight sm:text-[34px]">
                <NameLink name={S.name} href={S.href} />
              </h3>
              {S.meta && <p className={label}>{S.meta}</p>}
            </div>
            <p className={body}>{S.summary}</p>
            <Chips title={S.chipsLabel} items={S.chips} />
            <Graphs m={S.metrics} kind="spotmies" />
            <p className={label}>
              {S.metrics.scope}
              {S.metrics.asOf && <> · as of {S.metrics.asOf}</>}
            </p>
            {S.support && <p className={body + " text-muted"}>{S.support}</p>}
            <div>
              <h4 className={label}>Selected work</h4>
              <ul className="mt-2 divide-y divide-border border-y border-border">
                {S.work.map((w) => (
                  <li key={w.name} className={"flex flex-wrap items-baseline gap-x-3 py-2 " + body}>
                    <span className="font-medium">{w.name}</span>
                    <span className="text-muted">{w.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Right page: Reaidy */}
          <article id={R.id} className={"vb-right rounded-2xl lg:rounded-l-none " + pageCls}>
            <span aria-hidden="true" className="vb-head right-6 sm:right-10"><span className="text-accent">02</span> · {R.name}</span>
            <span aria-hidden="true" className="vb-folio right-6 sm:right-10">2</span>
            <LogoPlate logo={R.logo} h={19} />
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="font-serif text-[30px] leading-tight sm:text-[34px]">
                  <NameLink name={R.name} href={R.href} />
                </h3>
                <span className={"rounded-full border border-border px-3 py-1 " + label}>{R.status}</span>
              </div>
              {R.meta && <p className={label}>{R.meta}</p>}
            </div>
            <p className={body}>{R.summary}</p>
            <Chips title={R.chipsLabel} items={R.chips} />
            <Graphs m={R.metrics} kind="reaidy" />
            <p className={label}>
              {R.metrics.scope}
              {R.metrics.asOf && <> · as of {R.metrics.asOf}</>}
            </p>
            {R.whyStopped && <p className={body}>{R.whyStopped}</p>}
            {R.support && <p className={body + " text-muted"}>{R.support}</p>}
            <blockquote className="self-start border-l border-foreground/30 pl-5 lg:mt-auto font-serif text-xl leading-snug sm:text-2xl">
              &ldquo;{R.lesson}&rdquo;
            </blockquote>
          </article>

          {/* Spine shadow down the middle of the open spread */}
          <div
            aria-hidden="true"
            className="vb-spine pointer-events-none absolute inset-y-0 left-1/2 hidden w-16 -translate-x-1/2 bg-linear-to-r from-transparent via-black/15 to-transparent lg:block"
          />
          <div aria-hidden="true" className="vb-crease pointer-events-none absolute inset-y-0 left-1/2 hidden w-3 -translate-x-1/2 lg:block" />
        </div>

        {/* Phones/tablets: page tabs under the slides */}
        <div className="mt-3 flex items-center justify-center gap-2 lg:hidden">
          {[S, R].map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(i)}
              aria-current={slide === i ? "true" : undefined}
              aria-label={`Show page ${i + 1}: ${c.name}`}
              className={
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-mono text-[11px] tracking-[0.16em] uppercase transition " +
                (slide === i ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-foreground")
              }
            >
              <span className={slide === i ? "" : "text-accent"}>0{i + 1}</span>
              {c.name}
            </button>
          ))}
        </div>

        {/* Cover: its angle follows scroll */}
        <div ref={coverRef} className="vb-cover" aria-hidden="true">
          <div className="vb-sheen" />
          {/* Cover in the site's own UI language: mono accent label, serif title, the two logos, hairline footer */}
          <div className="relative flex h-full flex-col justify-between p-8 pl-12 sm:p-12 sm:pl-16">
            <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">{coverKicker}</span>
            <div>
              <p className="font-serif text-4xl leading-[1.05] sm:text-6xl">{trackRecord.title}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <CoverLogo logo={S.logo} h={34} />
                <CoverLogo logo={R.logo} h={22} />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] tracking-[0.2em] text-stone-400 uppercase">
              <span>01 · {S.name}</span>
              <span>02 · {R.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Company name as an external link with a visible ↗ (opens in a new tab).
function NameLink({ name, href }: { name: string; href: string | null }) {
  if (!href) return <>{name}</>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 transition hover:underline">
      {name}
      <ArrowUpRight size={18} className="ml-1 align-super text-muted" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
