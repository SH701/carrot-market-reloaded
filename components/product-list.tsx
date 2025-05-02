"use client"

import { InitialProducts } from "@/app/(tabs)/products/page"
import ListProduct from "./list-product"
import { useEffect, useRef, useState } from "react"
import { getMoreProducts } from "@/app/(tabs)/products/actions"

interface ProductListProps{
    initialproducts:InitialProducts
}



export default function ProductList({initialproducts}:ProductListProps){
    const [products,setProducts] = useState(initialproducts)
    const [isLoading,setIsLoading] = useState(false)
    const [page,setPage] = useState(2);
    const [isLastPage,setIsLastPage] = useState(false);
    const trigger = useRef<HTMLSpanElement>(null);
    useEffect(()=>{
        const observer = new IntersectionObserver(
        async (entries:IntersectionObserverEntry[],
            observer:IntersectionObserver)=>{
                const element = entries[0];
                if(element.isIntersecting && trigger.current){
                    observer.unobserve(trigger.current)
                    setIsLoading(true);
                    const newProducts = await getMoreProducts(page+1);
                    if(newProducts.length!==0){
                        setPage((prev)=>prev+1);
                        setProducts(prev => [...prev, ...newProducts])
                    }else{
                        setIsLastPage(true)
                    }
                    setIsLoading(false)
                }
            },{
                threshold:1.0
            }
        );
        if(trigger.current){
            observer.observe(trigger.current)
        }
        return () =>{
            observer.disconnect();
        }
    },[page])
    return(
        <div className="px-5 flex flex-col">
               {products.length === 0 ? (
            <p className="text-gray-500 text-center">등록된 상품이 없습니다.</p>
        ) : (
            products.map((product) => (
              <ListProduct key={product.id} {...product} />
            ))
        )}  <span
            ref={trigger}
            className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2
            rounded-md hover:opacity-90 active:scale-95">
            {isLoading ? "Loading..." : "Load more"}
            </span>
        </div>
    )
}

