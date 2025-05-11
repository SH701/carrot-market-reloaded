"use client"

import {HeartIcon as SolidHeartIcon} from "@heroicons/react/24/solid"
import {HeartIcon as OutlineHeartIcon} from "@heroicons/react/24/outline"
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/posts/[id]/actions";

interface LikeButtonProps{
    isLiked:boolean;
    likeCount:number;
    postId:number;
}

export default function LikeButton({isLiked,likeCount,postId}:LikeButtonProps){
    const [state, reducerFn] = useOptimistic(
        { isLiked, likeCount },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (previousState, payload) => ({
          isLiked: !previousState.isLiked,
          likeCount: previousState.isLiked
            ? previousState.likeCount - 1
            : previousState.likeCount + 1,
        })
      );
      const onClick = async () => {
        reducerFn(undefined);
        if (isLiked) {
          await dislikePost(postId);
        } else {
          await likePost(postId);
        }
      };
    return(
        <button
        onClick={onClick}
          className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
            state.isLiked
              ? "bg-orange-500 text-white border-orange-500"
              : "hover:bg-neutral-800"
          }`}>
            {state.isLiked ? (
            <SolidHeartIcon className="size-5" />
          ) : (
            <OutlineHeartIcon className="size-5" />
          )}
          {state.isLiked ? (
            <span> {state.likeCount}</span>
          ) : (
            <span>{state.likeCount}</span>
          )}
          </button>
    )
}