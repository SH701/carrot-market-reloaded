"use server"

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function DeletePro(formData: FormData){
    const id = formData.get("id");
    await db.product.delete({
      where: {
        id: Number(id),
      },
    });
    redirect("/products");
  };