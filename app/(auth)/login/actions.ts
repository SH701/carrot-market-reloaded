"use server";
import { PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import {z} from "zod"
import bcrypt from "bcrypt"
import { LoginSession } from "@/lib/session";
import { redirect } from "next/navigation";


const checkemailExist=async(email:string)=>{
  const user = await db.user.findUnique({
    where:{
      email,
    },
    select:{
      id:true,
    }
  })
  return Boolean(user)
}

const formSchema = z.object({
  email:z.string().email().toLowerCase().refine(checkemailExist,"Emial does not exist."),
  password: z.string()
  .min(PASSWORD_MIN_LENGTH)
  .regex(PASSWORD_REGEX,PASSWORD_ERROR),
})
 
 export async function login(prevState: unknown, formData: FormData) {
    const data = {
      email:formData.get("email"),
      password:formData.get("password")
    }
    const result = await formSchema.safeParseAsync(data)
    if(!result.success){
      return result.error.flatten()
    }else{
      const user = await db.user.findUnique({
        where:{
          email:result.data.email
        },
        select:{
          id:true,
          password:true,
        }
      })
      const ok = await bcrypt.compare(
        result.data.password, 
        user!.password ?? "Error"
      );
      if(ok){
        await  LoginSession({ id: user!.id })
        redirect("/profile")
      }else{
        return {
          fieldErrors:{
            email:["Wrong email"],
            password:["Wrong password."],
          }
        }
      }
    }
 }