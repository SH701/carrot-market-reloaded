import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct } from "@/app/product/[id]/action";
import CloseBtn from "@/components/closebtn";

export default async function Modal({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  const imageId = product.photo.split("/")[4];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
        <CloseBtn />
      <div className="relative bg-sky-100 rounded-md overflow-hidden max-w-4xl md:w-full md:h-auto">
        <div className="flex flex-col w-full p-3 items-center md:flex-row md:items-start gap-6">
          <Image
            src={`https://imagedelivery.net/xHXPv5JYLiY7OumYcVqQRA/${imageId}/width=400,height=400`}
            alt={product.title}
            width={120}
            height={120}
            unoptimized
            className="rounded-md object-cover w-60 h-60 md:w-full md:h-auto"
          />          
            <p className="text-base text-gray-800 text-center md:text-left line-clamp-3 md:line-clamp-none md:max-w-md">
              {product.description}
            </p>
        </div>
      </div>
    </div>
  );
}
