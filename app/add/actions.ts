"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

const productSchema = z.object({
  photo: z.string().url("유효한 이미지 URL을 입력해주세요"),
  title: z.string().min(1, "제목을 입력해주세요"),
  price: z.coerce.number().positive("가격은 0원보다 커야 합니다"),
  description: z.string().min(1, "설명을 입력해주세요"),
});

export async function buildImageUrl(photoId: string) {
  return  `https://imagedelivery.net/${process.env.ACCOUNT_HASH}/${photoId}/public`;
}

export async function uploadProduct(prevState: unknown, formData: FormData) {
  let rawPhoto = formData.get("photo")?.toString(); // 예: photoId만 들어올 수도 있음

  // photoId만 들어온 경우 처리
  if (rawPhoto && !rawPhoto.startsWith("https://")) {
    rawPhoto = await buildImageUrl(rawPhoto);
    formData.set("photo", rawPhoto);
  }

  const data = {
    photo: rawPhoto,
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (session.id) {
    const product = await db.product.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        photo: result.data.photo,
        user: {
          connect: { id: session.id },
        },
      },
      select: { id: true },
    });
    revalidateTag("home-product")
    return { id: product.id };
  }
}


export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}