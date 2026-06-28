import { connectToDB } from "@/app/api/db";
import { revalidatePath } from "next/cache";

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
  const { db } = await connectToDB();
  const formData = await request.formData();

  await db.collection("events").insertOne({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    location: formData.get("location"),
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    url: formData.get("url"),
    submittedBy: formData.get("submittedBy"),
    createdAt: new Date(),
  });

  revalidatePath("/events");
  return Response.redirect(new URL("/events", request.url), 303);
}
