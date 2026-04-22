"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { useLocale } from "@/components/locale-context";
import { getCopy } from "@/data/copy";

const STORAGE_KEY = "s-news-theme";
type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
    return;
  }
  root.setAttribute("data-theme", theme);
}

function resolveEffectiveTheme(theme: Theme): "light" | "dark" {
  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const THEME_ORDER: Theme[] = ["light", "dark", "system"];

function subscribeToHydration() {
  return () => {};
}

function ThemeButton({
  theme,
  setTheme,
  mounted,
  themeLabels,
  ariaLabelFn,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mounted: boolean;
  themeLabels: Record<Theme, string>;
  ariaLabelFn: (label: string) => string;
}) {
  const cycleTheme = useCallback(() => {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }, [theme, setTheme]);

  const effective = mounted ? resolveEffectiveTheme(theme) : "light";
  const Icon = effective === "dark" ? Moon : effective === "light" ? Sun : Monitor;

  if (!mounted) {
    return <div className="np-utility-btn" style={{ opacity: 0 }} aria-hidden />;
  }

  const label = theme === "light" ? "LIGHT" : theme === "dark" ? "DARK" : "AUTO";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="np-utility-btn"
      aria-label={ariaLabelFn(themeLabels[theme])}
      title={themeLabels[theme]}
    >
      <Icon size={15} strokeWidth={1.75} aria-hidden />
      <span className="np-mono" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
        {label}
      </span>
    </button>
  );
}

export function ThemeSwitch() {
  const locale = useLocale();
  const copy = getCopy(locale);
  const themeLabels: Record<Theme, string> = {
    light: copy.ui.theme.light,
    dark: copy.ui.theme.dark,
    system: copy.ui.theme.system,
  };
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [mounted, theme]);

  return (
    <ThemeButton
      theme={theme}
      setTheme={setTheme}
      mounted={mounted}
      themeLabels={themeLabels}
      ariaLabelFn={copy.ui.theme.ariaLabel}
    />
  );
}
