import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

export const metadata={
  title:"Home"
}

const getCahedProducts = nextCache(
  getInitialProducts,['home-product'],{tags:['home-product']}
)

async function getInitialProducts(){
  const products = await db.product.findMany({
       select:{
           title:true,
           price:true,
           created_at:true,
           photo:true,
           id:true,
       },
      take:5,
       orderBy:{
        created_at:"desc"
       }
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Product(){
    const initialproducts = await getCahedProducts();
    return(
        <div className="py-3 px-5 flex flex-col gap-3">
          <ProductList initialproducts={initialproducts}/>
        </div>
    )
}