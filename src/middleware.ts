import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);
const baseUrl = process.env.APP_URL;

const authRoutes = ["/auth/login", "/auth/register"];

export default auth(async function middleware(req: NextRequest) {
    const session = await auth();

    const reqUrl = new URL(req.url);
    if (!session && !authRoutes.includes(reqUrl.pathname)) {
        return NextResponse.redirect(new URL(`${baseUrl}/auth/login?callback=${encodeURIComponent(reqUrl.pathname)}`, req.url));
    }

    // if (session && authRoutes.includes(reqUrl.pathname)) {
    //     const callbackUrl = reqUrl.searchParams.get("callback") || "/dashboard";
    //     console.log("ssss", `${baseUrl}${callbackUrl}`);
    //     return NextResponse.redirect(new URL(`${baseUrl}${callbackUrl}`, req.url));
    // }

    return NextResponse.next();
});

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
