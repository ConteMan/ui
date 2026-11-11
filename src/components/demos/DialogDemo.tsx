import { useState } from "react";
import * as UI from "@registry/ui/dialog";
import { Button } from "@registry/ui/button";

export default function DialogDemo({
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
      data-demo="dialog"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Dialog>
        <UI.DialogTrigger render={<Button className="min-h-11" />}>
          {text("打开弹层", "Open dialog")}
        </UI.DialogTrigger>
        <UI.DialogContent closeLabel={text("关闭", "Close")}>
          <UI.DialogHeader>
            <UI.DialogTitle>
              {text("确认更改", "Confirm changes")}
            </UI.DialogTitle>
            <UI.DialogDescription>
              {text(
                "此操作仅更新预览状态。",
                "This action only updates the preview.",
              )}
            </UI.DialogDescription>
          </UI.DialogHeader>
          <UI.DialogFooter>
            <UI.DialogClose render={<Button variant="outline" />}>
              {text("取消", "Cancel")}
            </UI.DialogClose>
            <UI.DialogClose render={<Button onClick={() => setEmpty(true)} />}>
              {text("确认", "Confirm")}
            </UI.DialogClose>
          </UI.DialogFooter>
        </UI.DialogContent>
      </UI.Dialog>
    </div>
  );
}
