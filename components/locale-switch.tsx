"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";

import { useLocale, useSetLocale } from "@/components/locale-context";

export function LocaleSwitch() {
  const router = useRouter();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const nextLocale = locale === "zh" ? "en" : "zh";

  const label = locale === "zh" ? "中文" : "EN";
  const ariaLabel = locale === "zh" ? "Switch to English" : "切换到中文";

  const handleClick = () => {
    setLocale(nextLocale);
    router.refresh();
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
