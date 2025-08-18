"use client";

import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Button from "@/components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
     const [state, dispatch] = useFormState(createAccount, null);
     return (
          <div className="flex flex-col gap-10 py-8 px-6">
               <div className="flex flex-col gap-2 *:font-medium">
                    <h1 className="text-2xl">안녕하세요!</h1>
                    <h2 className="text-xl">Fill in the form below to join!</h2>
               </div>
               <form action={dispatch} className="flex flex-col gap-3">
                    <Input
                         errors={state?.fieldErrors.username}
                         name="username"
                         type="text"
                         required
                         placeholder="Username"
                    />
                    <Input
                         errors={state?.fieldErrors.email}
                         name="email"
                         type="email"
                         required
                         placeholder="Email"
                    />
                    <Input
                         errors={state?.fieldErrors.password}
                         name="password"
                         type="password"
                         minLength={PASSWORD_MIN_LENGTH}
                         required
                         placeholder="Password"
                    />
                    <Input
                         errors={state?.fieldErrors.confirmPassword}
                         name="confirmPassword"
                         minLength={PASSWORD_MIN_LENGTH}
                         type="password"
                         required
                         placeholder="Confirm Password"
                    />
                    <Button text="Create Account" />
               </form>
               <SocialLogin />
          </div>
     );
}
