"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const NextAuthSessionWrapper = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionWrapper;
