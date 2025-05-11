import { getAvatar, getUserProduct } from "./actions"
import Image from "next/image"
import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import ProduceProfile from "@/components/product-status"

export default async function SoldPage({ params }: { params: { id: string } }) {
  const userId = Number(params.id)
  const avatar = await getAvatar(userId);
  const userProduct = await getUserProduct(userId);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <Link href="/profile">
            <ArrowLeftIcon className="size-7" />
        </Link>
        </div>
        <div className="*:ml-auto mr-5">
      {avatar ? (
          <Image
            src={avatar}
            alt="아바타"
            width={48}
            height={48}
            className="rounded-full "
          />
        ) : (
          <UserIcon className="w-12 h-12 bg-neutral-500 rounded-full" />
        )}
        </div>
      <h1 className="text-lg font-bold mb-4">나의 판매내역</h1>
      <Link href="/posts/add"
        className="w-20 h-10 bg-white font-semibold rounded-2xl flex items-center justify-center text-md">
        글쓰기
    </Link>
    <div className="border-t border-t-gray-500 pt-3 mt-5">
      <ProduceProfile userProduct={userProduct}/>
      </div>
    </div>
  )
}
