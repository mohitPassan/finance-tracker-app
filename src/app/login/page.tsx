import { LoginForm } from "@/components/login-form";
import { auth } from "@root/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();

    if (session?.user) {
      redirect('/')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <LoginForm />
        </div>
    );
}
