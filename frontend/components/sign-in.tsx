import { signIn } from "@/auth";

/**
 * Sample component to trigger NextAuth GH signin process
 */
export function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    );
}
