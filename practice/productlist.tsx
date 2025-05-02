"use client";

import { useEffect, useRef, useState } from "react";

interface Product{
    id: number,
    title: string,
    price: number,
    created_at: Date,
    photo: string,
}

interface Props {
  initialProduct: Product[];
}

export default function ProductList({ initialProduct }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProduct);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const trigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMoreProducts = async () => {
      const lastProduct = products[products.length - 1];
      const cursor = lastProduct?.id;

      try {
        const res = await fetch(`/api/products?cursor=${cursor}`);
        const data = await res.json();

        if (data.products.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }
      } catch (error) {
        console.error("상품 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading && hasMore) {
        setIsLoading(true);
        getMoreProducts();
      }
    });

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => observer.disconnect();
  }, [products, isLoading, hasMore]);

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.price}원</p>
        </div>
      ))}
      {hasMore ? (
        <div ref={trigger} style={{ height: 1 }} />
      ) : (
        <p className="text-center py-4 text-gray-500">
          모든 상품을 불러왔습니다.
        </p>
      )}
    </div>
  );
}
