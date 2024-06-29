"use client";

import { signIn } from "next-auth/react";

/**
 * Sample component to trigger NextAuth GH signin process
 */
export function SignIn() {
    return (
        <button onClick={() => signIn("github")}>
            Sign In
        </button>
    );
}
