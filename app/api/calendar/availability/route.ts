import { NextResponse } from "next/server";
import {
  generateTimeSlots,
  isBusinessDay,
  getBookingsForDate,
  isSlotBooked,
  type TimeSlot,
} from "@/lib/calendar";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
    }

    const date = new Date(dateParam);

    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (!isBusinessDay(date)) {
      return NextResponse.json({ slots: [], message: "Not a business day" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return NextResponse.json({ slots: [], message: "Date is in the past" });
    }

    // Generate potential time slots
    const slots = generateTimeSlots(date);

    // Get existing bookings for this date
    let bookings;
    try {
      bookings = await getBookingsForDate(date);
    } catch {
      // KV not configured - dev mode, return all slots available
      return NextResponse.json({
        slots,
        warning: "Running in dev mode - all slots shown as available",
      });
    }

    const now = Date.now();

    // Mark slots as unavailable if booked or in the past
    const availableSlots: TimeSlot[] = slots.map((slot) => {
      const slotStart = new Date(slot.start).getTime();
      const isPast = slotStart < now;
      const isBooked = isSlotBooked(slot, bookings);

      return {
        ...slot,
        available: !isPast && !isBooked,
      };
    });

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    console.error("Calendar availability error:", error);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
