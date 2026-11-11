import * as UI from "@registry/ui/select";

export default function SelectDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="select"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="flex flex-wrap gap-3">
        <UI.Select
          items={[
            { value: "weekly", label: text("每周", "Weekly") },
            { value: "daily", label: text("每日", "Daily") },
          ]}
          defaultValue="weekly"
        >
          <UI.SelectTrigger
            aria-label={text("频率", "Frequency")}
            className="min-h-11 w-44"
          >
            <UI.SelectValue />
          </UI.SelectTrigger>
          <UI.SelectContent>
            <UI.SelectItem value="weekly">
              {text("每周", "Weekly")}
            </UI.SelectItem>
            <UI.SelectItem value="daily">{text("每日", "Daily")}</UI.SelectItem>
          </UI.SelectContent>
        </UI.Select>
        <UI.Select disabled>
          <UI.SelectTrigger aria-label={text("禁用选项", "Disabled select")}>
            <UI.SelectValue placeholder={text("不可用", "Unavailable")} />
          </UI.SelectTrigger>
        </UI.Select>
      </div>
    </div>
  );
}
