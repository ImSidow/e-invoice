"use server";

import { UserRepository } from "@/lib/repository/user.repository";
import { signIn } from "@/auth";
import { FormSubmitResponseType } from "@/types";
import { z } from "zod";

const schema = z.object({
    name: z.string().nonempty("field is required"),
    email: z.string().nonempty("field is required").email(),
    password: z.string().nonempty("field is required").min(8),
});

export type RegisterValidationSchemaType = z.infer<typeof schema>;

const userRepository = new UserRepository();

export const registerAction = async (state: FormSubmitResponseType<RegisterValidationSchemaType>, formData: FormData) => {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
        return {
            old: data,
            status: "error",
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing required fields",
        };
    }

    const { password, ...rest } = await userRepository.create(data);
    await signIn("credentials", { ...rest, redirectTo: "/dashboard" });

    return {
        old: data,
        status: "error",
        message: "an error occurred while creating your account",
    };
};
