"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ItemsType } from "./columns";

const formSchema = z.object({
    item: z.string(),
    cost: z.coerce.number(),
    type: z.enum(["debit", "credit"]),
    category: z.string(),
});

type Props = {
    initialData?: ItemsType;
    isEditing?: boolean;
    handleSubmit?: () => void;
};

const ItemsForm = ({ initialData, isEditing = false, handleSubmit }: Props) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item: "",
            cost: 0,
            type: "debit",
            category: "",
        },
        values: {
            item: initialData ? initialData.name : "",
            cost: initialData ? initialData.cost : 0,
            type: initialData ? initialData.type : "debit",
            category: initialData ? initialData.category_id : "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEditing) {
            axios.patch(`${process.env.SERVER_URL}/api/v1/update/item`, {
                id: initialData?.id,
                name: values.item,
                cost: values.cost,
                type: values.type,
                category_id: values.category,
            });

            if (handleSubmit) {
                handleSubmit();
            }

            return;
        }

        await axios.post(`${process.env.SERVER_URL}/api/v1/item`, {
            name: values.item,
            cost: values.cost,
            type: values.type,
            category_id: values.category,
        });

        router.refresh();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Item</FormLabel>
                            <FormControl>
                                <Input placeholder="item" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cost</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="cost"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of transaction</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type of transation" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="debit">Debit</SelectItem>
                                    <SelectItem value="credit">
                                        Credit
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="8f8c5dd8-7e78-4814-bebd-55f84f8b874e">
                                        Food
                                    </SelectItem>
                                    <SelectItem value="6173261d-97d3-4106-a6ab-8552f9df4a41">
                                        Entertainment
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export { ItemsForm };
