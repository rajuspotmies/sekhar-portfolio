"use client";

import { useSyncExternalStore } from "react";

// Tracks the `dark` class that ThemeToggle puts on <html>.
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
const isDark = () => document.documentElement.classList.contains("dark");

export function useIsDark() {
  return useSyncExternalStore(subscribe, isDark, () => false);
}
