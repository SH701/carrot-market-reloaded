"use server"

import { getProduct } from "@/app/product/[id]/action";
import db from "@/lib/db"
import getSession from "@/lib/session"
import { redirect } from "next/navigation"

export async function createChatroom(formData: FormData) {
  const session = await getSession();
  const productId = Number(formData.get("productId"));
  const product = await getProduct(productId);
  if (!product) throw new Error("Product not found");
  const existingRoom = await db.chatRoom.findFirst({
    where: {
      product: { id: productId },
      users: { some: { id: session.id! } },
      AND: {
        users: { some: { id: product.userId } }
      }
    },
    select: { id: true }
  });

  if (existingRoom) {
    redirect(`/chats/${existingRoom.id}`);
  }
  const newRoom = await db.chatRoom.create({
    data: {
      product: { connect: { id: productId } },
      users: {
        connect: [
          { id: product.userId },
          { id: session.id! }
        ]
      }
    },
    select: { id: true }
  });

  redirect(`/chats/${newRoom.id}`);
}

export async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: { id },
    include: {
      users: { select: { id: true } }
    }
  });
  if (room) {
    const session = await getSession();
    const canSee = room.users.some(u => u.id === session.id);
    if (!canSee) return null;
  }
  return room;
}

export async function getUserProfile(){
    const session = await getSession();
    const user = await db.user.findUnique({
        where:{
            id:session.id!
        },
        select:{
            username:true,
            avatar:true,
        }
    })
    return user;
}

export async function getUserChatRooms(){
  const session = await getSession();
  const chatrooms = await db.chatRoom.findMany({
    where:{
      users:{
        some:{
          id:session.id,
        }
      }
    },
    include:{
      product:{
        select:{
          id:true,
          title:true,
          photo:true
        }
      },
      users:{
        select:{
          id:true,
          username:true,
          avatar:true,
        }
      },
       messages: {
        orderBy: { created_at: "desc" },
        take: 1,
      },
        _count: {
        select: {
          messages: {
            where: {
              isRead: false,
              userId:{not:session.id}
            },
          },
        },
      },
    }
  })
  return chatrooms;
}