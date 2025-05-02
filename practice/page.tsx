import { getInitialProducts } from "./actions";
import ProductList from "./productlist";




export async  function Page(){
    const product = await getInitialProducts()
    return(
       <ProductList initialProduct={product}/>
    )
}