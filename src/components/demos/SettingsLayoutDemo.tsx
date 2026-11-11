import { useId, useState } from "react";
import * as UI from "@registry/blocks/settings-layout";
import { Input } from "@registry/ui/input";

export default function SettingsLayoutDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();
  const [amount, setAmount] = useState(30);
  return (
    <div
      id="preview"
      data-demo="settings-layout"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.SettingsLayout>
        <UI.SettingsSection title={text("同步设置", "Sync settings")}>
          <UI.SettingsRow onSubmit={(event) => event.preventDefault()}>
            <UI.SettingsName
              htmlFor={id}
              name={text("间隔", "Interval")}
              details={text(
                "更改仅影响预览。",
                "Changes only affect this preview.",
              )}
              detailsLabel={text("间隔说明", "Interval details")}
            />
            <UI.SettingsControls
              unit={text("分钟", "minutes")}
              actions={
                <UI.SettingsReset
                  label={text("恢复 15 分钟", "Reset to 15 minutes")}
                  onClick={() => setAmount(15)}
                />
              }
            >
              <Input
                id={id}
                type="number"
                min={1}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                className="w-24"
              />
            </UI.SettingsControls>
          </UI.SettingsRow>
        </UI.SettingsSection>
      </UI.SettingsLayout>
    </div>
  );
}
