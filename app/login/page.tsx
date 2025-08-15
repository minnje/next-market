"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Login() {
     const [state, action] = useFormState(handleForm, null);
     return (
          <div className="flex flex-col gap-10 py-8 px-6">
               <div className="flex flex-col gap-2 *:font-medium">
                    <h1 className="text-2xl">안녕하세요!</h1>
                    <h2 className="text-xl">이메일로 로그인하세요.</h2>
               </div>
               <form action={action} className="flex flex-col gap-3">
                    <FormInput
                         name="email"
                         type="email"
                         required
                         placeholder="Email"
                         errors={[]}
                    />
                    <FormInput
                         name="password"
                         type="password"
                         required
                         placeholder="Password"
                         errors={state?.errors ?? []}
                    />

                    <FormButton text="Login" />
               </form>
          </div>
     );
}
