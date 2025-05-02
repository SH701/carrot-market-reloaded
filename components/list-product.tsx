import Link from "next/link";
import Image from "next/image";
import { formatToTime, formatToWon } from "@/lib/utils";

interface ListProductProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  created_at: Date;
}

export default function ListProduct({id,title,price,photo,created_at,}: ListProductProps) {
  return (
    <Link href={`/product/${id}`} className="flex gap-5 ">
        <div className="size-28 rounded-md">
            <Image src={photo} alt={title} width={200} height={200}/>
        </div>
        <div className="flex flex-col gap-1 *:text-white">
            <span className="text-lg">{title}</span>
            <span className="text-sm text-neutral-500">{formatToTime(created_at.toString())}</span>
            <span className="text-lg font-semibold">{formatToWon(price)}원</span>
        </div>
    </Link>
  );
}
