import { useState } from "react";
import * as UI from "@registry/blocks/select-field";

export default function SelectFieldDemo({
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
      data-demo="select-field"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-3">
        <UI.SelectField
          aria-label={text("频率", "Frequency")}
          value={choice}
          onValueChange={setChoice}
          options={[
            { value: "weekly", label: text("每周", "Weekly") },
            { value: "daily", label: text("每日", "Daily") },
          ]}
        />
        <UI.SelectField
          disabled
          aria-label={text("不可用", "Unavailable")}
          options={[{ value: "weekly", label: text("每周", "Weekly") }]}
          defaultValue="weekly"
        />
        <p role="status">{choice}</p>
      </div>
    </div>
  );
}
