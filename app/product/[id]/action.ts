"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { ProductStatus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function DeletePro(formData: FormData){
    const id = formData.get("id");
    await db.product.delete({
      where: {
        id: Number(id),
      },
    });
    redirect("/home");
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
                    id:true,
                    username:true,
                    avatar:true,
                }
            }
        },
    })
    return product
}
export async function getProductTitle(id:number){
    const product = await db.product.findUnique({
        where:{
            id,
        },
        select:{
            title:true,
        }
    })
    return product;
}
export async function changeStatus(productId: number, status: ProductStatus) {
  const session = await getSession()

  const product = await db.product.findUnique({
    where: { id: productId },
    select: { userId: true },
  })

  if (!product || product.userId !== session.id) {
    throw new Error("권한 없음")
  }

  await db.product.update({
    where: { id: productId },
    data: { status },
  })
}
interface IReviewCreate {
  productId: number;
  userId: number;
  userRating: string;
  detailRating: string;
}
export const ReviewCreate = async ({
  productId,
  userId,
  userRating,
  detailRating,
}: IReviewCreate) => {
  await db.review.create({
    data: {
      productId,
      userId,
      userRating,
      detailRating,
    },
  });
  redirect('/home');
};