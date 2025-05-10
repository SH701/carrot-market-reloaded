"use server"

import { Vonage } from "@vonage/server-sdk";
import { Auth } from "@vonage/auth";
import {z} from "zod"
import validator from "validator";
import db from "@/lib/db";
import { LoginSession } from "@/lib/session";
import { redirect } from "next/navigation";
import crypto from "crypto";



async function tokenExists(token:number){
    const exist = await db.sMSToken.findUnique({
        where:{
            token:token.toString()
        },
        select:{
            id:true
        }
    })
    return Boolean(exist)
}

const PhoneSchema = z.string().trim().refine((val) => validator.isMobilePhone(val, "ko-KR"), {
    message: "Wrong Phone number!",
  });
const tokenSchema = z.coerce.number().min(100000).max(999999).refine(tokenExists,"This token does not exist.");

interface ActionState{
    token:boolean;
}

async function getToken(){
    const token =  crypto.randomInt(100000,999999).toString()
    const exists = await db.sMSToken.findUnique({
        where:{
            token,
        },
        select:{
            id:true,
        }
    })
    if(exists){
        return getToken();
    }else{
        return token
    }
}

export async function loginSMS(prevState:ActionState,formData:FormData){
    const phone = formData.get("phone");
    const token = formData.get("token");

    if(!prevState.token){
        const result = PhoneSchema.safeParse(phone)
        if(!result.success){
            return {
                token:false,
                error:result.error.flatten()
            }
        }else{
            await db.sMSToken.deleteMany({
                where:{
                    user:{
                        phone:result.data
                    }
                },
            })
            const token = await getToken();
            await db.sMSToken.create({
                data:{
                    token,
                    user:{
                        connectOrCreate:{
                           where:{
                            phone:result.data
                           },
                           create:{
                            username:crypto.randomBytes(10).toString("hex"),
                            phone:result.data,
                           }
                        }
                    }
                }
            });
            const credentials = new Auth({
                apiKey: process.env.VONAGE_API_KEY,
                apiSecret: process.env.VONAGE_API_SECRET,
                });
                
                const vonage = new Vonage(credentials);
                await vonage.sms
                .send({
                to: process.env.MY_PHONE_NUMBER!,
                //to: result.data,
                from: process.env.VONAGE_SMS_FROM!,
                text: `Your Karrot verification code is: ${token}`,
                })
            return{
                token:true,
            }
        }
    }else{
        const result = await tokenSchema.safeParseAsync(token)
        if(!result.success){
            return {
                token:true,
                error:result.error.flatten()
            }
        }else {
            const token = await db.sMSToken.findUnique({
                where:{token:result.data.toString()},
                select:{id:true,userId:true,}
            })
            await LoginSession({ id: token!.userId });
            await db.sMSToken.delete({
                where:{id:token!.id}
            })
           redirect("/profile")
        }
    }
}