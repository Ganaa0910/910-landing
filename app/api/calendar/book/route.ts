import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import {
  saveBooking,
  generateICS,
  getBookingsForDate,
  isSlotBooked,
  BUSINESS_HOURS,
  type Booking,
} from "@/lib/calendar";

interface BookingRequest {
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  projectType?: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();
    const { name, email, startTime, endTime, projectType, notes } = body;

    // Validation
    if (!name || !email || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Check if slot is still available
    const date = new Date(startTime);
    let existingBookings;
    try {
      existingBookings = await getBookingsForDate(date);
      const slot = { start: startTime, end: endTime, available: true };
      if (isSlotBooked(slot, existingBookings)) {
        return NextResponse.json({ error: "This time slot is no longer available" }, { status: 409 });
      }
    } catch {
      // KV not configured - dev mode, skip availability check
    }

    // Create booking
    const booking: Booking = {
      id: uuidv4(),
      name,
      email,
      startTime,
      endTime,
      projectType,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Save to KV (will fail gracefully in dev mode)
    try {
      await saveBooking(booking);
    } catch {
      // KV not configured - booking saved only via email in dev mode
    }

    // Generate ICS file
    const icsContent = generateICS(booking);
    const icsBase64 = Buffer.from(icsContent).toString("base64");

    // Format date/time for emails
    const startDate = new Date(startTime);
    const formattedDate = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: BUSINESS_HOURS.timezone,
    });
    const formattedTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: BUSINESS_HOURS.timezone,
    });

    // Send emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email to you (with ICS attachment)
      await resend.emails.send({
        from: "910studio <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL!,
        subject: `New Call Booked: ${name} - ${formattedDate} ${formattedTime}`,
        attachments: [
          {
            filename: "meeting.ics",
            content: icsBase64,
          },
        ],
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border: 2px solid #14b8a6;">
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #14b8a620;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #14b8a6;">NEW CALL BOOKED</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="padding: 16px; background-color: #14b8a610; border-left: 3px solid #14b8a6; margin-bottom: 24px;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #14b8a6; text-transform: uppercase;">Client</p>
                <p style="margin: 0; font-size: 18px; color: #fff; font-weight: 600;">${name}</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #888;">${email}</p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase;">Date</p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">${formattedDate}</p>
                  </td>
                  <td width="50%" style="padding: 12px 16px; border: 1px solid #222; border-left: none;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #666; text-transform: uppercase;">Time</p>
                    <p style="margin: 0; font-size: 14px; color: #fff;">${formattedTime} (UB)</p>
                  </td>
                </tr>
              </table>

              ${projectType ? `<p style="margin: 0 0 16px; font-size: 14px; color: #888;"><strong style="color: #fff;">Project Type:</strong> ${projectType}</p>` : ""}

              <p style="margin: 24px 0 0; font-size: 13px; color: #14b8a6;">
                📎 ICS file attached - add to your calendar
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim(),
      });

      // Confirmation email to client (with ICS attachment)
      await resend.emails.send({
        from: "910studio <onboarding@resend.dev>",
        to: email,
        subject: `Your call with 910studio is confirmed - ${formattedDate}`,
        attachments: [
          {
            filename: "meeting.ics",
            content: icsBase64,
          },
        ],
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border: 2px solid #14b8a6;">
          <tr>
            <td style="padding: 32px 40px; border-bottom: 1px solid #14b8a620;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #14b8a6;">910STUDIO</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; font-size: 20px; color: #fff;">Your call is confirmed!</h2>

              <div style="padding: 20px; background-color: #14b8a610; border-left: 3px solid #14b8a6; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #888;">When</p>
                <p style="margin: 0; font-size: 16px; color: #fff; font-weight: 600;">
                  ${formattedDate}<br>
                  ${formattedTime} (Ulaanbaatar Time)
                </p>
              </div>

              <p style="margin: 0 0 16px; font-size: 14px; color: #888;">
                📎 Calendar invite attached - click to add to your calendar
              </p>

              <p style="margin: 24px 0 0; font-size: 13px; color: #666;">
                We'll send you a meeting link before the call. See you there!
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim(),
      });
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error("Calendar booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
