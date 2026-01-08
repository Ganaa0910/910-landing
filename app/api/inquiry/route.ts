import { Resend } from "resend";
import { NextResponse } from "next/server";

interface InquiryRequest {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

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
                      ${name}
                    </p>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #888;">
                      ${email}
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
                      ${projectType || "Not specified"}
                    </p>
                  </td>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222; border-left: none;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                      Budget Range
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">
                      ${budget || "Not specified"}
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
${message}
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
                Reply directly to this email to respond to ${name}
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

    const { error } = await resend.emails.send({
      from: "910studio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Inquiry: ${projectType} - ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
