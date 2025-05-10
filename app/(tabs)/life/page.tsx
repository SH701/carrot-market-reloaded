import db from "@/lib/db";
import { formatToTime } from "@/lib/utils";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
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
    </div>
  );
}
