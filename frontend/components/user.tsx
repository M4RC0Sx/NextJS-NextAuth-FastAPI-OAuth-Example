import { auth } from "@/auth";

/**
 * Paragraph component to display user data
 */
export default async function User() {
    const session = await auth();

    if (!session) return <p>Not authenticated!</p>;

    return (
        <div>
            <p>{JSON.stringify(session.user)}</p>
        </div>
    );
}
