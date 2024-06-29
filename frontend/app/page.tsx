import BackendData from "@/components/backend-data";
import User from "@/components/user";

import { AuthPanel } from "@/components/auth-panel";

export default async function Home() {
    return (
        <main>
            <div>
                <AuthPanel />
                <User />
                <BackendData />
            </div>
        </main>
    );
}
