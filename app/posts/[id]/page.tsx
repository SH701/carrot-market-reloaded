import { formatToTime } from "@/lib/utils";
import { EyeIcon,UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import getSession from "@/lib/session";
import { deletePost, getCachedLikeStatus, getCachedPost, increaseView } from "./actions";
import LikeButton from "@/components/like-button";
import CommentSection from "@/components/commentsection";
import Link from "next/link";





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
      <>
       <div>
            <Link className="text-white font-bold px-4 text-lg" href="/life">←</Link>
        </div> 
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
            <Link href={`/profile/${post.user.id}`} className="text-white text-sm font-semibold">{post.user.username}</Link>
            <div className="text-xs">
              <span>{formatToTime(post.created_at.toString())}</span>
            </div>
          </div>
          <div className="ml-auto flex flex-row gap-4">
            <Link href={`/posts/${post.id}/edit`} className="text-sky-500">수정</Link>
           <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <button type="submit" className="text-red-500">삭제</button>
           </form>
          </div>
        </div>
        <h2 className="text-xl font-semibold py-5">{post.title}</h2>
        <p className="mb-2">{post.description}</p>
        <div className="flex flex-col gap-5 items-start pt-2">
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <EyeIcon className="size-5" />
            <span>조회 {post.views}</span>
          </div>
            <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id}/>
        </div>
          <CommentSection postId={post.id}/>
      </div>
      </>
    );
  }