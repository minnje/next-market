"use server";

import { redirect } from "next/dist/server/api-utils";

export const handleForm = async (prevState: any, formdata: FormData) => {
     await new Promise((resolve) => setTimeout(resolve, 5000));
     console.log(formdata.get("email"), formdata.get("password"));
     return {
          errors: ["wrong", "long"],
     };
};
