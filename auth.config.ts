import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
    providers: [
        Credentials({
            credentials: {},
            async authorize(auth) {
                return auth || null;
            },
        }),
        Github,
        Google,
    ],
} satisfies NextAuthConfig;
