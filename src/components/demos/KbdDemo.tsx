import * as UI from "@registry/ui/kbd";

export default function KbdDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="kbd"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span>{text("查找", "Find")}</span>
        <UI.KbdGroup>
          <UI.Kbd>⌘</UI.Kbd>
          <UI.Kbd>K</UI.Kbd>
        </UI.KbdGroup>
        <UI.Kbd>/</UI.Kbd>
      </div>
    </div>
  );
}
