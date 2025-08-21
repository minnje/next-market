"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import Button from "@/components/button";
import Input from "@/components/input";

export default function Login() {
     const [state, action] = useActionState(login, null);
     return (
          <div className="flex flex-col gap-10 py-8 px-6">
               <div className="flex flex-col gap-2 *:font-medium">
                    <h1 className="text-2xl">안녕하세요!</h1>
                    <h2 className="text-xl">이메일로 로그인하세요.</h2>
               </div>
               <form action={action} className="flex flex-col gap-3">
                    <Input
                         name="email"
                         type="email"
                         required
                         placeholder="Email"
                         errors={state?.fieldErrors.email}
                    />
                    <Input
                         name="password"
                         type="password"
                         required
                         minLength={PASSWORD_MIN_LENGTH}
                         placeholder="Password"
                         errors={state?.fieldErrors.password}
                    />

                    <Button text="Login" />
               </form>
          </div>
     );
}
