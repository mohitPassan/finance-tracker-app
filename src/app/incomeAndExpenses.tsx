"use client";

import * as React from "react";
import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartConfig = {
    type: {
        label: "Type",
    },
    value: {
        label: "Value",
    },
    income: {
        label: "Income",
        color: "hsl(var(--chart-2))",
    },
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

type Props = {
    chartData: {
        income: number;
        expenses: number;
    };
};

export function IncomeAndExpenses({ chartData }: Props) {
    const formattedData = [
        {
            type: "income",
            value: chartData.income,
            fill: "var(--color-income)",
        },
        {
            type: "expenses",
            value: chartData.expenses,
            fill: "var(--color-expenses)",
        },
    ];

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-lg">Income and expenses</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={formattedData}
                            dataKey="value"
                            nameKey="type"
                            label
                        >
                            <LabelList
                                dataKey="type"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
