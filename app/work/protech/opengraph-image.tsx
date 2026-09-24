import { CASE_CARD, caseCard, caseCardAlt } from "@/lib/og/case-card";

export const alt = caseCardAlt("protech");
export const size = CASE_CARD.size;
export const contentType = CASE_CARD.contentType;

export default function Image() {
  return caseCard("protech");
}
