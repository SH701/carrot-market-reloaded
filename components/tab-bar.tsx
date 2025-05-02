"use client"

import { HomeIcon as SolidHomeIcon ,
    NewspaperIcon as SolidNewspaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon, 
    VideoCameraIcon as SolidVideoCameraIcon,
    UserIcon as SolidUserIcon,
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
        <div className="fixed bottom-0 grid grid-cols-5 border-t 
            border-neutral-600 px-5 py-3 *:text-white bg-neutral-800">
            <Link href="/products" className="tab">
            {pathname ==="/products" ?
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