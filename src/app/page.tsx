import axios from "axios";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { HomePage } from "./home";

export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["items"],
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
