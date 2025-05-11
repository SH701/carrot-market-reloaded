'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ProductStatus, ProductStatusLabelMap } from '@/lib/constants';
import { formatToTime, formatToWon } from '@/lib/utils';

interface IProduct {
  id: number;
  photo: string;
  title: string;
  created_at: Date;
  price: number;
  status: keyof typeof ProductStatus;
}

interface IProductProfile {
  userProduct: IProduct[];
}

export default function ProduceProfile({ userProduct }: IProductProfile) {
  const [status, setStatus] = useState<keyof typeof ProductStatus>('SALE');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as keyof typeof ProductStatus);
  };

  const filtered = userProduct.filter((product) => product.status === status);

  return (
    <div className="pt-2">
      <select
        value={status}
        onChange={handleStatusChange}
        className="text-sm text-orange-500 font-semibold pr-6 pl-2 rounded-full"
      >
        {Object.entries(ProductStatusLabelMap).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-4 pt-3">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="flex flex-row gap-5 py-2 *:text-white"
            >
              <div className="relative w-24 h-24">
                <Image
                  src={product.photo}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl">{product.title}</h2>
                <h3 className="text-sm">
                  {formatToTime(product.created_at.toString())}
                </h3>
                <p>{formatToWon(product.price)}원</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-neutral-400 text-sm">해당 상태의 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
