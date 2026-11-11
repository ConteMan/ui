import * as UI from "@registry/ui/native-select";

export default function NativeSelectDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="native-select"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-3">
        <UI.NativeSelect
          aria-label={text("频率", "Frequency")}
          defaultValue="weekly"
        >
          <UI.NativeSelectOption value="weekly">
            {text("每周", "Weekly")}
          </UI.NativeSelectOption>
          <UI.NativeSelectOption value="daily">
            {text("每日", "Daily")}
          </UI.NativeSelectOption>
        </UI.NativeSelect>
        <UI.NativeSelect
          aria-label={text("禁用选项", "Disabled select")}
          disabled
        >
          <UI.NativeSelectOption>
            {text("不可用", "Unavailable")}
          </UI.NativeSelectOption>
        </UI.NativeSelect>
      </div>
    </div>
  );
}
