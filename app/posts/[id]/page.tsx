import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getLikeStatus(postid: number) {
     const session = await getSession();
     const isLiked = await db.like.findUnique({
          where: {
               id: {
                    postid,
                    userid: session.id!,
               },
          },
     });
     const likeCount = await db.like.count({
          where: {
               postid,
          },
     });
     return {
          likeCount,
          isLiked: Boolean(isLiked),
     };
}

async function getPost(id: number) {
     try {
          const post = await db.post.update({
               where: { id },
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
                    _count: {
                         select: {
                              comments: true,
                         },
                    },
               },
          });
          return post;
     } catch (e) {
          return null;
     }
}

const getCashedPost = nextCache(getPost, ["post-detail"], {
     tags: ["post-detail"],
     revalidate: 60,
});

function getCashedLikeStatus(postid: number) {
     const cashedLikeStatus = nextCache(
          getLikeStatus,
          ["product-like-status"],
          {
               tags: [`like-status-${postid}`],
          }
     );
     return cashedLikeStatus(postid);
}

export default async function PostDetail({
     params,
}: {
     params: { id: string };
}) {
     const id = Number(params.id);
     if (isNaN(id)) {
          return notFound();
     }
     const post = await getCashedPost(id);
     if (!post) {
          return notFound();
     }

     const { likeCount, isLiked } = await getCashedLikeStatus(id);
     return (
          <div className="p-5 text-white">
               <div className="flex items-center gap-2 mb-2">
                    <Image
                         width={28}
                         height={28}
                         className="size-7 rounded-full"
                         src={post.user.avatar!}
                         alt={post.user.username}
                    />
                    <div>
                         <span className="text-sm font-semibold">
                              {post.user.username}
                         </span>
                         <div className="text-xs">
                              <span>
                                   {formatToTimeAgo(post.created_at.toString())}
                              </span>
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
                    <LikeButton
                         isLiked={isLiked}
                         likeCount={likeCount}
                         postId={id}
                    />
               </div>
          </div>
     );
}
