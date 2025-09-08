"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likePost = async (postid: number) => {
     const session = await getSession();
     try {
          await db.like.create({
               data: {
                    postid,
                    userid: session.id!,
               },
          });
          revalidateTag(`like-status-${postid}`);
     } catch (e) {}
};

export const dislikePost = async (postid: number) => {
     try {
          const session = await getSession();
          await db.like.delete({
               where: {
                    id: {
                         postid,
                         userid: session.id!,
                    },
               },
          });
          revalidateTag(`like-status-${postid}`);
     } catch (e) {}
};
