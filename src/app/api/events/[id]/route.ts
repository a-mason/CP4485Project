import { connectToDB } from "@/app/api/db";
import { ObjectId } from "mongodb";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
