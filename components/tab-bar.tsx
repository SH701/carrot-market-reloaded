"use client"

import { HomeIcon as SolidHomeIcon ,
    NewspaperIcon as SolidNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon, 
    VideoCameraIcon as SolidVideoCameraIcon,
    UserIcon as SolidUserIcon,
    PlusIcon,
  } from "@heroicons/react/24/solid";
import { HomeIcon as OutlineHomeIcon ,
    NewspaperIcon as OutlineNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
    VideoCameraIcon as OutlineVideoCameraIcon,
    UserIcon as OutlineUserIcon, 
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar(){
    const pathname = usePathname();

    return (
        <div className=" fixed left-1/2 transform -translate-x-1/2 bottom-0 grid grid-cols-5 
        w-full max-w-md border-t border-neutral-600 px-5 py-3 *:text-white bg-neutral-800 ">
        <Link className="fixed bottom-24 right-4 w-10 h-10 bg-orange-500 
          rounded-full transition-colors hover:bg-orange-400" 
          href="/add">
            <PlusIcon className="size-18 text-white"/>
          </Link>
            <Link href="/home" className="tab">
            {pathname ==="/home" ?
                <SolidHomeIcon className="w-7 h-7"/>: 
                <OutlineHomeIcon className="w-7 h-7"/>}
                <span>홈</span>
            </Link>
            <Link href="/life" className="tab">
                {pathname ==="/life" ? 
                <SolidNewspaperIcon className="w-7 h-7"/>: 
                <OutlineNewspaperIcon className="w-7 h-7"/>}
                <span>동네생활</span>
            </Link>
            <Link href="/chats" className="tab">
            {pathname ==="/chats" ? 
                <SolidChatIcon className="w-7 h-7"/>: 
                <OutlineChatIcon className="w-7 h-7"/>}
                <span>채팅</span>
            </Link>
            <Link href="/live" className="tab">
            {pathname ==="/live" ? 
                <SolidVideoCameraIcon  className="w-7 h-7"/>: 
                <OutlineVideoCameraIcon  className="w-7 h-7"/>}
                <span>쇼핑</span>
            </Link>
            <Link href="/profile" className="tab">
            {pathname ==="/profile" ? 
                <SolidUserIcon  className="w-7 h-7"/>: 
                <OutlineUserIcon  className="w-7 h-7"/>}
                <span>프로필</span>
            </Link>
        </div>
    )
}