// app/components/ListProduct.tsx
import Link from "next/link";
import Image from "next/image";

interface ListProductProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  created_at: Date;
}

export default function ListProduct({id,title,price,photo,created_at,}: ListProductProps) {
  return (
    <Link href={`/product/${id}`} className="flex gap-5">
        <div className="relative size-28 rounded-md overflow-hidden">
            <Image src={photo} alt={title} width={200} height={200}/>
        </div>
        <div className="flex flex-col gap-1 *:text-white">
            <span className="text-lg">{title}</span>
            <span className="text-sm text-neutral-500">{created_at.toString()}</span>
            <span className="text-lg font-semibold">{price}</span>
        </div>
    </Link>
  );
}
