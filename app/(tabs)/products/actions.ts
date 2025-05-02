"use server"

import db from "@/lib/db";

export async function getMoreProducts(page: number) {
  const PAGE_SIZE = 5;

  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });

  return products;
}
