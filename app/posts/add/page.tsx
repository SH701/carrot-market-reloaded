"use client";

import { useFormState } from "react-dom";
import { addPost } from "./actions"; // 서버 액션 import

export default function AddPostPage() {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className="p-5  flex flex-col gap-4">
      <h1 className="text-center text-xl p-2">우리 동네 생활 이야기를 들려주세요 😊</h1>
      <h1> 제목을 입력하세요.</h1>
      <input
        type="text"
        name="title"
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        required
      />
      <h1>내용을 입력하세요.</h1>
      <textarea
        name="description"
        className="mt-2 bg-transparent rounded-md w-full h-40 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        required
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
      >
        작성하기
      </button>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
