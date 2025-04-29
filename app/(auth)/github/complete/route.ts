import db from "@/lib/db";
import { accessTokenGithub , getUserEmailGithub, getUserProfileGithub } from "@/lib/githubAuth";
import { LoginSession } from "@/lib/session";
import { makeRandomUsername } from "@/lib/username";
import { redirect } from "next/navigation";
import { NextRequest,NextResponse } from "next/server";

async function generateAvailableUsername(baseUsername: string): Promise<string> {
    const maxTries = 10;
    let tries = 0;
  
    while (tries < maxTries) {
      const newUsername = makeRandomUsername(baseUsername); 
      const existingUser = await db.user.findUnique({
        where: {
          username: newUsername,
        },
        select: {
          id: true,
        },
      });
     if(!existingUser){
        return newUsername
     }else{
        tries++;
     }
    }
    throw new Error("Cannot generate available username, please try manually.");
  }
  

export async function GET(request:NextRequest){
    const code = request.nextUrl.searchParams.get("code")
    if(!code){
        return NextResponse.json({error:"Not code"},{status:400})
    }
    const {error,access_token} = await accessTokenGithub (code);
    if(error){
        return new NextResponse(null,{
            status:400
        })
    }
    const {id,avatar_url,login} = await getUserProfileGithub(access_token);
    const {email} = await getUserEmailGithub(access_token);

    const user = await db.user.findUnique({
        where:{github_id:id+"",},
        select:{id:true,}
    });
    if(user){
        return LoginSession(user)
    }
    const ename = await db.user.findUnique({
        where:{email},
        select:{id:true},
    })
    if(ename){
        return NextResponse.json({
            error:"Email is already registerd."
        },{status:400})
    }
    const finalUsername = await generateAvailableUsername(login);
    const newUser= await db.user.create({
        data:{
            username:finalUsername,
            github_id:id+"",
            avatar:avatar_url,
            email:email,
        },
        select:{id:true},
    })
    await LoginSession(newUser)
    redirect ("/profile")
}