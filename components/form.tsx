"use client"

import { changeStatus } from "@/app/product/[id]/action"
import { ProductStatus } from "@/lib/constants"
import { useTransition } from "react"

interface Props{
  currentStatus: ProductStatus
  productId: number
  isOwner: boolean
}

export default function StatusChanger({currentStatus,productId,isOwner,}:Props) {
  const [, startTransition] = useTransition()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ProductStatus
    startTransition(() => {
      changeStatus(productId, newStatus)
    })
  }

  if (!isOwner) return null

  return (
    <select
      defaultValue={currentStatus}
      onChange={onChange}
      className="text-sm text-orange-500 font-semibold pr-6 pl-2 py-1.5 rounded-full"
    >
      <option value={ProductStatus.SALE}>판매중</option>
      <option value={ProductStatus.RESERVED}>예약중</option>
      <option value={ProductStatus.SOLD_OUT}>판매완료</option>
    </select>
  )
}