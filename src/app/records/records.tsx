"use client";

import { ModeToggle } from "@/components/theme-toggle";
import axios from "axios";
import Link from "next/link";
import { CircleUser, Menu, Plus } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ItemsType } from "./columns";
import { ItemsTable } from "./items-table";
import { ItemsForm } from "./items-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    userId?: string;
}

export const Records = ({ userId }: Props) => {
    const itemsQuery = useQuery({
        queryKey: ["records"],
        queryFn: async () => {
            const res = await axios.get<{ data: ItemsType[] }>(`/api/v1/items?user_id=${userId}`);
            return res.data.data;
        },
    });
    const [sheetOpen, setSheetOpen] = useState(false);

    if (itemsQuery.status === "pending") {
        return <p>Loading...</p>;
    }

    if (itemsQuery.status === "error") {
        return <p>Error...</p>;
    }

    const items = itemsQuery.data;

    const handleSubmit = () => {
        setSheetOpen(false);
    };

    return (
        <div className="flex flex-col gap-5 items-center">
            <header className="sticky top-0 flex h-16 items-center w-full gap-4 border-b bg-background px-4 md:px-6 z-10">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/records"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Records
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/records"
                                className="text-foreground hover:text-foreground"
                            >
                                Records
                            </Link>
                            <ModeToggle />
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex gap-2">
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle user menu
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <div className="md:w-4/5 w-11/12 pb-20">
                <ItemsTable items={items} />
                <Sheet
                    open={sheetOpen}
                    onOpenChange={(open) => setSheetOpen(open)}
                >
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            className="fixed bottom-3 right-3 md:bottom-10 md:right-10 rounded-full w-16 h-16"
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add a new record</SheetTitle>
                            <ItemsForm handleSubmit={handleSubmit} />
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};
