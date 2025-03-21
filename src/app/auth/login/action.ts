"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { z } from "zod";

const schema = z.object({
    email: z.string().nonempty("field is required").email(),
    password: z.string().nonempty("field is required"),
});

type SchemaType = z.infer<typeof schema>;

export type LoginPrevStateType = { old?: SchemaType | null; errors?: Record<string, string[]> | null; message: string | null };

export const loginAction = async (state: LoginPrevStateType, formData: FormData) => {
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
        return {
            old: data,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing required fields",
        };
    }

    const user = await db.select().from(usersTable).execute();

    signIn("credentials", {
        email: user[0].email,
        password: user[0].password,
    });

    return {
        message: "Login successful",
    };
};
