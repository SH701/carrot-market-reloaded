import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
    const initialproducts = await getInitialProducts();
    return(
        <div className="p-5 flex flex-col gap-5">
          <ProductList initialproducts={initialproducts}/>
        </div>
    )
}