import Link from "next/link";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { getUserProfile } from "./actions";
import Image from "next/image";
import EditForm from "@/components/editform";


export default async function editProfile() {
  const user = await getUserProfile();

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-row gap-2.5">
        <Link href="/profile">
          <XMarkIcon className="text-white size-7" />
        </Link>
        <h1 className="ml-32">프로필 수정</h1>
      </div>
      <div className="flex items-center justify-center pt-10">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            width={96}
            height={96}
            alt="user avatar"
            className="rounded-full"
          />
        ) : (
          <UserIcon className="w-24 h-24 rounded-full bg-neutral-500" />
        )}
      </div>
      <EditForm />
    </div>
  );
}
