"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ItemsType = {
    id: string;
    name: string;
    cost: number;
    type: "debit" | "credit";
    category_id: string;
};

export const columns: ColumnDef<ItemsType>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "cost",
        header: () => <div className="text-right">Cost</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("cost"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: (/* { row } */) => {
            // const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex gap-2">
                            <Edit className="w-5" />
                            Edit item
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2">
                            <Trash2 className="w-5 text-red-500" />
                            Delete item
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
