import * as UI from "@registry/ui/input-group";

export default function InputGroupDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="input-group"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-3">
        <UI.InputGroup>
          <UI.InputGroupAddon>@</UI.InputGroupAddon>
          <UI.InputGroupInput
            aria-label={text("用户名", "User name")}
            placeholder={text("输入名称…", "Enter a name…")}
          />
          <UI.InputGroupAddon align="inline-end">
            <UI.InputGroupText>.example</UI.InputGroupText>
          </UI.InputGroupAddon>
        </UI.InputGroup>
        <UI.InputGroup data-disabled>
          <UI.InputGroupInput
            disabled
            aria-label={text("不可用", "Unavailable")}
            value="Example"
          />
        </UI.InputGroup>
      </div>
    </div>
  );
}
