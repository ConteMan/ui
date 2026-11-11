import { useId } from "react";
import * as UI from "@registry/ui/input";
import { Label } from "@registry/ui/label";

export default function InputDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();

  return (
    <div
      id="preview"
      data-demo="input"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-3">
        <Label htmlFor={id}>{text("项目名称", "Project name")}</Label>
        <UI.Input id={id} placeholder={text("输入名称…", "Enter a name…")} />
        <UI.Input
          aria-label={text("禁用输入", "Disabled input")}
          disabled
          value="Example"
        />
        <UI.Input
          aria-label={text("错误示例", "Invalid example")}
          aria-invalid="true"
          aria-describedby={id + "-error"}
          defaultValue="!"
        />
        <p id={id + "-error"} role="alert" className="text-destructive">
          {text("名称至少两个字符。", "Use at least two characters.")}
        </p>
      </div>
    </div>
  );
}
