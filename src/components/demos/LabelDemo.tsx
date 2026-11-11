import { useId } from "react";
import * as UI from "@registry/ui/label";
import { Input } from "@registry/ui/input";

export default function LabelDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();
  return (
    <div
      id="preview"
      data-demo="label"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-2">
        <UI.Label htmlFor={id}>{text("显示名称", "Display name")}</UI.Label>
        <Input id={id} defaultValue="Alex" />
        <UI.Label htmlFor={id + "-disabled"}>
          {text("不可编辑", "Read only")}
        </UI.Label>
        <Input id={id + "-disabled"} value="Alex" disabled />
      </div>
    </div>
  );
}
