import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Route {
  [key: string]: boolean;
}

const publicUrls: Route = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start":true,
  "/github/complete":true,
  "/kakao/start":true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url)); 
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url)); 
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
