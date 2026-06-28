import Link from "next/link";
import { EVENT_CATEGORIES } from "../types";

export const metadata = {
  title: "Add an Event · St. John's Travel Advisory",
  description: "Add a new event to the St. John's calendar.",
};

export default function AddEventPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link
        href="/events"
        className="text-sm font-semibold text-nl-fog hover:text-nl-green-700"
      >
        ← Back to calendar
      </Link>

      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Add an <span className="text-tricolour">Event</span>
      </h1>
      <p className="mt-3 text-base text-nl-fog">
        Share something happening around St. John&apos;s. It will show up on the
        calendar once you submit.
      </p>

      <form
        action="/api/events"
        method="POST"
        className="mt-10 space-y-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className="text-sm font-semibold">Event name</span>
          <input
            type="text"
            name="title"
            required
            placeholder="George Street Festival"
            className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
          />
        </label>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold">Date</span>
            <input
              type="date"
              name="date"
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Start time</span>
            <input
              type="time"
              name="startTime"
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">End time</span>
            <input
              type="time"
              name="endTime"
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Category</span>
            <select
              name="category"
              defaultValue="Music"
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            >
              {EVENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Location</span>
            <input
              type="text"
              name="location"
              placeholder="George Street, St. John's"
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold">Details</span>
          <textarea
            name="description"
            rows={3}
            placeholder="What's happening, what to expect, cost..."
            className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
          />
        </label>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Link (optional)</span>
            <input
              type="url"
              name="url"
              placeholder="https://..."
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Your name (optional)</span>
            <input
              type="text"
              name="submittedBy"
              className="mt-1 w-full rounded-lg border border-black/10 bg-nl-cream px-3 py-2 text-sm outline-none focus:border-nl-green"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-nl-green px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nl-green-700"
        >
          Add event
        </button>
      </form>
    </div>
  );
}
