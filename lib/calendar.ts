import { kv } from "@vercel/kv";

// Business hours config (UB timezone)
export const BUSINESS_HOURS = {
  timezone: "Asia/Ulaanbaatar",
  start: 10, // 10 AM
  end: 18, // 6 PM
  slotDuration: 30, // 30 min slots
  // Days available (0 = Sunday, 1 = Monday, etc.)
  availableDays: [1, 2, 3, 4, 5], // Mon-Fri
};

export interface Booking {
  id: string;
  name: string;
  email: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  projectType?: string;
  notes?: string;
  createdAt: string;
}

export interface TimeSlot {
  start: string; // ISO string
  end: string; // ISO string
  available: boolean;
}

// Generate time slots for a given date
export function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const { start, end, slotDuration } = BUSINESS_HOURS;

  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += slotDuration) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, min, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

      if (slotEnd.getHours() > end || (slotEnd.getHours() === end && slotEnd.getMinutes() > 0)) {
        continue;
      }

      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        available: true,
      });
    }
  }

  return slots;
}

// Check if a day is a business day
export function isBusinessDay(date: Date): boolean {
  return BUSINESS_HOURS.availableDays.includes(date.getDay());
}

// Get all bookings for a specific date
export async function getBookingsForDate(date: Date): Promise<Booking[]> {
  const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const bookings = await kv.get<Booking[]>(`bookings:${dateKey}`);
  return bookings || [];
}

// Save a booking
export async function saveBooking(booking: Booking): Promise<void> {
  const date = new Date(booking.startTime);
  const dateKey = date.toISOString().split("T")[0];

  const existing = await getBookingsForDate(date);
  existing.push(booking);

  // Store with 90 day TTL (cleanup old bookings automatically)
  await kv.set(`bookings:${dateKey}`, existing, { ex: 60 * 60 * 24 * 90 });

  // Also store in a master list for easy lookup
  await kv.sadd("all_booking_ids", booking.id);
}

// Check if a slot overlaps with existing bookings
export function isSlotBooked(slot: TimeSlot, bookings: Booking[]): boolean {
  const slotStart = new Date(slot.start).getTime();
  const slotEnd = new Date(slot.end).getTime();

  return bookings.some((booking) => {
    const bookingStart = new Date(booking.startTime).getTime();
    const bookingEnd = new Date(booking.endTime).getTime();
    return slotStart < bookingEnd && slotEnd > bookingStart;
  });
}

// Generate ICS file content
export function generateICS(booking: Booking): string {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//910studio//Booking//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${booking.id}@910.studio
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:910studio Call: ${booking.name}${booking.projectType ? ` - ${booking.projectType}` : ""}
DESCRIPTION:Project inquiry call with ${booking.name}\\nEmail: ${booking.email}${booking.projectType ? `\\nProject: ${booking.projectType}` : ""}${booking.notes ? `\\n\\nNotes:\\n${booking.notes}` : ""}
ORGANIZER:mailto:${process.env.CONTACT_EMAIL}
ATTENDEE:mailto:${booking.email}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}
