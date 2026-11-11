import { useId } from "react";
import * as UI from "@registry/ui/textarea";
import { Label } from "@registry/ui/label";

export default function TextareaDemo({
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
      data-demo="textarea"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-3">
        <Label htmlFor={id}>{text("备注", "Notes")}</Label>
        <UI.Textarea id={id} placeholder={text("补充说明…", "Add details…")} />
        <UI.Textarea
          aria-label={text("禁用备注", "Disabled notes")}
          disabled
          defaultValue={text("不可编辑", "Read only")}
        />
        <UI.Textarea
          aria-label={text("错误备注", "Invalid notes")}
          aria-invalid="true"
          defaultValue="!"
        />
      </div>
    </div>
  );
}
