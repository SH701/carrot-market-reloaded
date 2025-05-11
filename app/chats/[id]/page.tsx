import { getRoom, getUserProfile } from "@/app/(tabs)/chats/actions"
import ChatMessage from "@/components/chat-message";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { getMessage } from "./actions";
import Link from "next/link";


export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessage>

export default async function ChatRoom({params}:{params:{id:string}}){
    const room = await getRoom(params.id)
    if(!room){
        return notFound();
    }
    const session = await getSession();
    const initialmessages = await getMessage(params.id,session.id!);    
    const user = await getUserProfile();
    if(!user){
        return notFound();
    }
    return(
        <>
        <div>
            <Link className="text-white font-bold px-4 text-lg" href="/chats">←</Link>
        </div> 
        <ChatMessage 
        chatRoomId={params.id} 
        userId={session.id} 
        username={user.username}
        avatar={user.avatar!}
        initialmessages={initialmessages}
        />
        </>
    )
}