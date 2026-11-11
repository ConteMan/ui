import { useState } from "react";
import * as UI from "@registry/ui/progress";
import { Button } from "@registry/ui/button";

export default function ProgressDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [amount, setAmount] = useState(30);
  return (
    <div
      id="preview"
      data-demo="progress"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-5">
        <UI.Progress value={amount} aria-label={text("完成进度", "Completion")}>
          <UI.ProgressLabel>{text("完成进度", "Completion")}</UI.ProgressLabel>
          <UI.ProgressValue />
        </UI.Progress>
        <Button
          variant="outline"
          onClick={() => setAmount(amount >= 100 ? 0 : amount + 10)}
        >
          {text("增加 10%", "Add 10%")}
        </Button>
        <UI.Progress value={null} aria-label={text("准备中", "Preparing")} />
      </div>
    </div>
  );
}
