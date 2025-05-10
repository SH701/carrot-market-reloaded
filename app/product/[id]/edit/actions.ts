"use server";

import { revalidateTag } from "next/cache";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function editProduct(formData: FormData) {

  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;


  await db.product.update({
    where: { id },
    data: {title, price, description },
  });

  await revalidateTag("home-products");
  await revalidateTag("product-detail");

  redirect(`/product/${id}`);
}
