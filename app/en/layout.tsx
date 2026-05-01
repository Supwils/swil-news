import type { ReactNode } from "react";

import { LocaleProvider } from "@/components/locale-context";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <LocaleProvider initialLocale="en">{children}</LocaleProvider>;
}
