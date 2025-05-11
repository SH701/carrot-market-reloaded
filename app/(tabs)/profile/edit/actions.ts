"use server"

import db from "@/lib/db"
import getSession from "@/lib/session";
import { redirect } from "next/navigation"
import { z } from "zod";

const usernameSchema = z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다.").max(20, "닉네임은 최대 20자까지 가능합니다.");


export async function getUserProfile(){
    const session = await getSession();
    if (session.id) {
    const user = await db.user.findUnique({
        where:{id:session.id},
        select:{
            avatar:true,
            username:true,
        }
    })    
   return user;
    }
}
export async function ProfileEdit(prevState:unknown,formData: FormData){
    const session = await getSession();
    const username = formData.get("username") as string;
    if(!session.id || !username){
        throw new Error("Unauthorized or invalid input")
    }
    const result = usernameSchema.safeParse(username);
    if (!result.success) {
    const message = result.error.format()._errors?.[0] ?? "잘못된 입력입니다.";
    return {error:message}
  }
  const existing = await db.user.findFirst({
    where:{
        username:result.data,
        NOT:{id:session.id},
    }
  })
  if(existing){
    return {error:"이미 사용 중인 닉네임입니다."}
  }
  const currentUser = await db.user.findUnique({
  where: { id: session.id },
});
if(currentUser?.username === result.data){
    return {error:"같은 닉네임으로는 변경 할 수 없습니다."}
}
    await db.user.update({
        where:{id:session.id},
        data:{username:result.data}
    })
    redirect("/profile/")
}