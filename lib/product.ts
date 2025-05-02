import db from "./db";

export async function getPrevNextProducts(createdAt: Date) {
    const prev = await db.product.findFirst({
      where: { created_at: { gt: createdAt } },
      orderBy: { created_at: 'asc' },
    });
    const next = await db.product.findFirst({
      where: { created_at: { lt: createdAt } },
      orderBy: { created_at: 'desc' },
    });
    return { prev, next };
  }
  