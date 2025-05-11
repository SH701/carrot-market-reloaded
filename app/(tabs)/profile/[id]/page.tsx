import Link from "next/link";

import Image from "next/image"
import { ArrowRightIcon, UserIcon } from "@heroicons/react/24/solid";
import {ClipboardDocumentListIcon,PencilIcon,BookOpenIcon} from"@heroicons/react/24/outline"
import getSession from "@/lib/session";
import { getUser } from "./actions";
import { Logout } from "@/app/(tabs)/profile/actions";

export default async function Profile({ params }: { params: { id: string } }) {
   const userId = Number(params.id);
  const user = await getUser(userId);
  const session = await getSession();
  return(
    <>
    <div className="px-4 py-8 space-y-8">
    <div className="border-2 rounded-lg p-5 flex flex-row gap-3 ">
      {user?.avatar ? (
          <Image src={user?.avatar} width={40} height={40} alt="user avatar" className="rounded-full" />
        ) : (
          <UserIcon className="size-10 rounded-full bg-neutral-500"/>
        )}
        <h1 className="pt-2">{user?.username}</h1>
        {user?.id === session.id && (
        <Link href={`/profile/edit`} className="ml-auto mr-5 pt-2">
          <ArrowRightIcon className="size-5 text-white"/>
         </Link>
        )}
        </div>
        <div className="border-2 rounded-lg p-5 grid grid-cols-3">
          <Link href={`/product`} className="text-white flex flex-col items-start pl-10">
            <ClipboardDocumentListIcon className="size-8 ml-1" />
           <p className="text-xs tracking-tighter">판매 내역</p>
          </Link>
          <Link href={`/life`} className="text-white flex flex-col items-start pl-10">
            <PencilIcon className="size-8 ml-1" />
            <p className="text-xs tracking-tighter">게시글 보기</p>
          </Link>
          <Link href={`/review`} className="text-white flex flex-col items-start pl-10">
            <BookOpenIcon className="size-8 ml-1" />
            <p className="text-xs tracking-tighter">리뷰 보기</p>
          </Link>
        </div>
         {user?.id === session.id && (
        <form action={Logout}>
          <button>😣 로그아웃</button>
        </form>
      )}
        </div>
    </>
)};
