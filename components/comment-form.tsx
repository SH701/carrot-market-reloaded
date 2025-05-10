"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createComment } from "@/app/posts/[id]/actions";

export default function CommentForm({ postId }: { postId: number }) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    startTransition(async () => {
      await createComment(text, postId);
      setText("");
      router.refresh(); 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요"
        className="w-full rounded-lg bg-black border-2 border-neutral-400 
        focus:ring-0 focus:border-neutral-400  text-white px-3 py-2"
      />
      <button
        type="submit"
        className="self-end px-4 py-1 bg-orange-500 text-white rounded"
        disabled={isPending}
      >
        {isPending ? "등록 중..." : "등록"}
      </button>
    </form>
  );
}
