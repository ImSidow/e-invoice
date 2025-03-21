"use server";

import { signIn } from "@/auth";
import { UserRepository } from "@/lib/repository/user.repository";
import { z } from "zod";

const schema = z.object({
    email: z.string().nonempty("field is required").email(),
    password: z.string().nonempty("field is required"),
});

type SchemaType = z.infer<typeof schema>;

export type LoginPrevStateType = { old?: SchemaType | null; errors?: Record<string, string[]> | null; message: string | null };

const userRepository = new UserRepository();

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

    const user = await userRepository.findByEmail(data.email);
    await signIn("credentials", user[0]);

    return {
        message: "Login successful",
    };
};
