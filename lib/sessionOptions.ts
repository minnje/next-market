import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
     cookieName: "next-market",
     password: process.env.COOKIE_PASSWORD!,
     cookieOptions: { secure: process.env.NODE_ENV === "production" },
};
