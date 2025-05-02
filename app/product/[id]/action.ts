"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function DeletePro(formData: FormData){
    const id = formData.get("id");
    await db.product.delete({
      where: {
        id: Number(id),
      },
    });
    redirect("/products");
  };
export async function getIsOwner(userId:number){
    const session = await getSession();
    if(session.id){
        return session.id === userId
    }
    return false;
}
export async function getProduct(id:number){
    const product = await db.product.findUnique({
        where:{
            id,
        },
        include:{
            user:{
                select:{
                    username:true,
                    avatar:true,
                }
            }
        },
    })
    return product
}