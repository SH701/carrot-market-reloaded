"use server";

import { redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function addPost(_: unknown, formData: FormData) {
  const session = await getSession();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();

  if (!title || !description || !session?.id) {
    return { error: "모든 필드를 입력해주세요." };
  }

  const post = await db.post.create({
    data: {
      title,
      description,
      userId: session.id,
    },
  });

  redirect(`/posts/${post.id}`);
}
