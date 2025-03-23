import NextAuth, { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import authConfig from "../auth.config";
import { accountsTable, sessionsTable, usersTable, verificationTokensTable } from "./lib/db/schema";

const authOptions: NextAuthConfig = {
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
    }),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    ...authConfig,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
