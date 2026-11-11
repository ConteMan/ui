import { Button } from "@registry/ui/button";

export default function ThemeDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  return (
    <div className="conteman-preview space-y-5 border border-border p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["background", "primary", "secondary", "muted"].map((token) => (
          <div key={token} className="space-y-2">
            <div
              className="h-16 border border-border"
              style={{ background: `var(--${token})` }}
            />
            <span className="text-xs">{token}</span>
          </div>
        ))}
      </div>
      <Button
        className="min-h-11"
        onClick={() =>
          document
            .querySelector<HTMLButtonElement>("[data-nb-theme-toggle]")
            ?.click()
        }
      >
        {locale === "en" ? "Switch theme" : "切换主题"}
      </Button>
    </div>
  );
}
