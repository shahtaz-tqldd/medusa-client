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

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  
  { date: "2024-07-01", desktop: 446, mobile: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "#687FE5",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function MedusaBarChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

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
        <Bar dataKey={activeChart} fill="#2b7fff" />
      </BarChart>
    </ChartContainer>
  );
}
