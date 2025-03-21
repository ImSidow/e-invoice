import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { UserType } from "./lib/db/schema";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
    const session = await auth();
});

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
