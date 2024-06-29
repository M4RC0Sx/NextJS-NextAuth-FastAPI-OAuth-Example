"use client";

import { useSession } from "next-auth/react";

/**
 * Button component to fetch backend data and display it in an alert
 */
export default function BackendData() {
    const { data: session } = useSession();

    if (!session || !session.user) return null;

    return (
        <button
            onClick={async () => {
                const response = await fetch("http://localhost:8000/api/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session.accessToken || ""}`,
                        "X-Provider": session.provider || "",
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(JSON.stringify(data));
                }
            }}
        >
            Get data
        </button>
    );
}
