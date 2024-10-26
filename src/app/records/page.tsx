import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { Records } from "./records";
import axios from "axios";
import { ItemsType } from "./columns";
import { auth } from "@root/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const queryClient = new QueryClient();
    const userId = session.user.id;

    await queryClient.prefetchQuery({
        queryKey: ["records"],
        queryFn: async () => {
            const res = await axios.get<{ data: ItemsType[] }>(
                `${process.env.SERVER_URL}/api/v1/items?user_id=${userId}`
            );
            return res.data.data;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Records userId={userId} />
        </HydrationBoundary>
    );
}
