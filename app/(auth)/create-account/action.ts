"use server"
import { PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import {z} from "zod";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { LoginSession } from "@/lib/session";
import { redirect } from "next/navigation";


const checkPassword = ({password,confirm_password}:
    {password:string,confirm_password:string})=>password === confirm_password

const formSchema = z.object({
    username : z.string({
        invalid_type_error:"Username must be a string",
        required_error:"Where is username?"
    }).trim(),
    email : z.string().email("이메일 형식을 입력해주세요.").nonempty("이메일을 입력해주세요."),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX,PASSWORD_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH).nonempty()
})
.superRefine(async ({username},ctx)=>{
    const user = await db.user.findUnique({
        where:{
            username
        },
        select:{
            id:true,
        }
    })
    if(user){
        ctx.addIssue({
            code:"custom",
            message:"This username is already taken",
            path:["username"],
            fatal:true
        });
    }
})
.superRefine(async ({email},ctx)=>{
    const user = await db.user.findUnique({
        where:{
            email
        },
        select:{
            id:true,
        }
    })
    if(user){
        ctx.addIssue({
            code:"custom",
            message:"This email is already taken",
            path:["email"],
            fatal:true
        });
    }
})
.refine(checkPassword,{
    message:"Both passwords should be the same!",
    path:["confirm_password"]
});


export async function createAccount(prevState:unknown,formData:FormData){
    console.log(cookies())
    const data = {
        username :formData.get("username"),
        email :formData.get("email"),
        password :formData.get("password"),
        confirm_password :formData.get("confirm_password"),
    };
   const result = await formSchema.safeParseAsync(data)
   if(!result.success){
    console.log(result.error.flatten())
    return (result.error.flatten())
   }else{
    const hashPassword = await bcrypt.hash(result.data.password,12);
    const user = await db.user.create({
        data:{
            username: result.data.username,
            email: result.data.email,
            password: hashPassword,
        },
        select:{
            id:true,
        }
    })
    await LoginSession(user);
    redirect("/profile")
   }
}