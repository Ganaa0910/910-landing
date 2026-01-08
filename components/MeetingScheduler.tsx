"use client";

import { useState, useEffect } from "react";

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface MeetingSchedulerProps {
  accentColor: string;
  uiFont: string;
  clientName: string;
  clientEmail: string;
  projectType?: string;
  onBooked: () => void;
  onBack: () => void;
}

export function MeetingScheduler({
  accentColor,
  uiFont,
  clientName,
  clientEmail,
  projectType,
  onBooked,
  onBack,
}: MeetingSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate next 14 days for date selection
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  // Filter to only weekdays (Mon-Fri)
  const weekdays = dates.filter((d) => d.getDay() !== 0 && d.getDay() !== 6);

  // Fetch slots when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      setError(null);
      setSlots([]);
      setSelectedSlot(null);

      try {
        const res = await fetch(
          `/api/calendar/availability?date=${selectedDate.toISOString()}`
        );
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setSlots(data.slots || []);
        }
      } catch {
        setError("Failed to load available times");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const handleBook = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);
    setError(null);

    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          projectType,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        onBooked();
      }
    } catch {
      setError("Failed to book meeting");
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const availableSlots = slots.filter((s) => s.available);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1 transition-colors hover:opacity-70"
          style={{ color: accentColor }}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3
          className="text-lg font-bold uppercase tracking-wider"
          style={{ color: accentColor, fontFamily: `var(${uiFont})` }}
        >
          Book a Call
        </h3>
      </div>

      {/* Date Selection */}
      <div>
        <p
          className="mb-2 text-xs uppercase tracking-wider"
          style={{ color: accentColor, fontFamily: `var(${uiFont})` }}
        >
          Select a Date
        </p>
        <div className="flex flex-wrap gap-2">
          {weekdays.map((date) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className="px-3 py-2 text-xs transition-all"
                style={{
                  border: `2px solid ${isSelected ? accentColor : `${accentColor}40`}`,
                  backgroundColor: isSelected ? accentColor : "transparent",
                  color: isSelected ? "#000" : "#fff",
                  fontFamily: `var(${uiFont})`,
                }}
              >
                {formatDate(date)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <p
            className="mb-2 text-xs uppercase tracking-wider"
            style={{ color: accentColor, fontFamily: `var(${uiFont})` }}
          >
            Select a Time
          </p>

          {isLoading ? (
            <div
              className="py-8 text-center text-sm"
              style={{ color: `${accentColor}80`, fontFamily: `var(${uiFont})` }}
            >
              Loading available times...
            </div>
          ) : error ? (
            <div
              className="py-4 text-center text-sm"
              style={{ color: "#ef4444", fontFamily: `var(${uiFont})` }}
            >
              {error}
            </div>
          ) : availableSlots.length === 0 ? (
            <div
              className="py-4 text-center text-sm"
              style={{ color: `${accentColor}60`, fontFamily: `var(${uiFont})` }}
            >
              No available times on this date
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot?.start === slot.start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className="px-2 py-2 text-xs transition-all"
                    style={{
                      border: `2px solid ${isSelected ? accentColor : `${accentColor}40`}`,
                      backgroundColor: isSelected ? accentColor : "transparent",
                      color: isSelected ? "#000" : "#fff",
                      fontFamily: `var(${uiFont})`,
                    }}
                  >
                    {formatTime(slot.start)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Confirm Button */}
      {selectedSlot && (
        <div className="space-y-3 pt-2">
          <div
            className="border-2 p-3 text-center text-sm"
            style={{
              borderColor: `${accentColor}40`,
              color: "#fff",
              fontFamily: `var(${uiFont})`,
            }}
          >
            <span style={{ color: `${accentColor}80` }}>Selected: </span>
            {selectedDate && formatDate(selectedDate)} at{" "}
            {formatTime(selectedSlot.start)}
          </div>

          <button
            type="button"
            onClick={handleBook}
            disabled={isBooking}
            className="w-full py-3 text-sm font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: accentColor,
              color: "#000",
              fontFamily: `var(${uiFont})`,
            }}
          >
            {isBooking ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      )}

      {/* Timezone note */}
      <p
        className="text-center text-xs"
        style={{ color: `${accentColor}40`, fontFamily: `var(${uiFont})` }}
      >
        Times shown in Ulaanbaatar timezone (UTC+8)
      </p>
    </div>
  );
}
