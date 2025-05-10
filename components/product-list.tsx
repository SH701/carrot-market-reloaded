"use client";

import { useEffect, useRef, useState } from "react";
import { InitialProducts } from "@/app/(tabs)/home/page";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/home/actions";

interface ProductListProps {
  initialproducts: InitialProducts;
}

export default function ProductList({ initialproducts }: ProductListProps) {

  const [products, setProducts] = useState(initialproducts);
  const [page, setPage] = useState(1);           
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isLastPage) return; 
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          const nextPage = page + 1;
          const newItems = await getMoreProducts(nextPage);
          if (newItems.length > 0) {
            setProducts((prev) => [...prev, ...newItems]);
            setPage(nextPage);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
    );
    const el = triggerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [page, isLoading, isLastPage]);

  return (
    <div className="px-5 flex flex-col pb-10">
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">등록된 상품이 없습니다.</p>
      ) : (
        products.map((product) => (
          <ListProduct key={product.id} {...product} />
        ))
      )}
      {/* {!isLastPage && (
        <span
          ref={triggerRef}
          className="mx-auto px-4 py-2 bg-orange-500 text-white rounded-md
                     hover:opacity-90 active:scale-95"
        >
          {isLoading ? "Loading..." : "Load more"}
        </span>
      )} */}
    </div>
  );
}
