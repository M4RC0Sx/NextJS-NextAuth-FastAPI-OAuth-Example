"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * NextAuth provider, wrapping the app with the SessionProvider is required
 * to enable the useSession hook in the app
 */
export default function NextAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    return <SessionProvider>{children}</SessionProvider>;
}
