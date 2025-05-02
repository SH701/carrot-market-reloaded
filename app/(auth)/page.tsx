import Link from "next/link";
import "@/lib/db"

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-between
   min-h-screen">
    <div className="my-auto *:font-medium flex flex-col items-center gap-2">
      <span className="text-9xl">🥕</span>
      <h1 className="text-5xl">안녕!</h1>
      <h2 className="text-xl">당근 마켓에 어서오세요!</h2>
    </div>
    <div className="flex flex-col items-center gap-3 w-full px-6">
      <Link href="/create-account"
      className="btn py-2.5 text-lg">시작하기</Link>
      <div className="flex gap-2 mb-4">
        <span>이미 계정이 있나요?</span>
        <Link href="/login" className="hover:underline underline-offset-4">로그인</Link>
      </div>
    </div>
   </div>
  );
}
