import { notFound } from "next/navigation";
import {UserIcon} from "@heroicons/react/24/solid"
import Link from "next/link";
import { formatToWon } from "@/lib/utils";
import Image from "next/image";
import {DeletePro, getIsOwner, getProduct, getProductTitle} from "../[id]/action"
import { getPrevNextProducts } from "@/lib/product";
import { unstable_cache as nextCache } from "next/cache";

const getProductCache = nextCache(
    getProduct,["product-detail"],{tags:["product-detail"]}
)
const getProductTitleCache = nextCache(
    getProductTitle,["product-title"],{tags:["product-title"]}
)
export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProductTitleCache(Number(params.id));
    return {
      title: product?.title,
    };
  }
  
export default async function ProductDetail({params}:{
    params:{id:string}
}) {
    const id = Number(params.id)
    if(isNaN(id)){
        return notFound()
    }
    const product = await getProductCache(id);
    if (!product) {
        return notFound();
      }
    const imageId = product.photo.split("/")[4]; 
    const { prev: prevProduct, next: nextProduct } = await getPrevNextProducts(product.created_at);
    if(!product){
        return notFound();
    }
    const IsOwner = await getIsOwner(product.userId)
    return (
        <div>
           <div className="flex justify-between">
           <Link
                href={prevProduct ? `/product/${prevProduct.id}` : `/home`}
                className="font-bold text-white"
            >←</Link>
            <Link
                href={nextProduct ? `/product/${nextProduct.id}` : `/home`}
                className="font-bold text-white"
            >→</Link>
        </div>
        <div className="relative aspect-square">
        <Image
            className="object-cover"
            src={`https://imagedelivery.net/xHXPv5JYLiY7OumYcVqQRA/${imageId}/width=400,height=400`}
            alt={product.title}
           fill
         />
        </div>
        <div className="py-5 px-3 flex items-center gap-3 
        border-b border-neutral-700">
            <div className="size-10 rounded-full ">
                {product.user.avatar ? (
                    <Image
                    src={product.user.avatar}
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="object-cover rounded-full"
                    />
                ) : (
                    <UserIcon/>
                )}
                </div>
            <div >
            <Link href={`/profile/${product.user.id}`}>
                <h3 className="text-white font-semibold">
                    {product.user.username}
                </h3>
            </Link>
            {IsOwner ? (
                    <Link href={`/product/${product.id}/edit`} className="text-red-500">편집하기</Link>
            ):null}
            </div>
        </div>
        <div className="py-3 px-3 pb-24">
            <h1 className="text-2xl font-semibold py-1">{product.title}</h1>
            <p>{product.description}</p>
        </div>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-5 h-13
            bg-neutral-800 flex justify-between items-center w-[90%] max-w-md rounded-lg shadow">
            <span className="font-semibold">{formatToWon(product.price)}원</span>
            <div className="flex items-center gap-2">
            {IsOwner ? (
                <form action={DeletePro}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className="bg-red-500 text-white px-5 py-2.5 rounded-md">삭제하기</button>
                </form>
            ) : null}
            <Link className="bg-orange-500 text-white px-5 py-2.5 rounded-md" href="/chats">채팅하기</Link>
            </div>
        </div>
        </div>
    );
  }
