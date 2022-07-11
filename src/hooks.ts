import type { GetSession, Handle } from "@sveltejs/kit";
import { parse } from "cookie";
import { initilizeDb, getSession as getSessionFromApi } from "./routes/api/_db";

await initilizeDb();

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = parse(event.request.headers.get("cookie") || "");

  event.locals.user = null;
  if (cookies.session_id) {
    const session = await getSessionFromApi(cookies.session_id);
    if (session) {
      event.locals.user = { email: session.email };
    }
  }

  const response = await resolve(event);
  return response;
};

export const getSession: GetSession = async (event) => {
  return event.locals.user
    ? {
        user: {
          email: event.locals.user.email
        }
      }
    : {};
};
