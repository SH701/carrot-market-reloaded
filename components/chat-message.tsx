"use client"

import { InitialChatMessages } from "@/app/chats/[id]/page"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { formatToTime } from "@/lib/utils"
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid"
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { saveMessage } from "@/app/chats/[id]/actions"

const SUPABASE_PUBLIC_KEY=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFocWl5ZHNsZ3Nwd3ZydnV4dWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4ODY4MzMsImV4cCI6MjA2MjQ2MjgzM30.ZGVviZ_hDrQGuPWYPuMtj-ogRBOgBrtX5w_1vblCboo`
const SUPABASE_URL=`https://ahqiydslgspwvrvuxufi.supabase.co`


interface Props{
    initialmessages:InitialChatMessages
    userId:number;
    chatRoomId:string;
    avatar:string;
    username:string;
}

export default function ChatMessage({initialmessages,userId,chatRoomId,avatar,username}:Props){
  const [messages, setMessages] = useState(initialmessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel|null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target: { value },} = event;
    setMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        isRead:false,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          avatar: "xxx",
        },
      },
    ]);
    channel.current?.send({
        type:"broadcast",
        event:"message",
        payload: {
        id: Date.now(),
        payload: message,
        isRead:false,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
  })
  await saveMessage(message,chatRoomId);
    setMessage("");
  };
 useEffect(() => {
  const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
  channel.current = client.channel(`room-${chatRoomId}`);

  channel.current
    .on("broadcast", { event: "message" }, ({ payload }) => {
      // 본인이 보낸 메시지는 무시 (중복 방지)
      if (payload.userId !== userId) {
        setMessages((prevMsgs) => [...prevMsgs, payload]);
      }
    })
    .subscribe();
//markMessagesAsRead(chatRoomId)
  return () => {
    channel.current?.unsubscribe();
  };
}, [chatRoomId, userId]);
    return (
  <>
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end pb-28">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-1 items-stretch ${
            message.userId === userId ? "justify-end" : ""
          }`}
        >
          {/* 내 메시지 시간/상태 */}
          {message.userId === userId && (
            <div className="flex flex-col gap-1 text-right">
              <div
                className="bg-neutral-500 text-white p-2 px-4 text-sm rounded-md"
              >
                {message.payload}
              </div>
              <div className="text-xs text-neutral-400 mt-1 flex justify-end gap-2">
                <span>{message.isRead ? "읽음" : "전송됨"}</span>
                <span>{formatToTime(message.created_at.toString())}</span>
              </div>
            </div>
          )}

          {/* 상대방 메시지 */}
          {message.userId !== userId && (
            <>
              {message.user.avatar ? (
                <Image
                  src={message.user.avatar}
                  alt={message.user.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="size-8 text-white bg-neutral-600 rounded-full" />
              )}
              <div className="flex flex-col">
                <div className="bg-orange-500 text-white p-2 px-4 text-sm rounded-md">
                  {message.payload}
                </div>
                <div className="text-xs text-neutral-300 mt-1 flex gap-2">
                  <span>{message.isRead ? "읽음" : "전송됨"}</span>
                  <span>{formatToTime(message.created_at.toString())}</span>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    <div className="flex items-center justify-center fixed bottom-0 right-0 w-full p-5 bg-neutral-900">
        <form className="flex relative w-full" onSubmit={onSubmit}>
          <input
            required
            onChange={onChange}
            value={message}
            className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
            type="text"
            name="message"
            placeholder="Write a message..."
          />
          <button className="absolute right-1">
            <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
          </button>
        </form>
      </div>
  </>
);
}