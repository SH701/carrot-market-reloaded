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
        <div className="w-[120px] h-[120px] rounded-md">
        <Image
          width={120}
          height={120}
          src={photo}                     
          alt={title}
          className="object-cover"
          unoptimized                       
        />
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-lg text-white">{title}</span>
            <span className="text-xs text-neutral-500">{formatToTime(created_at.toString())}</span>
            <span className="text-md font-semibold text-white">{formatToWon(price)}원</span>
        </div>
    </Link>
  );
}
