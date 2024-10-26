import axios from "axios";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { HomePage } from "./home";
import { auth } from "@root/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.SERVER_URL}/api/v1/dashboard-data`
            );
            return res.data.data;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HomePage />
        </HydrationBoundary>
    );
}
