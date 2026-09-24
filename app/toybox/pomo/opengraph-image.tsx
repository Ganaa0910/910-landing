import { CASE_CARD, caseCard, caseCardAlt } from "@/lib/og/case-card";

/* pomo declares its openGraph in layout.tsx rather than page.tsx, which is
   why it kept slipping past a grep of the pages — and why it was the one
   route still shipping no og:image after the rest were fixed. */
export const alt = caseCardAlt("pomo");
export const size = CASE_CARD.size;
export const contentType = CASE_CARD.contentType;

export default function Image() {
  return caseCard("pomo");
}
