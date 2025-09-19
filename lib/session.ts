import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/sessionOptions";

export async function getSession() {
     const cookieStore = cookies();
     const cookieHeader = (await cookieStore).get("next-market")?.value || "";

     const req = { headers: { cookie: cookieHeader } };
     const session = await getIronSession(req as any, sessionOptions);

     if (!session) return null;

     return session;
}
