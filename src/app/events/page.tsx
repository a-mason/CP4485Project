import Link from "next/link";
import EventsCalendar from "./EventsCalendar";

export const metadata = {
  title: "Events · St. John's Travel Advisory",
  description: "Upcoming events around St. John's, month by month.",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-tricolour">Event Calendar</span>
        </h1>

        <Link
          href="/events/add"
          className="rounded-full bg-nl-green px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-nl-green-700"
        >
          + Add event
        </Link>
      </div>

      <div className="mt-10">
        <EventsCalendar />
      </div>
    </div>
  );
}
