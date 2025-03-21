import NextAuth, { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import authConfig from "../auth.config";

const authOptions: NextAuthConfig = {
    adapter: DrizzleAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    ...authConfig,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
