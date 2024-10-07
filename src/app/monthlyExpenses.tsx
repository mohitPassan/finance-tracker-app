"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useMedia } from "use-media";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartConfig = {
    month: {
        label: "Month",
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
    month: string;
    year: string;
    expenses: number;
    income: number;
};

type Props = {
    chartData: ChartDataItem[];
};

const monthMap: { [key: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
};

export function MonthlyExpenses({ chartData }: Props) {
    const currentYear = new Date().getFullYear().toString();
    const formattedData = chartData
        .filter((item) => item.year === currentYear)
        .map((item) => ({
            ...item,
            month: monthMap[item.month],
        }));

    const isMobile = useMedia({ maxWidth: 768 });

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-lg">Monthly expenses</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-h-[450px] w-full aspect-square"
                >
                    <BarChart accessibilityLayer data={formattedData}>
                        <CartesianGrid vertical={isMobile ? false : true} />
                        <XAxis
                            dataKey="month"
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
                            stackId={isMobile ? "a" : undefined}
                        />
                        <Bar
                            dataKey="income"
                            fill="var(--color-income)"
                            stackId={isMobile ? "a" : undefined}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
