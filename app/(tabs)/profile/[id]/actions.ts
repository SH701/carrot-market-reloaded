"use server"

import db from "@/lib/db"

export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
}