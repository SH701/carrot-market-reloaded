"use server"

import db from "@/lib/db"

export async function getInitialProducts(){
    const product = db.product.findMany({
    select: {
        id: true,
        title: true,
        price: true,
        created_at: true,
        photo: true,
      },
      take:10,
    })
    return product
}


