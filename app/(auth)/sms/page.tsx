"use client"

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginSMS } from "./action";

const initialState={
    token:false,
    error:undefined,
}

export default function SMSLogin(){
    const [state,action] = useFormState(loginSMS,initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.token) {
          alert("You are now logged in.");
          router.push("/");
        }
      }, [state.token, router]);
    return(
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS Login</h1>
                <h2 className="text-xl">Verify your phone number</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">         
                <Input
                    type="number"
                    placeholder="Phone number"
                    required
                    name="phone"
                    errors={state.error?.formErrors}
                />
                 {state.token ?<Input
                    type="number"
                    placeholder="Verifycation code"
                    required
                    name="token"
                    minLength={100000}
                    maxLength={999999}
                    errors={state.error?.formErrors}
                />:null}
                <Button
                    text={state.token ? "Verify Token" : "Send Verifycation SMS"}
                />
            </form>
        </div>
    )
}