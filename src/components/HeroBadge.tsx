"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { LanyardProps } from "@/components/ui/Lanyard";

// The lanyard's own textures. Warmed into the HTTP cache before the 3D badge mounts, so its first frame
// already has them (no blank card while they download).
const TEXTURES = ["/lanyard/card-front.jpg", "/lanyard/card-back.svg", "/lanyard/strap.svg"];

// The 3D badge, configured exactly as before the redesign. The only difference: `intro` is off, because
// the static still has already shown the card hanging, so it must not swing in from the side.
const LANYARD_PROPS: LanyardProps = {
  frontImage: "/lanyard/card-front.jpg",
  backImage: "/lanyard/card-back.svg",
  strapImage: "/lanyard/strap.svg",
  finish: "glossy",
  metal: "silver",
  size: 0.48,
  strapLength: 0.23,
  intro: false,
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

// After the page has loaded and the main thread is idle, so the 3D code never competes with first paint.
function whenIdle(run: () => void) {
  const idle = typeof window.requestIdleCallback === "function";
  let handle = 0;
  const schedule = () => {
    handle = idle ? window.requestIdleCallback(run, { timeout: 2500 }) : window.setTimeout(run, 600);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idle) window.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}

/**
 * The hero's ID badge. Wrapper and canvas boxes are the same as before the redesign (the card's size is
 * derived from the canvas height, so these boxes must not change). A static still of the resting badge
 * fills the box on first paint; the live 3D badge replaces it once loaded. With reduced motion, or
 * without WebGL, the still stays.
 */
export default function HeroBadge({ alt, hint, className = "" }: { alt: string; hint: string; className?: string }) {
  const [Live, setLive] = useState<ComponentType<LanyardProps> | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !supportsWebGL()) return;
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
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
      <div className="absolute inset-0 lg:inset-auto lg:top-0 lg:-bottom-24 lg:left-1/2 lg:w-[1200px] lg:-translate-x-1/2">
        {/* Still: a capture of the live badge at rest. The 3D card scales with the canvas height and is
            centred horizontally, so a full-height, centred image lines up with it at every size. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised WebP with its own srcset */}
        <img
          src="/lanyard/badge-still-1x.webp"
          srcSet="/lanyard/badge-still-1x.webp 1x, /lanyard/badge-still.webp 2x"
          width={447}
          height={745}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className={`pointer-events-none absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none transition-opacity duration-300 ${
            revealed ? "opacity-0" : ""
          }`}
          draggable={false}
        />
        {Live && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${revealed ? "opacity-100" : "opacity-0"}`}>
            <Live {...LANYARD_PROPS} />
          </div>
        )}
      </div>
      {Live && <p className="hero-badge-hint pointer-events-none font-mono text-xs text-muted">{hint}</p>}
    </div>
  );
}
