import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accountsTable, sessionsTable, usersTable, verificationTokensTable } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/db";
// import { eq } from "drizzle-orm";
// import { compareHash } from "@/lib/utils/hash";

const authOptions: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
    }),
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(request) {
                console.log(request);
                // const response = await fetch(request);
                // if (!response.ok) return null;
                // return (await response.json()) ?? null;

                return null;
            },

            // credentials: {
            //     email: { label: "Email", type: "email" },
            //     password: { label: "Email", type: "password" },
            // },
            // authorize: async (c: { email: string; password: string; callbackUrl: string }) => {
            //     try {
            //         if (credentials?.email && credentials?.password) {
            //             console.log(credentials);
            //             const users = await db.select().from(usersTable).where(eq(usersTable.email, credentials.email)).execute();

            //             const user = users[0];
            //             return user;
            //             // if (user && user.password) {
            //             //     const pwHash = await compareHash(credentials.password, user.password);
            //             //     if (pwHash) return user;
            //             // }
            //         }

            //         // throw new Error("Invalid credentials.");
            //         return null;
            //     } catch (error) {
            //         return null;
            //         console.log(error);
            //     }
            // },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
