import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/app/api/db";
import { EVENT_CATEGORIES } from "../../types";
import Field, { fieldInputClass } from "@/components/Field";
import Button from "@/components/Button";
import Card from "@/components/Card";

export const metadata = {
  title: "Edit Event · St. John's Travel Advisory",
  description: "Edit an existing event on the St. John's calendar.",
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const { db } = await connectToDB();
  const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

  if (!event) {
    notFound();
  }

  async function updateEvent(formData: FormData) {
    "use server";

    const eventId = formData.get("id") as string;
    const { db } = await connectToDB();

    await db.collection("events").updateOne(
      { _id: new ObjectId(eventId) },
      {
        $set: {
          title: formData.get("title"),
          description: formData.get("description"),
          category: formData.get("category"),
          location: formData.get("location"),
          date: formData.get("date"),
          startTime: formData.get("startTime"),
          endTime: formData.get("endTime"),
          url: formData.get("url"),
          submittedBy: formData.get("submittedBy"),
        },
      }
    );

    revalidatePath("/events");
    redirect("/events");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link
        href="/events"
        className="text-sm font-semibold text-nl-fog hover:text-nl-green-700"
      >
        ← Back to calendar
      </Link>

      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Edit <span className="text-tricolour">Event</span>
      </h1>
      <p className="mt-3 text-base text-nl-fog">
        Update the details below and save your changes.
      </p>

      <Card className="mt-10 p-6">
        <form action={updateEvent} className="space-y-5">
          <input type="hidden" name="id" value={id} />

          <Field
            label="Event name"
            name="title"
            required
            defaultValue={event.title ?? ""}
            placeholder="George Street Festival"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="Date" name="date" type="date" required defaultValue={event.date ?? ""} />
            <Field label="Start time" name="startTime" type="time" defaultValue={event.startTime ?? ""} />
            <Field label="End time" name="endTime" type="time" defaultValue={event.endTime ?? ""} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Category">
              <select
                name="category"
                defaultValue={event.category ?? "Music"}
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
              defaultValue={event.location ?? ""}
              placeholder="George Street, St. John's"
            />
          </div>

          <Field label="Details">
            <textarea
              name="description"
              rows={3}
              defaultValue={event.description ?? ""}
              placeholder="What's happening, what to expect, cost..."
              className={fieldInputClass}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Link (optional)"
              name="url"
              type="url"
              defaultValue={event.url ?? ""}
              placeholder="https://..."
            />
            <Field label="Your name (optional)" name="submittedBy" defaultValue={event.submittedBy ?? ""} />
          </div>

          <Button type="submit" fullWidth>
            Save changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
