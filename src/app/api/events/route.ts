import { connectToDB } from "@/app/api/db";
import { revalidatePath } from "next/cache";
import { validateEventInput } from "@/app/events/validateEvent";
import { cookies } from "next/headers";
import { jwtVerify, type JWTPayload } from "jose";
import { ObjectId } from "mongodb";

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
      endDate: event.endDate ? event.endDate : "",
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
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let payload: JWTPayload;
  try {
    ({ payload } = await jwtVerify(session!.value, secret));
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const endDate = formData.get("endDate") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;

  const error = validateEventInput({
    title,
    date,
    endDate,
    startTime,
    endTime,
    location,
    description,
  });
  if (error) {
    return Response.redirect(
      new URL(`/events/add?error=${encodeURIComponent(error)}`, request.url),
      303
    );
  }

  const { db } = await connectToDB();

  await db.collection("events").insertOne({
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
    userId: new ObjectId(payload.userId as string),
    createdAt: new Date(),
  });

  revalidatePath("/events");
  return Response.redirect(new URL("/events", request.url), 303);
}
