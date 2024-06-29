import { signOut } from "next-auth/react";

/**
 * Sample component to trigger NextAuth GH signin process
 */
export function SignOut() {
    return <button onClick={() => signOut()}>Sign Out</button>;
}
