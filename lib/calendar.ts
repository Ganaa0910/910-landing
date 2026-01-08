import { prisma } from "./db";

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
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await prisma.booking.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return bookings.map((b) => ({
    id: b.id,
    name: b.name,
    email: b.email,
    startTime: b.startTime.toISOString(),
    endTime: b.endTime.toISOString(),
    projectType: b.projectType ?? undefined,
    notes: b.notes ?? undefined,
    createdAt: b.createdAt.toISOString(),
  }));
}

// Save a booking
export async function saveBooking(booking: Booking): Promise<void> {
  await prisma.booking.create({
    data: {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime),
      projectType: booking.projectType,
      notes: booking.notes,
    },
  });
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
