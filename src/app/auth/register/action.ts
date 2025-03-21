"use server";

import { UserRepository } from "@/lib/repository/user.repository";
import { signIn } from "@/auth";
import { z } from "zod";

const schema = z.object({
    name: z.string().nonempty("field is required"),
    email: z.string().nonempty("field is required").email(),
    password: z.string().nonempty("field is required").min(8),
});

type SchemaType = z.infer<typeof schema>;

export type RegisterPrevStateType = { old?: SchemaType | null; errors?: Record<string, string[]> | null; message: string | null };

const userRepository = new UserRepository();

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

    const { password, ...rest } = await userRepository.create(data);
    signIn("credentials", { user: rest });

    return {
        message: "register successful",
    };
};
