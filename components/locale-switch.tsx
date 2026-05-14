"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";

import { useLocale, useSetLocale } from "@/components/locale-context";
import { switchPathLocale } from "@/lib/locale-routing";

export function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const nextLocale = locale === "zh" ? "en" : "zh";

  const label = locale === "zh" ? "EN" : "中文";
  const ariaLabel = locale === "zh" ? "Switch to English" : "切换到中文";

  const handleClick = () => {
    setLocale(nextLocale);
    const nextPath = switchPathLocale(pathname, nextLocale);
    const query = typeof window === "undefined" ? "" : window.location.search;
    router.push(query ? `${nextPath}${query}` : nextPath);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="np-utility-btn"
    >
      <Languages size={15} strokeWidth={1.75} aria-hidden />
      <span className="np-mono" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
        {label}
      </span>
    </button>
  );
}
