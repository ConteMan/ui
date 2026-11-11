import * as UI from "@registry/ui/checkbox";

export default function CheckboxDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="checkbox"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-4">
        <label className="flex min-h-11 items-center gap-3">
          <UI.Checkbox defaultChecked />
          {text("接收更新", "Receive updates")}
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <UI.Checkbox indeterminate />
          {text("部分选中", "Partially selected")}
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <UI.Checkbox disabled />
          {text("不可用", "Unavailable")}
        </label>
      </div>
    </div>
  );
}
