import EventsCalendar from "./EventsCalendar";

export const metadata = {
  title: "Events · St. John's Travel Advisory",
  description: "Upcoming events around St. John's, month by month.",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        <span className="text-tricolour">Event Calendar</span>
      </h1>
      <p className="mt-3 max-w-2xl text-base text-nl-fog">
      </p>

      <div className="mt-10">
        <EventsCalendar />
      </div>
    </div>
  );
}
