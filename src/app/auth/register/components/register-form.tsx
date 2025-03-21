"use client";

import React from "react";
import Link from "next/link";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { registerAction, RegisterValidationSchemaType } from "../action";
import { useActionState } from "react";
import { FormSubmitResponseType } from "@/types";

const initialState: FormSubmitResponseType<RegisterValidationSchemaType> = {
    old: null,
    status: "success",
    errors: null,
    message: null,
};

const RegisterForm = () => {
    const [state, formAction, pending] = useActionState(registerAction, initialState);

    return (
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
    );
};

export default RegisterForm;
