import { getInitialProducts } from "./action2";

export default function Page(){
    const product = getInitialProducts();
    return(
        <div>
            {product.map(index)=>{
                
            }}
        </div>
    )
}