import { formatToTime } from "@/lib/utils";
import { EyeIcon,UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import getSession from "@/lib/session";
import { getCachedLikeStatus, getCachedPost, increaseView } from "./actions";
import LikeButton from "@/components/like-button";
import CommentSection from "@/components/commentsection";


export default async function PostDetail({params}: {params: { id: string }}) {
  const id = Number(params.id);
  if (isNaN(id)) {return notFound();}
  await increaseView(id)
  const post = await getCachedPost(id);
  if (!post) return notFound();
  const session = await getSession();
  const sessionId = session?.id ?? 0;
  const { likeCount, isLiked } = await getCachedLikeStatus(sessionId, id);
  
    return (
      <div className="p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
        {post.user.avatar ? (
          <Image
          width={40}
          height={40}
          className="size-7 rounded-full"
          src={post.user.avatar}
          alt={post.user.username}
          />) : (
          <UserIcon className="size-10 text-neutral-400 bg-neutral-800 rounded-full p-1 mr-1" />
          )}
          <div>
            <span className="text-sm font-semibold">{post.user.username}</span>
            <div className="text-xs">
              <span>{formatToTime(post.created_at.toString())}</span>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="mb-5">{post.description}</p>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <EyeIcon className="size-5" />
            <span>조회 {post.views}</span>
          </div>
            <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id}/>
        </div>
          <CommentSection postId={post.id}/>
      </div>
    );
  }