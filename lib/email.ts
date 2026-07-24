import { Resend } from "resend";

/**
 * Verified Resend sender. The domain 910.studio is DKIM/SPF verified —
 * never fall back to onboarding@resend.dev, which only delivers to the
 * Resend account owner and silently drops mail to everyone else.
 */
export const EMAIL_FROM = process.env.EMAIL_FROM ?? "910studio <hello@910.studio>";

/**
 * 910.studio has no inbound MX, so replies to EMAIL_FROM go nowhere.
 * Every outbound message points Reply-To at a mailbox that actually receives.
 */
export const REPLY_TO = process.env.CONTACT_EMAIL;

/** Internal notification recipient. */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

/** Escapes untrusted form input before interpolating it into email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let client: Resend | null = null;

/** Returns null when RESEND_API_KEY is unset (local dev) instead of throwing. */
export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

interface SendResult {
  sent: boolean;
  error?: string;
}

type SendPayload = Parameters<Resend["emails"]["send"]>[0];

/**
 * Sends via Resend and normalises the three failure modes the SDK has:
 * missing key, returned `error` object, and thrown network error.
 * Never throws — callers decide whether a failed email should fail the request.
 */
export async function sendEmail(payload: SendPayload, label: string): Promise<SendResult> {
  const resend = getResend();
  if (!resend) {
    console.warn(`[email:${label}] skipped — RESEND_API_KEY not set`);
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { error } = await resend.emails.send(payload);
    if (error) {
      console.error(`[email:${label}] Resend error:`, error);
      return { sent: false, error: error.message };
    }
    return { sent: true };
  } catch (err) {
    console.error(`[email:${label}] send threw:`, err);
    return { sent: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
