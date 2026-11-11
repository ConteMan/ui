import { useId } from "react";
import * as UI from "@registry/ui/popover";
import { Button } from "@registry/ui/button";
import { Input } from "@registry/ui/input";
import { Label } from "@registry/ui/label";

export default function PopoverDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();
  return (
    <div
      id="preview"
      data-demo="popover"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Popover>
        <UI.PopoverTrigger
          render={<Button variant="outline" className="min-h-11" />}
        >
          {text("打开选项", "Open options")}
        </UI.PopoverTrigger>
        <UI.PopoverContent>
          <UI.PopoverTitle>
            {text("显示选项", "Display options")}
          </UI.PopoverTitle>
          <UI.PopoverDescription>
            {text("选项由调用方定义。", "Options are defined by the caller.")}
          </UI.PopoverDescription>
          <Label htmlFor={id}>{text("名称", "Name")}</Label>
          <Input id={id} defaultValue="Example" />
        </UI.PopoverContent>
      </UI.Popover>
    </div>
  );
}
