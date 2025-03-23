import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";

export default {
    providers: [
        Credentials({
            credentials: {},
            async authorize(auth) {
                return auth || null;
            },
        }),
        Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        Github,
        Google,
    ],
} satisfies NextAuthConfig;
