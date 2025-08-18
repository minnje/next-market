"use server";

import {
     PASSWORD_ERROR,
     PASSWORD_MIN_LENGTH,
     PASSWORD_REGEX,
} from "@/lib/constants";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("potato");

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
               .refine(checkUsername, "포테이토X"),
          email: z.string().email().toLowerCase(),
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

     const result = formSchema.safeParse(data);
     if (!result.success) {
          console.log(result.error);

          return result.error.flatten();
     } else {
          console.log(result.data);
     }
}
