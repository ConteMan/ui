import * as UI from "@registry/ui/toggle";

export default function ToggleDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="toggle"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="flex flex-wrap gap-3">
        <UI.Toggle
          aria-label={text("加粗", "Bold")}
          variant="outline"
          className="min-h-11 min-w-11"
        >
          B
        </UI.Toggle>
        <UI.Toggle
          aria-label={text("斜体", "Italic")}
          defaultPressed
          className="min-h-11 min-w-11"
        >
          <em>I</em>
        </UI.Toggle>
        <UI.Toggle disabled aria-label={text("不可用", "Unavailable")}>
          U
        </UI.Toggle>
      </div>
    </div>
  );
}
