"use client";

import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
import { getColumns, ItemsType } from "./columns";
import { DataTable } from "../data-table";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ItemsForm } from "./items-form";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
    items: ItemsType[];
};

const ItemsTable = ({ items }: Props) => {
    const queryClient = useQueryClient();
    const [sheetOpen, setSheetOpen] = useState(false);
    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => {
            return axios.delete(`/api/v1/items/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["records"] });
        },
    });
    const [idToUpdate, setIdToUpdate] = useState<string>("");
    const itemQuery = useQuery({
        queryKey: ["item", idToUpdate],
        queryFn: async () => {
            const res = await axios.get<{ data: ItemsType }>(
                `/api/v1/items/${idToUpdate}`
            );
            return res.data.data;
        },
        enabled: idToUpdate !== "",
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate({ id });
    };

    const handleUpdate = (id: string) => {
        setSheetOpen(true);
        setIdToUpdate(id);
    };

    const handleSubmit = () => {
        setSheetOpen(false);
    };

    return (
        <>
            <DataTable
                columns={getColumns(handleDelete, handleUpdate)}
                data={items}
            />
            <Sheet
                open={sheetOpen}
                onOpenChange={(open) => {
                    setSheetOpen(open);
                }}
            >
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Update record</SheetTitle>
                        <ItemsForm
                            initialData={itemQuery.data}
                            isEditing={true}
                            handleSubmit={handleSubmit}
                        />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export { ItemsTable };
