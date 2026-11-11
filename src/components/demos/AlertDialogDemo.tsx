import { useState } from "react";
import * as UI from "@registry/ui/alert-dialog";
import { Button } from "@registry/ui/button";

export default function AlertDialogDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="alert-dialog"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.AlertDialog>
        <UI.AlertDialogTrigger
          render={<Button variant="destructive" className="min-h-11" />}
        >
          {text("移除示例", "Remove example")}
        </UI.AlertDialogTrigger>
        <UI.AlertDialogContent>
          <UI.AlertDialogHeader>
            <UI.AlertDialogTitle>
              {text("确认移除？", "Remove example?")}
            </UI.AlertDialogTitle>
            <UI.AlertDialogDescription>
              {text(
                "仅演示确认流程，不会删除数据。",
                "Demonstration only; no data is deleted.",
              )}
            </UI.AlertDialogDescription>
          </UI.AlertDialogHeader>
          <UI.AlertDialogFooter>
            <UI.AlertDialogCancel>
              {text("取消", "Cancel")}
            </UI.AlertDialogCancel>
            <UI.AlertDialogAction onClick={() => setEmpty(true)}>
              {text("移除", "Remove")}
            </UI.AlertDialogAction>
          </UI.AlertDialogFooter>
        </UI.AlertDialogContent>
      </UI.AlertDialog>
    </div>
  );
}
