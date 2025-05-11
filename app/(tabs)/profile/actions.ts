"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";


export async function getUser(){
 const session = await getSession();
if (session.id) {
  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      username: true,
      avatar: true,
      id:true,
    },
  });

  const sellingProducts = await db.product.findMany({
    where: {
      userId: session.id,
      isSold: false,
    },
  });

  if (user) {
    return {
      ...user,
      sellingProducts,
    };
  }
}
notFound();

}
export async function Logout(){
    const user = await getUser();
    const session = await getSession();
    if (user && session) {
        await session.destroy();
    }
    redirect("/")
}