import { NextResponse } from "next/server";
import { CONTACT_EMAIL, EMAIL_FROM, REPLY_TO, escapeHtml, sendEmail } from "@/lib/email";

interface InquiryRequest {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    if (!CONTACT_EMAIL) {
      console.error("Inquiry API: CONTACT_EMAIL not configured");
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable" },
        { status: 503 }
      );
    }

    const body: InquiryRequest = await request.json();
    const { name, email, projectType, budget, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ulaanbaatar",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Form input is untrusted — escape before interpolating into the template
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType || "Not specified");
    const safeBudget = escapeHtml(budget || "Not specified");
    const safeMessage = escapeHtml(message);

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border: 2px solid #14b8a6;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #14b8a620;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #14b8a6; letter-spacing: 2px;">
                910STUDIO
              </h1>
              <p style="margin: 8px 0 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                New Project Inquiry
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Client Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 16px; background-color: #14b8a610; border-left: 3px solid #14b8a6;">
                    <p style="margin: 0 0 4px; font-size: 12px; color: #14b8a6; text-transform: uppercase; letter-spacing: 1px;">
                      From
                    </p>
                    <p style="margin: 0; font-size: 18px; color: #fff; font-weight: 600;">
                      ${safeName}
                    </p>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #888;">
                      ${safeEmail}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Project Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                      Project Type
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">
                      ${safeProjectType}
                    </p>
                  </td>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222; border-left: none;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                      Budget Range
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">
                      ${safeBudget}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-bottom: 32px;">
                <p style="margin: 0 0 12px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                  Message
                </p>
                <div style="padding: 20px; background-color: #111; border: 1px solid #222; border-radius: 4px;">
                  <p style="margin: 0; font-size: 14px; color: #ccc; line-height: 1.6; white-space: pre-wrap;">
${safeMessage}
                  </p>
                </div>
              </div>

              <!-- Timestamp -->
              <p style="margin: 0; font-size: 12px; color: #444;">
                Received: ${timestamp} (UB Time)
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #14b8a620; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #444;">
                Reply directly to this email to respond to ${safeName}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // Plain-text alternative — HTML-only mail scores worse with spam filters
    const emailText = [
      "910STUDIO — New Project Inquiry",
      "",
      `From: ${name} <${email}>`,
      `Project Type: ${projectType || "Not specified"}`,
      `Budget Range: ${budget || "Not specified"}`,
      "",
      "Message:",
      message,
      "",
      `Received: ${timestamp} (UB Time)`,
    ].join("\n");

    // Client-facing auto-reply. Echoes their submission back so they know
    // exactly what landed, and sets the response-time expectation.
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border: 2px solid #14b8a6;">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #14b8a620;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #14b8a6; letter-spacing: 2px;">
                910STUDIO
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 22px; color: #fff;">
                Thanks, ${safeName} — we've got it.
              </h2>
              <p style="margin: 0 0 24px; font-size: 15px; color: #aaa; line-height: 1.6;">
                Your message just landed in our inbox. We read every inquiry ourselves —
                expect a real reply from a real human within <strong style="color: #14b8a6;">1–2 business days</strong>.
              </p>

              <!-- Echo of what they sent -->
              <p style="margin: 0 0 12px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                What you sent us
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Project Type</p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">${safeProjectType}</p>
                  </td>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222; border-left: none;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Budget Range</p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">${safeBudget}</p>
                  </td>
                </tr>
              </table>
              <div style="padding: 20px; background-color: #111; border: 1px solid #222; border-radius: 4px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 14px; color: #ccc; line-height: 1.6; white-space: pre-wrap;">
${safeMessage}
                </p>
              </div>

              <p style="margin: 0; font-size: 14px; color: #888; line-height: 1.6;">
                Need to add something? Just reply to this email — it comes straight to us.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; border-top: 1px solid #14b8a620;">
              <p style="margin: 0; font-size: 12px; color: #14b8a6; font-weight: 600; letter-spacing: 1px;">910STUDIO</p>
              <p style="margin: 6px 0 0; font-size: 11px; color: #444;">Creative web studio — 910.studio</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const clientText = [
      "910STUDIO",
      "",
      `Thanks, ${name} — we've got it.`,
      "",
      "Your message just landed in our inbox. We read every inquiry ourselves — expect a real reply from a real human within 1–2 business days.",
      "",
      "What you sent us:",
      `  Project Type: ${projectType || "Not specified"}`,
      `  Budget Range: ${budget || "Not specified"}`,
      "",
      "  Message:",
      message,
      "",
      "Need to add something? Just reply to this email — it comes straight to us.",
      "",
      "910studio — 910.studio",
    ].join("\n");

    // 1. Internal notification (to us). This is the send that must succeed —
    //    if we don't capture the lead, the whole request failed.
    const { sent, error } = await sendEmail(
      {
        from: EMAIL_FROM,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `New Inquiry: ${projectType || "General"} - ${name}`,
        html: emailHtml,
        text: emailText,
      },
      "inquiry-notification"
    );

    if (!sent) {
      return NextResponse.json(
        { error: "Failed to send email", detail: error },
        { status: 500 }
      );
    }

    // 2. Auto-reply to the client (best-effort). A failure here shouldn't 500 a
    //    lead we've already captured — we log it and report it, but still 200.
    const { sent: replySent, error: replyError } = await sendEmail(
      {
        from: EMAIL_FROM,
        to: email,
        replyTo: REPLY_TO,
        subject: "We got your message — 910studio",
        html: clientHtml,
        text: clientText,
      },
      "inquiry-autoreply"
    );

    return NextResponse.json({
      success: true,
      autoReplySent: replySent,
      ...(replyError && { autoReplyError: replyError }),
    });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
