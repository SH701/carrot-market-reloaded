import { notFound } from "next/navigation";
import { getProduct } from "../action";
import { editProduct } from "@/app/product/[id]/edit/actions"
import Input from "@/components/input";
import Button from "@/components/button";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <form action={editProduct} className="flex flex-col gap-5 p-5  ">
      <input type="hidden" name="id" value={product.id} />
      {product.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.photo}
          alt="현재 상품 사진"
          className="object-cover"
        />
        )}
      <Input
        name="title"
        defaultValue={product.title}
      />
      <Input
        name="price"
        type="number"
        defaultValue={product.price}
      />
      <Input
        name="description"
        defaultValue={product.description}
      />
      <Button text="수정 완료"/>
    </form>
  );
}
