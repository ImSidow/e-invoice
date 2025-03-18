import { getDBUrl } from "@/lib/drizzle/db";
import RegisterForm from "./components/register-form";

export default function RegisterPage() {
    console.log(getDBUrl());

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 dark:bg-transparent">
            <RegisterForm />
        </section>
    );
}
