import { removeSession } from "./_db";
import { parse, serialize } from "cookie";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ request }) => {
  const { headers } = request;

  const cookie = headers.get("cookie");
  const cookies = parse(cookie || "");

  if (cookies.session_id) {
    await removeSession(cookies.session_id);
  }

  return {
    status: 200,
    headers: {
      "Set-Cookie": serialize("session_id", "", {
        path: "/",
        expires: new Date(0)
      })
    }
  };
};
