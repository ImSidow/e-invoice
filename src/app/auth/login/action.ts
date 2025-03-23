"use server";

import { signIn } from "@/auth";
import { UserRepository } from "@/lib/repository/user.repository";
import { compareHash } from "@/lib/utils/hash";
import { FormSubmitResponseType } from "@/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    email: z.string().nonempty("field is required").email(),
    password: z.string().nonempty("field is required"),
});

export type LoginValidationSchemaType = z.infer<typeof schema>;

const userRepository = new UserRepository();

export const loginAction = async (state: FormSubmitResponseType<LoginValidationSchemaType>, formData: FormData) => {
    const data = {
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

    const result = await userRepository.authenticate(data.email, data.password);
    if (result) {
        const callbackUrl = (formData.get("callback") as string) || "/dashboard";
        await signIn("credentials", { ...result, redirectTo: callbackUrl });
    }

    return {
        old: data,
        status: "error",
        message: "the credentials does not match our records",
    };
};
