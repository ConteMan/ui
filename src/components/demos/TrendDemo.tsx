import { useState } from "react";
import * as UI from "@registry/blocks/trend";
import { Button } from "@registry/ui/button";

export default function TrendDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [empty, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="trend"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-4">
        <UI.Trend
          label={text("访问趋势", "Visit trend")}
          empty={text("没有数据", "No data")}
          data={
            empty
              ? []
              : [
                  { day: "Mon", count: 12 },
                  { day: "Tue", count: 28 },
                  { day: "Wed", count: 19 },
                  { day: "Thu", count: 42 },
                ]
          }
        />
        <Button
          variant="outline"
          aria-pressed={empty}
          onClick={() => setEmpty(!empty)}
        >
          {text("切换空状态", "Toggle empty state")}
        </Button>
      </div>
    </div>
  );
}
