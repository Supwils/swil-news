"use client";

import { useSyncExternalStore } from "react";

// Render an invisible placeholder of comparable width during SSR / pre-hydration.
// This avoids both (a) the "wrong glyph briefly visible" flicker on non-Apple
// clients that would happen if we picked a default like "⌘K", and (b) the
// layout shift that would happen if we returned "". The non-breaking space pair
// is wide enough that the kbd box doesn't visibly resize when the real label
// snaps in on hydration.
const SERVER_LABEL = "  ";

function detectClientLabel(): string {
  if (typeof navigator === "undefined") return SERVER_LABEL;
  const ua = navigator.userAgent || "";
  const isApple = /Mac|iPhone|iPad|iPod/i.test(ua);
  return isApple ? "⌘K" : "Ctrl K";
}

// Platform never changes at runtime, so subscribe is a no-op.
function subscribe(): () => void {
  return () => {};
}

/**
 * Returns the platform-appropriate label for the search shortcut.
 *
 * SSR snapshot is a width-only placeholder so non-Apple clients don't briefly
 * see the wrong glyph. After hydration the real platform label is produced via
 * `useSyncExternalStore` without an effect-driven cascade render.
 */
export function useShortcutLabel(): string {
  return useSyncExternalStore(subscribe, detectClientLabel, () => SERVER_LABEL);
}
