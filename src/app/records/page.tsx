import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { Records } from "./records";
import axios from "axios";
import { ItemsType } from "./columns";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["records"],
        queryFn: async () => {
            const res = await axios.get<{ data: ItemsType[] }>(
                `${process.env.SERVER_URL}/api/v1/items`
            );
            return res.data.data;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Records />
        </HydrationBoundary>
    );
}
