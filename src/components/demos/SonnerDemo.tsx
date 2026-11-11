import { useState, useEffect } from "react";
import * as UI from "@registry/ui/sonner";
import { Button } from "@registry/ui/button";
import { toast } from "sonner";

export default function SonnerDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const update = () =>
      setTheme(
        document.documentElement.dataset.mode === "dark" ? "dark" : "light",
      );
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div
      id="preview"
      data-demo="sonner"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="flex flex-wrap gap-3">
        <UI.Toaster
          theme={theme}
          containerAriaLabel={text("通知", "Notifications")}
          closeButton
          closeButtonAriaLabel={text("关闭通知", "Dismiss notification")}
        />
        <Button
          onClick={() => toast.success(text("已保存示例", "Example saved"))}
        >
          {text("成功通知", "Success notification")}
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error(text("保存失败，请重试", "Save failed; try again"))
          }
        >
          {text("错误通知", "Error notification")}
        </Button>
      </div>
    </div>
  );
}
