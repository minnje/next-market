"use server";

import db from "@/lib/db";
import z from "zod";
import bcrypt, { hash } from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = (email: string) => {
     const user = db.user.findUnique({
          where: {
               email,
          },
          select: {
               id: true,
          },
     });
     return Boolean(user);
};

const formSchema = z.object({
     email: z
          .string()
          .email()
          .toLowerCase()
          .refine(checkEmailExists, "해당 이메일이 존재하지 않습니다."),
     password: z.string({ required_error: "비밀번호를 입력하세요." }),
     // .min(PASSWORD_MIN_LENGTH)
     // .regex(PASSWORD_REGEX, PASSWORD_ERROR),
});

export const login = async (prevState: any, formdata: FormData) => {
     const data = {
          email: formdata.get("email"),
          password: formdata.get("password"),
     };

     const result = await formSchema.safeParseAsync(data);
     if (!result.success) {
          return result.error.flatten();
     } else {
          const user = await db.user.findUnique({
               where: {
                    email: result.data.email,
               },
               select: {
                    password: true,
                    id: true,
               },
          });
          const ok = await bcrypt.compare(
               result.data.password,
               user!.password ?? ""
          );
          if (ok) {
               const session = await getSession();
               session.id = user?.id;
               await session.save();
               redirect("/profile");
          } else {
               return {
                    fieldErrors: {
                         password: ["비밀번호가 틀렸습니다."],
                         email: [],
                    },
               };
          }
     }
};
