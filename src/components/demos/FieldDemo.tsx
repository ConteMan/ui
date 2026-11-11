import { useId } from "react";
import * as UI from "@registry/ui/field";
import { Input } from "@registry/ui/input";

export default function FieldDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();

  return (
    <div
      id="preview"
      data-demo="field"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.FieldSet>
        <UI.FieldLegend>{text("个人资料", "Profile")}</UI.FieldLegend>
        <UI.FieldDescription>
          {text(
            "示例表单，不会提交数据。",
            "Illustrative form; no data is sent.",
          )}
        </UI.FieldDescription>
        <UI.FieldGroup>
          <UI.Field>
            <UI.FieldLabel htmlFor={id}>{text("名称", "Name")}</UI.FieldLabel>
            <Input id={id} defaultValue="Alex" />
          </UI.Field>
          <UI.Field data-invalid>
            <UI.FieldLabel htmlFor={id + "-invalid"}>
              {text("别名", "Alias")}
            </UI.FieldLabel>
            <Input
              id={id + "-invalid"}
              aria-invalid="true"
              aria-describedby={id + "-error"}
              defaultValue="!"
            />
            <UI.FieldError id={id + "-error"}>
              {text("至少两个字符", "At least two characters")}
            </UI.FieldError>
          </UI.Field>
        </UI.FieldGroup>
      </UI.FieldSet>
    </div>
  );
}
