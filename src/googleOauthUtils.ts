import { google } from "googleapis";
import { ObjectId } from "mongodb";
import { connectToDB } from "./app/api/db";

const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT
);

export function getGoogleOauthUrl(): string {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oauthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
}

export interface GoogleUser {
  id: string;
  email: string;
  verified_email?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export async function getGoogleUser(code: string): Promise<GoogleUser> {
  const { tokens } = await oauthClient.getToken(code);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
  );
  const userInfo = (await response.json()) as GoogleUser;

  return userInfo;
}

export interface AppUser {
  _id: ObjectId;
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

export async function updateOrCreateUserInfo(
  oauthUserInfo: GoogleUser
): Promise<AppUser> {
  const { db } = await connectToDB();
  const { id, email, name, picture } = oauthUserInfo;

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    // Keep the stored name and profile picture fresh on each login.
    await db
      .collection("users")
      .updateOne({ email }, { $set: { name, picture } });
    return { ...(existing as unknown as AppUser), name, picture };
  }

  const result = await db
    .collection("users")
    .insertOne({ id, email, name, picture });
  return { _id: result.insertedId, id, email, name, picture };
}