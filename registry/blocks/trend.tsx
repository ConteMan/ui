import type { ReactNode } from "react";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Empty, EmptyDescription } from "@/components/ui/empty";

export function Trend({
  data = [],
  label,
  empty,
  color = "var(--chart-2)",
  formatDay,
}: {
  data?: { day: string; count: number }[];
  label: string;
  empty: ReactNode;
  color?: string;
  formatDay?: (day: string) => string;
}) {
  if (!data.length)
    return (
      <Empty className="h-64">
        <EmptyDescription>{empty}</EmptyDescription>
      </Empty>
    );
  return (
    <div className="h-64 w-full" role="img" aria-label={label}>
      <ChartContainer
        className="h-full w-full"
        config={{ count: { label, color } }}
      >
        <AreaChart data={data} accessibilityLayer>
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDay}
            minTickGap={28}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            width={32}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            name={label}
            isAnimationActive={false}
            dataKey="count"
            stroke="var(--color-count)"
            fill="var(--color-count)"
            fillOpacity={0.15}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
export default Trend;
