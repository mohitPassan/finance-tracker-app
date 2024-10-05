"use client";

import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
import { getColumns, ItemsType } from "./columns";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ItemsForm } from "./items-form";
import { useState } from "react";

type Props = {
    items: ItemsType[];
};

const ItemsTable = ({ items }: Props) => {
    const router = useRouter();
    const [dataToUpdate, setDataToUpdate] = useState<ItemsType>();
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleDelete = (id: string) => {
        axios
            .delete(`http://localhost:1323/api/v1/items/${id}`)
            .then(() => {
                router.refresh();
            })
            .catch((err) => {
                console.error(`Error while deleting. Error: ${err}`);
            });
    };

    const handleUpdate = (id: string) => {
        setSheetOpen(true);
        axios
            .get<{ data: ItemsType }>(
                `http://localhost:1323/api/v1/items/${id}`
            )
            .then((res) => {
                setDataToUpdate(res.data.data);
            })
            .catch((err) => {
                console.error(`Error while updating. Error: ${err}`);
            });
    };

    const handleSubmit = () => {
        router.refresh();
        setSheetOpen(false);
    };

    return (
        <>
            <DataTable
                columns={getColumns(handleDelete, handleUpdate)}
                data={items}
            />
            <Sheet open={sheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Update record</SheetTitle>
                        <ItemsForm
                            initialData={dataToUpdate}
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
