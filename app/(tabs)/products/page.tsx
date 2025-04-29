import ListProduct from "@/components/list-product";
import db from "@/lib/db";

async function getProducts(){
  let products = await db.product.findMany({
       select:{
           title:true,
           price:true,
           created_at:true,
           photo:true,
           id:true,
       }
  });

  if (products.length === 0) {
    await db.product.create({
      data: {
        title: "고구마",
        price: 9999,
        photo: "/goguma.jpg",
        description: "악마",
        user: {
          connect: { id: 1 }
        }
      }
    });

    // 다시 가져오기
    products = await db.product.findMany({
       select:{
           title:true,
           price:true,
           created_at:true,
           photo:true,
           id:true,
       }
    });
  }

  return products;
}




export default async function Product(){
    const products = await getProducts();
    return(
  
        <div className="p-5 flex flex-col gap-5">
           {products.length === 0 ? (
        <p className="text-gray-500 text-center">등록된 상품이 없습니다.</p>
      ) : (
        products.map((product) => (
          <ListProduct key={product.id} {...product} />
        ))
      )}
        </div>
    )
}