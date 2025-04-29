// lib/session.ts
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";


export interface SessionData {
 id:number
}

export default function getSession() {
  return getIronSession<SessionData>(cookies(), {
    cookieName: "Carrot", 
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function LoginSession(user:SessionData){
  const session = await getSession();
  session.id = user.id;
  await session.save();
}