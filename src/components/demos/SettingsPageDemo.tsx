import { useId, useState } from "react";
import * as UI from "@registry/blocks/settings-page";
import { Input } from "@registry/ui/input";
import { Label } from "@registry/ui/label";

export default function SettingsPageDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div
      id="preview"
      data-demo="settings-page"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.SettingsPage
        title={text("设置", "Settings")}
        description={text("编辑草稿后保存。", "Edit a draft, then save.")}
        saveLabel={text("保存", "Save")}
        savingLabel={text("保存中…", "Saving…")}
        saving={saving}
        status={saved ? text("已保存示例", "Example saved") : undefined}
        onSave={(event) => {
          event.preventDefault();
          setSaving(true);
          setTimeout(() => {
            setSaving(false);
            setSaved(true);
          }, 500);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor={id}>{text("显示名称", "Display name")}</Label>
          <Input id={id} defaultValue="Example" />
        </div>
      </UI.SettingsPage>
    </div>
  );
}
