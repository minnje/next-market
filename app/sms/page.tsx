"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { SMSVerification } from "./actions";

const initialState = {
     token: false,
     error: undefined,
};

export default function SMSLogin() {
     const [state, dispatch] = useFormState(SMSVerification, initialState);
     return (
          <div className="flex flex-col gap-10 py-8 px-6">
               <div className="flex flex-col gap-2 *:font-medium">
                    <h1 className="text-2xl">SMS 로그인</h1>
                    <h2 className="text-xl">휴대폰 번호로 인증하세요.</h2>
               </div>
               <form action={dispatch} className="flex flex-col gap-3">
                    {state?.token ? (
                         <Input
                              name="token"
                              min={100000}
                              max={999999}
                              type="number"
                              required
                              placeholder="인증 번호"
                         />
                    ) : (
                         <Input
                              name="phone"
                              type="text"
                              required
                              placeholder="휴대폰 번호"
                              errors={state.error?.formErrors}
                         />
                    )}
                    <Button text={state.token ? "인증하기" : "인증번호 받기"} />
               </form>
          </div>
     );
}
