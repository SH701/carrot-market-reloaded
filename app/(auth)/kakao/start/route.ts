import { NextResponse } from "next/server"

export function GET(){
    const params ={
        client_id:process.env.KAKAO_REST_API_KEY!,
        redirect_uri:process.env.KAKAO_REDIRECT_URI!,
        response_type:"code",
    }
    const formattingParams = new URLSearchParams(params).toString()
    const finalURL = `https://kauth.kakao.com/oauth/authorize?${formattingParams}`
    return NextResponse.redirect(finalURL)
}