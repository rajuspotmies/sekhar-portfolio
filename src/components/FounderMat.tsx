"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import OpenPlanLogo from "@/components/OpenPlanLogo";
import { cn } from "@/lib/utils";
import type { StoryChapter } from "@/data/portfolio";

// Where each badge starts on the mat (desktop only), as % of the badge area, plus its size and tilt.
const LAYOUT: Record<StoryChapter["badge"], { x: number; y: number; w: number; h: number; rot: number }> = {
  round: { x: 3, y: 5, w: 150, h: 150, rot: -8 },
  id: { x: 37, y: 1, w: 170, h: 232, rot: 6 },
  hex: { x: 2, y: 50, w: 164, h: 184, rot: 9 },
  pill: { x: 31, y: 60, w: 224, h: 128, rot: -5 },
  now: { x: 70, y: 28, w: 180, h: 244, rot: -4 },
};

const DRAG_THRESHOLD = 5;

export default function FounderMat({ chapters }: { chapters: StoryChapter[] }) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(() => chapters.map((c) => ({ x: LAYOUT[c.badge].x, y: LAYOUT[c.badge].y })));
  const [order, setOrder] = useState(() => chapters.map((_, i) => i));
  const [dragging, setDragging] = useState<number | null>(null);
  const [area, setArea] = useState({ w: 0, h: 0 });
  const [canDrag, setCanDrag] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);

  // Track the badge area's size (for the cut line) and whether we're on a desktop layout (for dragging).
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => {
      setArea({ w: el.clientWidth, h: el.clientHeight });
      setCanDrag(mq.matches);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    mq.addEventListener("change", update);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  const bringToFront = (i: number) => setOrder((o) => [...o.filter((n) => n !== i), i]);

  const select = (i: number) => {
    setActive(i);
    bringToFront(i);
  };

  const onPointerDown = (i: number) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!canDrag || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: pos[i].x, oy: pos[i].y, moved: false };
    bringToFront(i);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || !area.w) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(d.i);
    }
    const { w, h } = LAYOUT[chapters[d.i].badge];
    const maxX = 100 - (w / area.w) * 100;
    const maxY = 100 - (h / area.h) * 100;
    const x = Math.min(Math.max(d.ox + (dx / area.w) * 100, 0), maxX);
    const y = Math.min(Math.max(d.oy + (dy / area.h) * 100, 0), maxY);
    setPos((p) => p.map((v, n) => (n === d.i ? { x, y } : v)));
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(null);
    if (d && !d.moved) select(d.i);
  };

  // A dashed "cut line" joining the badges in story order (desktop only).
  const centers = chapters.map((c, i) => {
    const { w, h } = LAYOUT[c.badge];
    return { x: (pos[i].x / 100) * area.w + w / 2, y: (pos[i].y / 100) * area.h + h / 2 };
  });
  const cutPath = centers.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = centers[i - 1];
    const mx = (prev.x + p.x) / 2;
    return `${acc} C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const chapter = chapters[active];

  return (
    <div className="cutting-mat relative overflow-hidden rounded-[28px] p-4 pt-12 pl-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8 sm:pt-14 sm:pb-14 sm:pl-14">
      <MatMarkings />

      {/* Label-maker tape */}
      <div className="relative z-10 mb-6 flex flex-wrap items-center gap-3">
        <span className="dymo -rotate-1">Founder story · 5 chapters</span>
        <span className="hidden font-mono text-[11px] uppercase tracking-widest text-white/60 lg:inline">
          Drag the badges · click one to read
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 lg:hidden">Swipe · tap a badge to read</span>
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-6">
        {/* Badge area */}
        <div
          ref={areaRef}
          className="relative -mx-4 flex snap-x snap-mandatory items-center gap-8 overflow-x-auto px-6 pt-4 pb-6 [scrollbar-width:none] sm:-mx-8 sm:px-10 lg:mx-0 lg:block lg:h-[560px] lg:overflow-visible lg:p-0"
        >
          {canDrag && area.w > 0 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              <path d={cutPath} className="cut-line" fill="none" />
            </svg>
          )}

          {chapters.map((c, i) => {
            const l = LAYOUT[c.badge];
            const isActive = i === active;
            const isDragging = i === dragging;
            return (
              <button
                key={c.id}
                type="button"
                onPointerDown={onPointerDown(i)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onClick={(e) => {
                  // Pointer handlers already select on desktop; keyboard and touch land here.
                  if (!canDrag || e.detail === 0) select(i);
                }}
                aria-pressed={isActive}
                aria-label={`Chapter ${i + 1}: ${c.role} — ${c.label}`}
                style={
                  {
                    "--x": `${pos[i].x}%`,
                    "--y": `${pos[i].y}%`,
                    "--rot": `${isDragging ? 0 : l.rot}deg`,
                    "--lift": isDragging ? 1.08 : isActive ? 1.04 : undefined,
                    zIndex: order.indexOf(i) + 1,
                    touchAction: canDrag ? "none" : undefined,
                  } as CSSProperties
                }
                className={cn(
                  "badge group relative shrink-0 snap-center select-none outline-none lg:absolute lg:top-[var(--y)] lg:left-[var(--x)]",
                  canDrag && (isDragging ? "cursor-grabbing" : "cursor-grab"),
                  isActive && "is-active",
                  isDragging && "is-dragging",
                )}
              >
                <span className="badge-num">{String(i + 1).padStart(2, "0")}</span>
                <Badge chapter={c} />
              </button>
            );
          })}
        </div>

        {/* Note card */}
        <article className="note-card relative self-start lg:mt-6 lg:rotate-[1.5deg]">
          <span className="tape" aria-hidden />
          <div key={chapter.id} className="note-enter">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-stone-500">
              <span>
                Chapter {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
              </span>
              <span>{chapter.period}</span>
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-indigo-600">{chapter.role}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance text-stone-900 sm:text-3xl">
              {chapter.title}
            </h3>
            <p className="mt-4 leading-relaxed text-stone-600">{chapter.body}</p>

            <div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-amber-50/60 p-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500">What it taught me</p>
              <p className="mt-1 font-medium text-stone-800">{chapter.learned}</p>
            </div>

            {chapter.stats && (
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {chapter.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight text-stone-900">{s.value}</dd>
                    <dd className="text-xs text-stone-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
            )}
            {chapter.note && <p className="mt-2 text-[11px] text-stone-400">{chapter.note}</p>}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
            <button
              type="button"
              onClick={() => select((active - 1 + chapters.length) % chapters.length)}
              className="rounded-full border border-stone-300 px-4 py-1.5 font-mono text-xs text-stone-600 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              ← Prev
            </button>
            <div className="flex gap-1.5" aria-hidden>
              {chapters.map((c, i) => (
                <span
                  key={c.id}
                  className={cn("h-1.5 rounded-full transition-all", i === active ? "w-5 bg-indigo-500" : "w-1.5 bg-stone-300")}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => select((active + 1) % chapters.length)}
              className="rounded-full border border-stone-300 px-4 py-1.5 font-mono text-xs text-stone-600 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Next →
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

/* ---------- Badges: each chapter is a different die-cut sticker ---------- */

function Badge({ chapter }: { chapter: StoryChapter }) {
  switch (chapter.badge) {
    case "round":
      return (
        <span className="sticker flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full bg-amber-400 text-stone-900">
          <ChipIcon className="h-10 w-10" />
          <span className="mt-2 text-lg font-bold tracking-tight">{chapter.label}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Est. early days</span>
        </span>
      );
    case "id":
      return (
        <span className="sticker flex h-[232px] w-[170px] flex-col overflow-hidden rounded-2xl bg-white text-left text-stone-900">
          <span className="relative flex h-16 items-start justify-center bg-indigo-600 pt-3">
            <span className="h-2 w-10 rounded-full bg-indigo-900/50" />
          </span>
          <span className="flex flex-1 flex-col p-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500">Co-founder</span>
            <span className="mt-1 text-xl leading-tight font-bold tracking-tight">{chapter.label}</span>
            <span className="mt-auto flex items-end justify-between">
              <span className="font-mono text-[10px] text-stone-500">EST. 2019</span>
              <Barcode />
            </span>
          </span>
        </span>
      );
    case "hex":
      return (
        <span className="sticker-svg relative block h-[184px] w-[164px]">
          <svg viewBox="0 0 164 184" className="absolute inset-0 h-full w-full" aria-hidden>
            <polygon
              points="82,6 156,48 156,136 82,178 8,136 8,48"
              className="fill-stone-900 stroke-white"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <polygon points="82,40 118,61 118,103 82,124 46,103 46,61" fill="none" stroke="#a5b4fc" strokeWidth="3" />
            <polyline points="46,61 82,82 118,61 M82,82 82,124" fill="none" stroke="#a5b4fc" strokeWidth="3" />
          </svg>
          <span className="absolute inset-x-0 bottom-9 text-center">
            <span className="block text-lg font-bold tracking-tight text-white">{chapter.label}</span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-indigo-300">Explorer</span>
          </span>
        </span>
      );
    case "pill":
      return (
        <span className="sticker flex h-[128px] w-[224px] flex-col justify-between rounded-[28px] bg-[#ff6b4a] p-4 text-left text-white">
          <span className="flex items-center justify-between">
            <span className="text-xl font-bold tracking-tight">{chapter.label}</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">AI</span>
          </span>
          <Waveform />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">Product builder</span>
        </span>
      );
    case "now":
      return (
        <span className="sticker flex h-[244px] w-[180px] flex-col rounded-2xl bg-stone-950 p-4 text-left text-white">
          <span className="mx-auto h-2 w-10 rounded-full bg-stone-700" />
          <span className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Now building
          </span>
          <OpenPlanLogo className="mt-auto h-12 w-12 text-white" />
          <span className="mt-3 text-xl font-bold tracking-tight">{chapter.label}</span>
          <span className="font-mono text-[10px] text-stone-400">2026 —</span>
        </span>
      );
  }
}

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <rect x="10" y="10" width="20" height="20" rx="3" />
      <rect x="16" y="16" width="8" height="8" rx="1" fill="currentColor" />
      {[15, 20, 25].map((p) => (
        <g key={p}>
          <line x1={p} y1="4" x2={p} y2="10" />
          <line x1={p} y1="30" x2={p} y2="36" />
          <line x1="4" y1={p} x2="10" y2={p} />
          <line x1="30" y1={p} x2="36" y2={p} />
        </g>
      ))}
    </svg>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2];
  return (
    <svg viewBox="0 0 40 22" className="h-5 w-10" aria-hidden>
      {bars.reduce<{ x: number; els: React.ReactNode[] }>(
        (acc, w, i) => {
          if (i % 2 === 0) acc.els.push(<rect key={i} x={acc.x} y="0" width={w} height="22" className="fill-stone-900" />);
          acc.x += w + 1;
          return acc;
        },
        { x: 0, els: [] },
      ).els}
    </svg>
  );
}

function Waveform() {
  const heights = [6, 14, 22, 12, 28, 18, 8, 24, 30, 16, 10, 20, 26, 12, 6, 18, 22, 10];
  return (
    <svg viewBox="0 0 190 32" className="h-7 w-full" aria-hidden>
      {heights.map((h, i) => (
        <rect key={i} x={i * 10.5} y={16 - h / 2} width="5" height={h} rx="2.5" className="wave-bar fill-white" style={{ animationDelay: `${i * 60}ms` }} />
      ))}
    </svg>
  );
}

/* ---------- Mat printing: rulers, angle guides, circle template ---------- */

function MatMarkings() {
  const nums = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* top ruler */}
      <div className="mat-ruler-x absolute top-0 right-0 left-0 h-8 sm:left-14" />
      <div className="absolute top-1 left-4 flex sm:left-14">
        {nums.map((n) => (
          <span key={n} className="w-[120px] shrink-0 pl-1 font-mono text-[9px] text-white/55">
            {n}
          </span>
        ))}
      </div>
      {/* left ruler */}
      <div className="mat-ruler-y absolute top-12 bottom-0 left-0 hidden w-10 sm:top-14 sm:block" />
      <div className="absolute top-12 left-1.5 hidden flex-col sm:top-14 sm:flex">
        {nums.slice(0, 12).map((n) => (
          <span key={n} className="h-[120px] shrink-0 pt-1 font-mono text-[9px] text-white/55">
            {n}
          </span>
        ))}
      </div>
      {/* angle guides + circle template from the bottom-right corner */}
      <svg className="absolute right-0 bottom-0 h-[420px] w-[420px] opacity-40" viewBox="0 0 420 420">
        <g fill="none" stroke="white" strokeWidth="1">
          <line x1="420" y1="420" x2="0" y2="0" strokeDasharray="6 6" />
          <line x1="420" y1="420" x2="0" y2="177" strokeDasharray="2 6" />
          <line x1="420" y1="420" x2="177" y2="0" strokeDasharray="2 6" />
          <circle cx="420" cy="420" r="140" />
          <circle cx="420" cy="420" r="260" strokeDasharray="1 5" />
        </g>
        <text x="300" y="296" fill="white" className="font-mono text-[10px]">45°</text>
        <text x="232" y="350" fill="white" className="font-mono text-[10px]">30°</text>
        <text x="345" y="235" fill="white" className="font-mono text-[10px]">60°</text>
      </svg>
      <p className="absolute bottom-5 left-14 hidden font-mono sm:block text-[10px] tracking-[0.3em] text-white/45 uppercase">
        Self-healing · Visakhapatnam
      </p>
    </div>
  );
}
