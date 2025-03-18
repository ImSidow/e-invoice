"use server";

import { db } from "@/lib/drizzle/db";
import { usersTable } from "@/lib/drizzle/schema";
import { z } from "zod";
// import { signIn } from "next-auth/react";

const schema = z.object({
    name: z.string().nonempty("field is required"),
    email: z.string().nonempty("field is required").email(),
    password: z.string().nonempty("field is required").min(8),
});

type SchemaType = z.infer<typeof schema>;

export type RegisterPrevStateType = { old?: SchemaType | null; errors?: Record<string, string[]> | null; message: string | null };

export const registerAction = async (state: RegisterPrevStateType, formData: FormData) => {
    const data = {
        name: formData.get("name") as string,
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

    db.insert(usersTable).values({
        name: data.name,
        email: data.email,
        password: data.password,
    });

    return {
        message: "register successful",
    };
};
