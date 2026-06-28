import Link from "next/link";
import { EVENT_CATEGORIES } from "../types";
import Field, { fieldInputClass } from "@/components/Field";
import Button from "@/components/Button";
import Card from "@/components/Card";

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

      <Card className="mt-10 p-6">
        <form action="/api/events" method="POST" className="space-y-5">
          <Field
            label="Event name"
            name="title"
            required
            placeholder="George Street Festival"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="Date" name="date" type="date" required />
            <Field label="Start time" name="startTime" type="time" />
            <Field label="End time" name="endTime" type="time" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Category">
              <select
                name="category"
                defaultValue="Music"
                className={fieldInputClass}
              >
                {EVENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Location"
              name="location"
              placeholder="George Street, St. John's"
            />
          </div>

          <Field label="Details">
            <textarea
              name="description"
              rows={3}
              placeholder="What's happening, what to expect, cost..."
              className={fieldInputClass}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Link (optional)"
              name="url"
              type="url"
              placeholder="https://..."
            />
            <Field label="Your name (optional)" name="submittedBy" />
          </div>

          <Button type="submit" fullWidth>
            Add event
          </Button>
        </form>
      </Card>
    </div>
  );
}
