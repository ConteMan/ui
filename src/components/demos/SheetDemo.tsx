import { useId } from "react";
import * as UI from "@registry/ui/sheet";
import { Button } from "@registry/ui/button";
import { Input } from "@registry/ui/input";
import { Label } from "@registry/ui/label";

export default function SheetDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();
  return (
    <div
      id="preview"
      data-demo="sheet"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Sheet>
        <UI.SheetTrigger render={<Button className="min-h-11" />}>
          {text("打开侧面板", "Open sheet")}
        </UI.SheetTrigger>
        <UI.SheetContent closeLabel={text("关闭", "Close")}>
          <UI.SheetHeader>
            <UI.SheetTitle>{text("编辑项目", "Edit project")}</UI.SheetTitle>
            <UI.SheetDescription>
              {text(
                "通过 Escape 或关闭按钮返回。",
                "Use Escape or the close button to return.",
              )}
            </UI.SheetDescription>
          </UI.SheetHeader>
          <div className="grid gap-3 p-4">
            <Label htmlFor={id}>{text("名称", "Name")}</Label>
            <Input id={id} defaultValue="Example" />
          </div>
          <UI.SheetFooter>
            <UI.SheetClose render={<Button />}>
              {text("完成", "Done")}
            </UI.SheetClose>
          </UI.SheetFooter>
        </UI.SheetContent>
      </UI.Sheet>
    </div>
  );
}
