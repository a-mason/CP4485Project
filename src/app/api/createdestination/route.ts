import { connectToDB } from "@/app/api/db";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { db } = await connectToDB();
  const formData = await request.formData();

  await db.collection("spots").insertOne({
    place: formData.get("place"),
    category: formData.get("category"),
    tip: formData.get("tip"),
    submittedBy: formData.get("submittedBy"),
    createdAt: new Date(),
  });

  revalidatePath("/spots");
  return Response.redirect(new URL("/spots", request.url), 303);
}