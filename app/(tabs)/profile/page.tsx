import Link from "next/link";
import { getUser, Logout } from "./actions"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/24/solid";
import {ClipboardDocumentListIcon,PencilIcon,BookOpenIcon,ArrowRightIcon} from"@heroicons/react/24/outline"

export default async function Profile() {
  const user = await getUser();
  return(
    <>
    <div className="px-4 py-8 space-y-8">
    <div className="border-2 rounded-lg p-5 flex flex-row gap-3 ">
      {user.avatar ? (
          <Image src={user.avatar} width={40} height={40} alt="user avatar" className="rounded-full" />
        ) : (
          <UserIcon className="size-10 rounded-full bg-neutral-500"/>
        )}
        <h1 className="pt-2">{user.username}</h1>
         <Link href={`/profile/edit`} className="ml-auto mr-5 pt-2">
          <ArrowRightIcon className="size-5 text-white"/>
         </Link>
        </div>
        <div className="border-2 rounded-lg p-5 grid grid-cols-3">
          <Link href={`/profile/sold/${user.id}`} className="text-white flex flex-col items-start pl-10">
            <ClipboardDocumentListIcon className="size-8 ml-1" />
           <p className="text-xs tracking-tighter">판매 내역</p>
          </Link>
          <Link href={`/life`} className="text-white flex flex-col items-start pl-10">
            <PencilIcon className="size-8 ml-1" />
            <p className="text-xs tracking-tighter">나의 글</p>
          </Link>
          <Link href={`/profile/review`} className="text-white flex flex-col items-start pl-10">
            <BookOpenIcon className="size-8 ml-1" />
            <p className="text-xs tracking-tighter">나의 리뷰</p>
          </Link>
        </div>
        <form action={Logout}>
            <button>😣 로그아웃</button>
        </form>
        </div>
    </>
)};
