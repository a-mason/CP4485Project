import { connectToDB } from "@/app/api/db";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jwtVerify(session!.value, secret);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }

  const { db } = await connectToDB();
  const result = await db
    .collection("events")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  return Response.json({ ok: true });
}
