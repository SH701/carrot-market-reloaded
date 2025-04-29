import { NextResponse } from "next/server";

export function GET() {
  const params = {
    client_id:    process.env.GITHUB_CLIENT_ID!,
    scope:        "read:user,user:email",
    allow_signup: "true",
  };
  const formattingParams = new URLSearchParams(params).toString();
  const finalURL = `https://github.com/login/oauth/authorize?${formattingParams}`;
  return NextResponse.redirect(finalURL);
}
