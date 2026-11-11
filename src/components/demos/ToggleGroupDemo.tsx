import * as UI from "@registry/ui/toggle-group";

export default function ToggleGroupDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="toggle-group"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.ToggleGroup
        multiple
        defaultValue={["bold"]}
        aria-label={text("格式", "Formatting")}
      >
        <UI.ToggleGroupItem value="bold" aria-label={text("加粗", "Bold")}>
          B
        </UI.ToggleGroupItem>
        <UI.ToggleGroupItem value="italic" aria-label={text("斜体", "Italic")}>
          <em>I</em>
        </UI.ToggleGroupItem>
        <UI.ToggleGroupItem value="disabled" disabled>
          {text("不可用", "Unavailable")}
        </UI.ToggleGroupItem>
      </UI.ToggleGroup>
    </div>
  );
}
