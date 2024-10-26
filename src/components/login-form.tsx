import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { signIn } from "@root/auth";
import Image from "next/image";
import GoogleIcon from '../app/google-icon.webp';

export function LoginForm() {
    return (
        <Card className="mx-auto w-11/12 max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Get started</CardTitle>
                <CardDescription>
                    Continue with Google to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <div className="grid gap-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            type="submit"
                        >
                            <Image src={GoogleIcon} alt="google-icon" className="w-8 h-8"/> Login with Google
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
