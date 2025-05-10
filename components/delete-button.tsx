"use client"
import { deleteComments } from "@/app/posts/[id]/actions";
import { useOptimistic } from "react";

interface Props{
    isDelete:boolean;
    sessionId:number;
    commentUserId:number;
    commentId:number;
    postId:number;
}

export default function DeleteButton({ sessionId,postId,commentUserId,commentId,isDelete}:Props) {
  if (sessionId !== commentUserId) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [,reducerFn] = useOptimistic(isDelete,()=>true);

  const onClick = async()=>{
    reducerFn(undefined)
    if(!isDelete){
        await deleteComments(commentId,postId);
    }
  }
  return (
    sessionId === commentUserId && (
      <button
        className="text-xs text-neutral-500"
        onClick={onClick}
      >
        삭제
      </button>
    )
  );
  
}