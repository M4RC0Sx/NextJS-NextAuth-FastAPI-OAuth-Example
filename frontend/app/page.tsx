import BackendData from "@/components/backend-data";
import { SignIn } from "@/components/sign-in";
import User from "@/components/user";

export default function Home() {
    return (
        <main>
            <div>
                <SignIn />
                <User />
                <BackendData />
            </div>
        </main>
    );
}
