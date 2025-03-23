"use client";

import React from "react";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { registerAction, RegisterValidationSchemaType } from "../action";
import { useActionState } from "react";
import { FormSubmitResponseType } from "@/types";
import { signIn } from "next-auth/react";

const initialState: FormSubmitResponseType<RegisterValidationSchemaType> = {
    old: null,
    status: "success",
    errors: null,
    message: null,
};

const RegisterForm = () => {
    const [state, formAction, pending] = useActionState(registerAction, initialState);

    return (
        <>
            <form action={formAction} className="mt-6">
                {state.status === "error" && (
                    <div
                        className="px-4 py-2 mb-4 border border-red-300 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <h1 className="font-medium">Server Error</h1>
                        <p className="mt-1">{state.message}</p>
                    </div>
                )}

                <div className="mb-1">
                    <Label htmlFor="name" className="block text-sm mb-2">
                        Full Name
                    </Label>
                    <Input type="text" name="name" id="name" placeholder="Enter name" className="mb-0" defaultValue={state.old?.name ?? ""} />
                    <small className="inline-block text-destructive text-xs h-[1.25rem]">{state?.errors?.name[0]}</small>
                </div>

                <div className="mb-1">
                    <Label htmlFor="email" className="block text-sm">
                        Email
                    </Label>
                    <Input type="email" name="email" id="email" placeholder="Enter email" className="mb-0" defaultValue={state.old?.email ?? ""} />
                    <small className="inline-block text-destructive text-xs h-[1.25rem]">{state?.errors?.email[0]}</small>
                </div>

                <div className="mb-1">
                    <Label htmlFor="password" className="text-title text-sm mb-2">
                        Password
                    </Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        className="input sz-md variant-mixed mb-0"
                        placeholder="Enter password"
                        defaultValue={state.old?.password ?? ""}
                    />
                    <small className="inline-block text-destructive text-xs h-[1.25rem]">{state?.errors?.password[0]}</small>
                </div>

                <Button className="w-full mt-3" size="lg" type="submit" disabled={pending}>
                    Register
                </Button>
            </form>

            <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <hr className="border-dashed" />
                <span className="text-muted-foreground text-xs">Or continue With</span>
                <hr className="border-dashed" />
            </div>

            <Button
                type="submit"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                    signIn("github", { callbackUrl: "/dashboard" });
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                    <path
                        fill="#4285f4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                        fill="#34a853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                        fill="#fbbc05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    ></path>
                    <path
                        fill="#eb4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                </svg>
                <span>Google</span>
            </Button>
        </>
    );
};

export default RegisterForm;
