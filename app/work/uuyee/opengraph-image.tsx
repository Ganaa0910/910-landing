import { CASE_CARD, caseCard, caseCardAlt } from "@/lib/og/case-card";

export const alt = caseCardAlt("uuyee");
export const size = CASE_CARD.size;
export const contentType = CASE_CARD.contentType;

export default function Image() {
  return caseCard("uuyee");
}
