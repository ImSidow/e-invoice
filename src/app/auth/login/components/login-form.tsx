"use client";

import Link from "next/link";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { loginAction, LoginValidationSchemaType } from "../action";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { FormSubmitResponseType } from "@/types";

const initialState: FormSubmitResponseType<LoginValidationSchemaType> = {
    old: null,
    status: "success",
    errors: null,
    message: null,
};

const LoginForm = () => {
    const params = useSearchParams();
    const [state, formAction, pending] = useActionState(loginAction, initialState);

    return (
        <form action={formAction} className="mt-6 space-y-6">
            {state.status === "error" && (
                <div
                    className="px-4 py-2 border border-red-300 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    <h1 className="font-medium">Server Error</h1>
                    <p className="mt-1">{state.message}</p>
                </div>
            )}

            <input type="hidden" name="callback" value={params.get("callback") ?? "/dashboard"} />

            <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                    Email
                </Label>
                <Input type="email" name="email" id="email" placeholder="Enter email" className="mb-0" defaultValue={state.old?.email ?? ""} />
                {state.errors?.email && <small className="text-destructive text-xs">{state.errors.email[0]}</small>}
            </div>

            <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-title text-sm">
                        Password
                    </Label>
                    <Button asChild variant="link" size="sm">
                        <Link href="#" className="link intent-info variant-ghost text-sm">
                            Forgot your Password ?
                        </Link>
                    </Button>
                </div>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    className="input sz-md variant-mixed mb-0"
                    placeholder="Enter password"
                    defaultValue={state.old?.password ?? ""}
                />
                {state.errors?.password && <small className="text-destructive text-xs">{state.errors.password[0]}</small>}
            </div>

            <Button className="w-full" size="lg" type="submit" disabled={pending}>
                Sign In
            </Button>
        </form>
    );
};

export default LoginForm;
