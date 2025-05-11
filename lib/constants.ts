import { ProductStatus } from "@prisma/client";

export const PASSWORD_MIN_LENGTH=4;
export const PASSWORD_REGEX=new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
  );
export const PASSWORD_ERROR ="A password must have lowercase,UPPERCASR,a number and special characters"
export const ProductStatusLabelMap = {
  [ProductStatus.SALE]: "판매중",
  [ProductStatus.RESERVED]: "예약중",
  [ProductStatus.SOLD_OUT]: "판매완료",
} as const;

export { ProductStatus };
