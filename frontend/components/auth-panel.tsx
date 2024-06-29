"use client";

import { useSession } from "next-auth/react";

import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";

/**
 * Show or hide signIn/signOut buttons based on session state
 */
export function AuthPanel() {
    const { data: session } = useSession();

    return <div>{session?.user ? <SignOut /> : <SignIn />}</div>;
}
