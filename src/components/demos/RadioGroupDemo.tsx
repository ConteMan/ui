import * as UI from "@registry/ui/radio-group";

export default function RadioGroupDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="radio-group"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-4">
        <UI.RadioGroup
          defaultValue="weekly"
          aria-label={text("频率", "Frequency")}
        >
          {["weekly", "daily"].map((value) => (
            <label key={value} className="flex min-h-11 items-center gap-3">
              <UI.RadioGroupItem value={value} />
              {value === "weekly"
                ? text("每周", "Weekly")
                : text("每日", "Daily")}
            </label>
          ))}
        </UI.RadioGroup>
        <UI.RadioGroup disabled aria-label={text("不可用", "Unavailable")}>
          <UI.RadioGroupItem value="off" aria-label={text("关闭", "Off")} />
        </UI.RadioGroup>
      </div>
    </div>
  );
}
