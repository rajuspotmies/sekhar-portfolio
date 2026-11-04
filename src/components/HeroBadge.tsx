"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { LanyardProps } from "@/components/ui/Lanyard";

// The lanyard's own textures. Warmed into the HTTP cache before the 3D badge mounts, so its first frame
// already has them (no blank card while they download).
const TEXTURES = ["/lanyard/card-front.jpg", "/lanyard/card-back.svg", "/lanyard/strap.svg"];

// The 3D badge, configured exactly as before the redesign (including its swing-in intro).
const LANYARD_PROPS: LanyardProps = {
  frontImage: "/lanyard/card-front.jpg",
  backImage: "/lanyard/card-back.svg",
  strapImage: "/lanyard/strap.svg",
  finish: "glossy",
  metal: "silver",
  size: 0.48,
  // Card top at ≈ 0.30·C (C = canvas height). globals.css (.hero) depends on these two numbers.
  strapLength: 0.55,
  intro: true,
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

function warm(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // same mode Lanyard uses, so the cached response is reused
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

// Load timing only (step P). The 3D startup costs ~1.6s of main thread on a mid phone, so it starts on the
// visitor's first interaction, or once the page has been loaded and quiet for QUIET_MS, whichever is first.
// Either way it then waits for an idle moment. The static still covers the box until then.
const QUIET_MS = 4000;
const INTERACTIONS = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;

function whenReady(run: () => void) {
  const idle = typeof window.requestIdleCallback === "function";
  let done = false;
  let quiet = 0;
  let handle = 0;
  const go = () => {
    if (done) return;
    done = true;
    cleanup();
    handle = idle ? window.requestIdleCallback(run, { timeout: 1500 }) : window.setTimeout(run, 1500);
  };
  const startQuiet = () => (quiet = window.setTimeout(go, QUIET_MS));
  const cleanup = () => {
    INTERACTIONS.forEach((e) => window.removeEventListener(e, go));
    window.removeEventListener("load", startQuiet);
    window.clearTimeout(quiet);
  };
  INTERACTIONS.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
  if (document.readyState === "complete") startQuiet();
  else window.addEventListener("load", startQuiet, { once: true });
  return () => {
    done = true;
    cleanup();
    if (idle) window.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}

/**
 * The hero's ID badge. Wrapper and canvas boxes are the same as before the redesign (the card's size is
 * derived from the canvas height, so these boxes must not change). The box is reserved on first paint;
 * the live 3D badge loads after the page and swings in with its original intro. With reduced motion, or
 * without WebGL, a static still of the resting badge fills the box instead.
 */
export default function HeroBadge({ alt, hint, className = "" }: { alt: string; hint: string; className?: string }) {
  const [Live, setLive] = useState<ComponentType<LanyardProps> | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !supportsWebGL()) {
      setStill(true); // eslint-disable-line react-hooks/set-state-in-effect -- client-only capability check
      return;
    }
    let cancelled = false;
    const cancelIdle = whenReady(async () => {
      const [mod] = await Promise.all([import("@/components/ui/Lanyard"), ...TEXTURES.map(warm)]);
      if (!cancelled) setLive(() => mod.default);
    });
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  // Give the canvas a few frames to draw its textured first frame, then cross-fade from the still.
  useEffect(() => {
    if (!Live) return;
    const t = window.setTimeout(() => setRevealed(true), 250);
    return () => window.clearTimeout(t);
  }, [Live]);

  return (
    <div className={`hero-badge ${className}`}>
      {/* The canvas box (position and size set by .hero-badge-stage in globals.css). */}
      <div className="hero-badge-stage">
        {/* Still (reduced motion / no WebGL only): a capture of the live badge at rest. The 3D card scales
            with the canvas height and is centred horizontally, so a full-height, centred image lines up. */}
        {/* Only for reduced motion / no WebGL. Not shown while the live badge waits: the brief requires the
            LCP element to be the hero text, and a still here becomes the LCP (measured: 1.1s → 3.3s). */}
        {still && (
          // eslint-disable-next-line @next/next/no-img-element -- pre-optimised WebP with its own srcset
          <img
            src="/lanyard/badge-still-1x.webp"
            srcSet="/lanyard/badge-still-1x.webp 1x, /lanyard/badge-still.webp 2x"
            width={447}
            height={745}
            alt={alt}
            decoding="async"
            className="hero-badge-still pointer-events-none absolute left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none"
            draggable={false}
          />
        )}
        {Live && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <Live {...LANYARD_PROPS} />
          </div>
        )}
        {Live && <p className="hero-badge-hint pointer-events-none font-mono text-xs text-muted">{hint}</p>}
      </div>
      {/* Screen readers get the badge description whether the still or the live badge is showing. */}
      {!still && <span className="sr-only">{alt}</span>}
    </div>
  );
}
