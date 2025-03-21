"use client";

import { Logo } from "@/components/shadcn/logo";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import Link from "next/link";
import { registerAction, RegisterPrevStateType } from "../action";
import { useActionState } from "react";
import { useSession } from "next-auth/react";

const initialState: RegisterPrevStateType = {
    old: null,
    errors: null,
    message: null,
};

const RegisterForm = () => {
    const [state, formAction, pending] = useActionState(registerAction, initialState);
    const { data: session } = useSession();

    console.log(session);

    return (
        <form
            action={formAction}
            className="bg-muted m-auto h-fit w-full max-w-md overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
            <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-4 pb-6 pt-10">
                <div className="text-center">
                    <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                        <Logo />
                    </Link>
                    <h1 className="mb-1 mt-4 text-xl font-semibold">Create a e-invoice Account</h1>
                    <p className="text-sm">Welcome! Create an account to get started</p>
                </div>

                <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="block text-sm">
                            Full Name
                        </Label>
                        <Input type="text" name="name" id="name" placeholder="Enter name" className="mb-0" defaultValue={state.old?.name ?? ""} />
                        {state.errors?.name && <small className="text-destructive text-xs">{state.errors.name[0]}</small>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-sm">
                            Email
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            className="mb-0"
                            defaultValue={state.old?.email ?? ""}
                        />
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
                        Register
                    </Button>
                </div>

                <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <hr className="border-dashed" />
                    <span className="text-muted-foreground text-xs">Or continue With</span>
                    <hr className="border-dashed" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <Button type="button" variant="outline" size="lg">
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
                </div>
            </div>

            <div className="p-3">
                <p className="text-accent-foreground text-center text-sm">
                    {"Have an account ?"}
                    <Button asChild variant="link" className="px-2">
                        <Link href="/auth/login">Login</Link>
                    </Button>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
