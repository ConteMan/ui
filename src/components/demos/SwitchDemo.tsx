import * as UI from "@registry/ui/switch";

export default function SwitchDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="switch"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-4">
        <label className="flex min-h-11 items-center gap-3">
          <UI.Switch defaultChecked />
          {text("自动同步", "Auto sync")}
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <UI.Switch disabled />
          {text("不可用", "Unavailable")}
        </label>
      </div>
    </div>
  );
}
