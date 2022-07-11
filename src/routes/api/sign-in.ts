import { createSession, getUser } from "./_db";
import { serialize } from "cookie";
import type { RequestHandler } from "@sveltejs/kit";

export const post: RequestHandler = async ({ request }) => {
  const { email, password } = await request.json();

  const user = await getUser({ email, password });

  if (!user) {
    return { status: 401, body: "Incorrect email or password" };
  }

  const { id } = await createSession(email);
  return {
    status: 200,
    headers: {
      "Set-Cookie": serialize("session_id", id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7 // one week
      })
    },
    body: {
      message: "Successfully signed in"
    }
  };
};
