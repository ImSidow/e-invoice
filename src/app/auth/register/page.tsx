import Link from "next/link";
import { Logo } from "@/components/shadcn/logo";
import { Button } from "@/components/shadcn/ui/button";
import RegisterForm from "./components/register-form";

const RegisterPage = () => {
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 dark:bg-transparent">
            <div className="bg-muted m-auto h-fit w-full max-w-md overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-4 pb-6 pt-7">
                    <div className="text-center">
                        <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                            <Logo />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Create a e-invoice Account</h1>
                        <p className="text-sm">Welcome! Create an account to get started</p>
                    </div>

                    <RegisterForm />
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        {"Have an account ?"}
                        <Button asChild variant="link" className="px-2">
                            <Link href="/auth/login">Login</Link>
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
