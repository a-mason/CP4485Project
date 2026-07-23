import { connectToDB } from "@/app/api/db";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { jwtVerify, type JWTPayload } from "jose";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let payload: JWTPayload;
  try {
    ({ payload } = await jwtVerify(session.value, secret));
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  const { db } = await connectToDB();
  const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  // Only the user who created the event may delete it.
  if (!event.userId || event.userId.toString() !== (payload.userId as string)) {
    return Response.json(
      { error: "You can only delete your own events" },
      { status: 403 }
    );
  }

  await db.collection("events").deleteOne({ _id: new ObjectId(id) });

  return Response.json({ ok: true });
}
