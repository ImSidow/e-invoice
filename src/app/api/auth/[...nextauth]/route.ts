import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accountsTable, sessionsTable, usersTable, verificationTokensTable } from "@/lib/drizzle/schema";
import { db } from "@/lib/drizzle/db";

const handler = NextAuth({
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
    }),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
});

export { handler as GET, handler as POST };
