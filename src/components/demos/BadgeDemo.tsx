import * as UI from "@registry/ui/badge";

export default function BadgeDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="badge"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="flex flex-wrap gap-3">
        {(["default", "secondary", "outline", "destructive"] as const).map(
          (variant) => (
            <UI.Badge key={variant} variant={variant}>
              {text("状态", "Status")} · {variant}
            </UI.Badge>
          ),
        )}
      </div>
    </div>
  );
}
