"use client";
import React from "react";
import { Title } from "@/components/ui/typography";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis, // Added YAxis for better readability
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// 2. Chart configuration tailored for the visitor data
const chartConfig = {
  visitor_count: {
    label: "Visitors",
    color: "var(--chart-1)", // Uses a CSS variable for theming
  },
} satisfies ChartConfig;

interface Visitor {
  month: string;
  visitor_count: number;
}

interface VisitorCycles {
  visitors: Visitor[];
}

const VisitorGraph = ({ visitors }: VisitorCycles) => {
  // The chart data is now directly available within the component
  const chartData = visitors;

  return (
    <div className="rounded-2xl p-8 border dark:border-white/20 border-blue-500">
      <div className="flex flex-col justify-between h-full gap-4">
        <Title variant="xs">Visitor Analytics</Title>

        {/* The chart is now rendered directly inside the component */}
        <ChartContainer config={chartConfig} className="h-92 w-full -ml-8">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="visitor_count"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="visitor_count"
              type="natural"
              strokeWidth={2}
              dot={{
                fill: "var(--color-visitor_count)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default VisitorGraph;
