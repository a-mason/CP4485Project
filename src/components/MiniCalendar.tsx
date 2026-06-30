"use client";

import { useState } from "react";
import type { TravelEvent } from "@/app/events/types";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toYMD(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function MiniCalendar({ events }: { events: TravelEvent[] }) {
  const today = new Date();
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const todayYMD = toYMD(today);

  const eventDays = new Set(
    events
      .filter((event) => event.date.startsWith(toYMD(cursor).slice(0, 7)))
      .map((event) => Number(event.date.slice(8, 10)))
  );

  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  function goToMonth(delta: number) {
    setCursor(new Date(year, month + delta, 1));
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-extrabold">
          {MONTHS[month]} {year}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            aria-label="Previous month"
            className="rounded-md border border-black/10 px-2 text-sm font-bold text-nl-ink/70 hover:bg-black/5"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            aria-label="Next month"
            className="rounded-md border border-black/10 px-2 text-sm font-bold text-nl-ink/70 hover:bg-black/5"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.6rem] font-bold uppercase text-nl-fog">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`blank-${index}`} />;
          }
          const ymd = `${toYMD(cursor).slice(0, 8)}${String(day).padStart(2, "0")}`;
          const isToday = ymd === todayYMD;
          const hasEvent = eventDays.has(day);
          return (
            <div
              key={day}
              className={`flex aspect-square flex-col items-center justify-center rounded-md text-xs ${
                isToday ? "bg-nl-green font-bold text-white" : "text-nl-ink"
              }`}
            >
              {day}
              <span
                className={`mt-0.5 h-1 w-1 rounded-full ${
                  hasEvent
                    ? isToday
                      ? "bg-white"
                      : "bg-nl-pink-600"
                    : "bg-transparent"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}