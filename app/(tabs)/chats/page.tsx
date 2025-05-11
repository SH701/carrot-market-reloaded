"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { getUserChatRooms } from "./actions";

export default function Chats() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getUserChatRooms();
      setRooms(data);
      setFiltered(data);
    })();
  }, []);

  useEffect(() => {
    const lower = keyword.toLowerCase();
    const filteredRooms = rooms.filter((room) => {
      const otherUser = room.users.find(
  (u: { id: number; username: string; avatar?: string }) =>
    u.id !== room.messages[0]?.userId
);
      return otherUser?.username?.toLowerCase().includes(lower);
    });
    setFiltered(filteredRooms);
  }, [keyword, rooms]);

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="상대방 이름으로 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white placeholder:text-neutral-400 mb-2"
      />

      {filtered.map((room) => {
       const otherUser = room.users.find(
  (u: { id: number; username: string; avatar?: string }) =>
    u.id !== room.messages[0]?.userId
);
        return (
          <div key={room.id} className="w-full">
            <Link
              className="flex items-center gap-4 bg-neutral-400 p-4 rounded-md"
              href={`/chats/${room.id}`}
            >
              {otherUser?.avatar?(
                <Image
                  src={otherUser.avatar}
                  width={50}
                  height={50}
                  alt="User avatar"
                  className="rounded-full"
                />
              ) : (
                <UserIcon className="bg-neutral-600 w-12 h-12 text-white rounded-full" />
              )}
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold text-black">거래방</p>
                    <h3 className="text-black text-md font-semibold">
                        {otherUser?.username}
                    </h3>
                    <p className="text-gray-700 text-xs font-bold">
                    {room.messages[0]?.payload ?? "채팅을 시작하세요"}
                    </p>
                </div>
                {room._count.messages > 0 && (
                    <span className="text-white bg-red-500 rounded-full text-xs px-2 py-1">
                        {room._count.messages}
                    </span>
                )}
                </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
