"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";


export async function increaseView(id: number) {
    await db.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    revalidateTag("post-detail");
  }

export async function getPost(id: number) {
        const post = await db.post.update({
          where: {
            id,
          },
          data: {
            views: {
              increment: 1,
            },
          },
          include: {
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
            comments: {
              select: {
                id: true,
                payload: true,
                userId: true,
                created_at: true,
                user: {
                  select: {
                    avatar: true, 
                    username: true, 
                  },
                },
              },
            },
            _count: {
              select: {
                comments: true,
              },
            },
          },
        });
        console.log("getPost by ID : ", id);
        console.log(post.comments);
        return post;
      }


export const getCachedPost = nextCache(
  getPost,
  [],
  { tags: ["post-detail"]}
);
async function getLikeStatus(sessionId: number, postId: number) {
  const liked = await db.like.findUnique({
    where: { id: { postId, userId: sessionId } },
  });
  const likeCount = await db.like.count({ where: { postId } });
  return {
    isLiked: Boolean(liked),
    likeCount,
  };
}
export const getCachedLikeStatus = nextCache(
  getLikeStatus,
  [],
  { tags: ["like-status"] }
);

export async function likePost(postId:number) {
  const session = await getSession();
  await db.like.create({ data: { postId, userId: session.id! } });
  revalidateTag("like-status");
}

export async function dislikePost(postId: number) {
  const session = await getSession();
  await db.like.delete({ where: { id: { postId, userId: session.id! } } });
  revalidateTag("like-status");
}
export async function createComment(payload: string, postId: number) {
    const session = await getSession();
    if (!session.id) return;
    const newComment = await db.comment.create({
      data: {
        userId: session.id,
        payload,
        postId: postId,
      },
    });
    revalidateTag(`comments-${postId}`);
    return newComment;
  }
  export async function getComments(postId: number) {
    const comments = await db.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: { username: true, avatar: true },
        },
      },
    });
    return comments;
  }

export async function getCachedComments(postId: number) {
    const cachedComments = nextCache(getComments, ["comments"], {
        tags: [`comments-${postId}`],
    });
    return cachedComments(postId);
}
export async function deleteComments(commentId:number,postId:number){
  const session = await getSession();
  if(!session.id) return;
  await db.comment.deleteMany({
    where:{
      id:commentId,
      userId:session.id
    },
  })
  revalidateTag(`comments-${postId}`)
}
