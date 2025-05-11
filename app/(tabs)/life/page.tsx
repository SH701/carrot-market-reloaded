import db from "@/lib/db";
import { formatToTime } from "@/lib/utils";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image"

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      user:{
        select:{
          username:true,
          avatar:true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return posts;
}

export const metadata = {
  title: "동네생활",
};

export default async function Life() {
  const posts = await getPosts();
  return (
    <div className="p-4 space-y-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="block border border-neutral-800 p-4 rounded-md bg-neutral-900 hover:bg-neutral-800 transition"
        >
          <div className="flex flex-row gap-3 pb-3">
           {post.user?.avatar ? (
          <Image
            src={post.user.avatar}
            width={40}
            height={40}
            alt="user avatar"
            className="rounded-full"
          />
        ) : (
          <UserIcon className="w-10 h-10 text-white rounded-full bg-neutral-500" />
        )}
          <p className="text-white pt-1.5">{post.user.username}</p>
          </div>
          <h2 className="text-white text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-neutral-300 mt-1">{post.description}</p>
          <div className="flex items-center justify-between text-sm mt-3">
            <div className="flex gap-4 items-center text-neutral-400">
              <span>{formatToTime(post.created_at.toString())}</span>
              <span>·</span>
              <span>조회 {post.views}</span>
            </div>
            <div className="flex gap-4 items-center text-neutral-400 *:flex *:gap-1 *:items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
        <div className="flex justify-end mb-4  ">
        <Link
          href="/posts/add"
          className="flex items-center gap-1 p-2 bg-orange-500 hover:bg-orange-400 text-white rounded-md transition"
        >
          <PlusIcon className="size-5" />
          글쓰기
        </Link>
      </div>
    </div>
  );
}
