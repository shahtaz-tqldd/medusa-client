"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  visitor: {
    label: "Visitor",
    color: "#687FE5",
  },
} satisfies ChartConfig;

interface MedusaBarChartProps {
  chartData: {
    date: string;
    visit: number;
  }[];
}

export default function MedusaBarChart({ chartData }: MedusaBarChartProps) {
  const [activeChart] = React.useState<keyof typeof chartConfig>("visitor");

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[300px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px] dark:bg-white dark:text-black/80 bg-black text-white/90 border-none"
              nameKey="views"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
          }
        />
        <Bar dataKey={activeChart} fill="#2b7fff" radius={12} />
      </BarChart>
    </ChartContainer>
  );
}
