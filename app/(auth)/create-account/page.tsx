"use client";

import Input from "@/components/input";
import { createAccount } from "./actions";
import { useActionState } from "react";
import Button from "@/components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
     const [state, dispatch] = useActionState(createAccount, null);
     return (
          <div className="flex flex-col gap-10 py-8 px-6">
               <div className="flex flex-col gap-2 *:font-medium">
                    <h1 className="text-3xl">안녕하세요!</h1>
                    <h2 className="text-xl">가입을 위해 적어주세요.</h2>
               </div>
               <form action={dispatch} className="flex flex-col gap-3">
                    <Input
                         errors={state?.fieldErrors.username}
                         name="username"
                         type="text"
                         required
                         placeholder="이름"
                    />
                    <Input
                         errors={state?.fieldErrors.email}
                         name="email"
                         type="email"
                         required
                         placeholder="이메일"
                    />
                    <Input
                         errors={state?.fieldErrors.password}
                         name="password"
                         type="password"
                         minLength={PASSWORD_MIN_LENGTH}
                         required
                         placeholder="비밀번호"
                    />
                    <Input
                         errors={state?.fieldErrors.confirmPassword}
                         name="confirmPassword"
                         minLength={PASSWORD_MIN_LENGTH}
                         type="password"
                         required
                         placeholder="비밀번호 확인"
                    />
                    <Button text="회원가입" />
               </form>
          </div>
     );
}
