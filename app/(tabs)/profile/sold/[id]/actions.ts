"use server"
import db from "@/lib/db"
import { ProductStatus } from "@prisma/client";

export async function getUserProduct(id: number) {
  const userProduct = await db.product.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      price: true,
      title: true,
      created_at: true,
      photo: true,
      status: true,
    },
  });
  return userProduct;
}
export async function UpdateProduct(
  id: number,
  newStatus: keyof typeof ProductStatus
) {
  await db.product.update({
    where: {
      id,
    },
    data: {
      status: newStatus,
    },
  });
}
export async function getAvatar(userId: number) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { avatar: true },
  });

  return user?.avatar ?? null;
}