"use server";

import {
     PASSWORD_ERROR,
     PASSWORD_MIN_LENGTH,
     PASSWORD_REGEX,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUsername = async (username: string) => {
     const user = await db.user.findUnique({
          where: {
               username,
          },
          select: {
               id: true,
          },
     });
     return !Boolean(user);
};

const checkEmail = async (email: string) => {
     const userEmail = await db.user.findUnique({
          where: {
               email,
          },
          select: { id: true },
     });
     return !Boolean(userEmail);
};

const checkPassword = ({
     password,
     confirmPassword,
}: {
     password: string;
     confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
     .object({
          username: z
               .string({
                    invalid_type_error: "username은 문자로 입력해주세요.",
                    required_error: "username을 입력해주세요.",
               })
               .toLowerCase()
               .trim()
               .refine(checkUsername, "사용 중인 username입니다."),
          email: z
               .string()
               .email()
               .toLowerCase()
               .refine(checkEmail, "사용 중인 이메일입니다."),
          password: z
               .string()
               .min(PASSWORD_MIN_LENGTH)
               .regex(PASSWORD_REGEX, PASSWORD_ERROR),
          confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
     })
     .refine(checkPassword, {
          message: "비밀번호 불일치",
          path: ["confirmPassword"],
     });

export async function createAccount(prevState: any, formData: FormData) {
     const data = {
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
          confirmPassword: formData.get("confirmPassword"),
     };

     const result = await formSchema.safeParseAsync(data);
     if (!result.success) {
          return result.error.flatten();
     } else {
          const hashedPassword = await bcrypt.hash(result.data.password, 12);
          const user = await db.user.create({
               data: {
                    username: result.data.username,
                    email: result.data.email,
                    password: hashedPassword,
               },
               select: {
                    id: true,
               },
          });
          const session = await getSession();
          session.id = user.id;
          await session.save();
          redirect("/profile");
     }
}
