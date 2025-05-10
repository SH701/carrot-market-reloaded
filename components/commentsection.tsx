import { getCachedComments } from "@/app/posts/[id]/actions";
import CommentForm from "./comment-form";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import DeleteButton from "./delete-button";
import getSession from "@/lib/session";



export default async function CommentSection({ postId }: { postId: number }) {
  const comments = await getCachedComments(postId);
  const session = await getSession()

  return (
    <div className="mt-6">
      <CommentForm postId={postId} />
      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-neutral-700 pb-2">
            <div className="flex items-center gap-2 mb-1">
                {comment.user.avatar ? (
                    <Image src={comment.user.avatar} width={24} height={24} alt="User Avatar" className=" rounded-full"/>) 
                    : (<UserIcon className="w-6 h-6"/>)}
              <span className="text-sm text-neutral-300">{comment.user.username}</span>
              <span className="text-xs text-neutral-500">
                {new Date(comment.created_at).toLocaleString()}
              </span>
              <div className="ml-auto mr-6">
              <DeleteButton 
                sessionId={session.id} 
                commentUserId={comment.userId}
                commentId={comment.id}
                postId={postId}
                isDelete={false}/>
                </div>
            </div>
            <p className="ml-8 text-sm">{comment.payload}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
