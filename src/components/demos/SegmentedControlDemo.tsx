import { useState } from "react";
import * as UI from "@registry/blocks/segmented-control";

export default function SegmentedControlDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [choice, setChoice] = useState("weekly");
  return (
    <div
      id="preview"
      data-demo="segmented-control"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-4">
        <UI.SegmentedControl
          label={text("显示方式", "Display mode")}
          options={[
            { value: "weekly", label: text("每周", "Weekly") },
            { value: "daily", label: text("每日", "Daily") },
            {
              value: "off",
              label: text("不可用", "Unavailable"),
              disabled: true,
            },
          ]}
          value={choice}
          onValueChange={setChoice}
        />
        <p role="status">{choice}</p>
        <UI.SegmentedControl
          aria-label={text("禁用显示方式", "Disabled display mode")}
          disabled
          options={[
            { value: "weekly", label: text("每周", "Weekly") },
            { value: "daily", label: text("每日", "Daily") },
          ]}
        />
      </div>
    </div>
  );
}
