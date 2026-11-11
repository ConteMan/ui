import * as UI from "@registry/ui/separator";

export default function SeparatorDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="separator"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-4">
        <p>{text("账户", "Account")}</p>
        <UI.Separator />
        <p>{text("偏好设置", "Preferences")}</p>
        <div className="flex h-8 items-center gap-3">
          <span>A</span>
          <UI.Separator orientation="vertical" />
          <span>B</span>
        </div>
      </div>
    </div>
  );
}
