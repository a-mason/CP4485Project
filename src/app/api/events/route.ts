import { connectToDB } from "@/app/api/db";
import { revalidatePath } from "next/cache";
import { validateEventInput } from "@/app/events/validateEvent";

export const dynamic = "force-dynamic";

export async function GET() {
  const { db } = await connectToDB();

  const events = await db
    .collection("events")
    .find({})
    .sort({ date: 1, startTime: 1 })
    .toArray();

  const serialized = events.map((event) => {
    return {
      _id: event._id.toString(),
      title: event.title ? event.title : "",
      description: event.description ? event.description : "",
      category: event.category ? event.category : "Other",
      location: event.location ? event.location : "",
      date: event.date ? event.date : "",
      startTime: event.startTime ? event.startTime : "",
      endTime: event.endTime ? event.endTime : "",
      url: event.url ? event.url : "",
      submittedBy: event.submittedBy ? event.submittedBy : "",
      createdAt: event.createdAt,
    };
  });

  return Response.json(serialized);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  const error = validateEventInput({ date, startTime, endTime });
  if (error) {
    return Response.redirect(
      new URL(`/events/add?error=${encodeURIComponent(error)}`, request.url),
      303
    );
  }

  const { db } = await connectToDB();

  await db.collection("events").insertOne({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
    date,
    startTime,
    endTime,
    url: formData.get("url"),
    submittedBy: formData.get("submittedBy"),
    createdAt: new Date(),
  });

  revalidatePath("/events");
  return Response.redirect(new URL("/events", request.url), 303);
}
