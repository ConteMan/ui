import * as UI from "@registry/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

export default function ChartDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="chart"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-4">
        <UI.ChartContainer
          config={{
            count: { label: text("访问量", "Visits"), color: "var(--chart-1)" },
          }}
          className="h-64 w-full"
        >
          <AreaChart
            data={[
              { day: "Mon", count: 12 },
              { day: "Tue", count: 28 },
              { day: "Wed", count: 19 },
              { day: "Thu", count: 42 },
            ]}
            accessibilityLayer
          >
            <XAxis dataKey="day" />
            <YAxis />
            <UI.ChartTooltip content={<UI.ChartTooltipContent />} />
            <Area
              dataKey="count"
              stroke="var(--color-count)"
              fill="var(--color-count)"
            />
          </AreaChart>
        </UI.ChartContainer>
        <p>
          {text(
            "示例访问量；方向键浏览数据点。",
            "Illustrative visits; use arrow keys to inspect points.",
          )}
        </p>
      </div>
    </div>
  );
}
