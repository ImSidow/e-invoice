"use server";

import { z } from "zod";

const schema = z.object({
    email: z.string({ message: "field is required" }).email(),
    password: z.string({ message: "field is required" }).min(8),
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

    return {
        message: "Login successful",
    };
};
