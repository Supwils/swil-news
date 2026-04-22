import type { ReactNode } from "react";

import { NewspaperFooter } from "@/components/newspaper/footer";
import { NewspaperMasthead } from "@/components/newspaper/masthead";

type ShellProps = {
  /** Which masthead nav item to mark active. */
  active?: "today" | "archive" | "topics" | "about" | null;
  /** Optional date for the masthead stamp (defaults to today's UTC date). */
  date?: string;
  /** Archive month for the masthead's Archive link. */
  archiveMonth?: string;
  /** Page content — rendered inside the centered main container. */
  children: ReactNode;
};

export function NewspaperShell({ active = null, date, archiveMonth, children }: ShellProps) {
  return (
    <div className="np-root">
      <NewspaperMasthead active={active} date={date} archiveMonth={archiveMonth} />
      <main className="mx-auto w-full" style={{ maxWidth: 1280, padding: 40 }}>
        {children}
        <NewspaperFooter />
      </main>
    </div>
  );
}
