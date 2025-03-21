import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accountsTable, sessionsTable, usersTable, verificationTokensTable } from "@/lib/db/schema";
import { db } from "@/lib/db";

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
            async authorize(credentials) {
                if (credentials?.user) {
                    return credentials.user;
                }
                return null;
            },
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
