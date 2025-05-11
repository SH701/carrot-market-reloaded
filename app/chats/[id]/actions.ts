"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";

export async function saveMessage(payload:string,chatRoomId:string){
    const session = await getSession();
    await db.message.create({
        data:{
            payload,
            chatRoomId,
            userId:session.id!,
        },
        select:{
            id:true,
        }
    })
}
export async function getMessage(chatRoomId: string,userId:number) {
  await db.message.updateMany({
     where: {
      chatRoomId,
      userId: {
        not: userId,
      },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
  const messages = await db.message.findMany({
    where: { chatRoomId },
    select: {
      id: true,
      payload: true,
      isRead:true,
      created_at: true,
      userId: true,
      user: {
        select: { avatar: true, username: true }
      }
    }
  });
  return messages;
}