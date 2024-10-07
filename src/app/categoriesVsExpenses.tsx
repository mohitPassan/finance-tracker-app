"use client";

import * as React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    category: {
        label: "Category",
    },
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-1))",
    },
    income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

type ChartDataItem = {
    category: string;
    expenses: number;
    income: number;
};

type Props = {
    chartData: ChartDataItem[];
};

export function CategoriesVsExpenses({ chartData }: Props) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="expenses"
                            fill="var(--color-expenses)"
                        >
                            <LabelList
                                position="top"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                        <Bar
                            dataKey="income"
                            fill="var(--color-income)"
                        >
                            <LabelList
                                position="top"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
