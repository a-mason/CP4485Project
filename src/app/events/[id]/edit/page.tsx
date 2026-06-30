import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { connectToDB } from "@/app/api/db";
import { validateEventInput } from "../../validateEvent";
import Card from "@/components/Card";
import EventForm from "../../EventForm";

export const metadata = {
  title: "Edit Event · St. John's Travel Advisory",
  description: "Edit an existing event on the St. John's calendar.",
};

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

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
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const endDate = formData.get("endDate") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    const validationError = validateEventInput({
      title,
      date,
      endDate,
      startTime,
      endTime,
    });
    if (validationError) {
      redirect(`/events/${eventId}/edit?error=${encodeURIComponent(validationError)}`);
    }

    const { db } = await connectToDB();

    await db.collection("events").updateOne(
      { _id: new ObjectId(eventId) },
      {
        $set: {
          title,
          description: formData.get("description"),
          category: formData.get("category"),
          location: formData.get("location"),
          date,
          endDate,
          startTime,
          endTime,
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
        <EventForm
          action={updateEvent}
          hiddenId={id}
          submitLabel="Save changes"
          error={error}
          defaultValues={{
            title: event.title ?? "",
            description: event.description ?? "",
            category: event.category ?? "Music",
            location: event.location ?? "",
            date: event.date ?? "",
            endDate: event.endDate ?? "",
            startTime: event.startTime ?? "",
            endTime: event.endTime ?? "",
            url: event.url ?? "",
            submittedBy: event.submittedBy ?? "",
          }}
        />
      </Card>
    </div>
  );
}
