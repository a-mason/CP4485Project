import { getGoogleUser, updateOrCreateUserInfo } from "@/googleOauthUtils";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    redirect("/login");
  }

  const oauthUserInfo = await getGoogleUser(code);
  const user = await updateOrCreateUserInfo(oauthUserInfo);

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
    picture: user.picture,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set("session", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/events");
}