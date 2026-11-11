import * as UI from "@registry/ui/tooltip";
import { Button } from "@registry/ui/button";

export default function TooltipDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="tooltip"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.TooltipProvider>
        <UI.Tooltip>
          <UI.TooltipTrigger
            render={<Button variant="outline" className="min-h-11" />}
          >
            {text("悬停或聚焦", "Hover or focus")}
          </UI.TooltipTrigger>
          <UI.TooltipContent>
            {text(
              "键盘焦点同样显示说明。",
              "Keyboard focus also reveals this hint.",
            )}
          </UI.TooltipContent>
        </UI.Tooltip>
      </UI.TooltipProvider>
    </div>
  );
}
