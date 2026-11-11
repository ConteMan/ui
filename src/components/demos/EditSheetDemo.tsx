import { useId, useState } from "react";
import * as UI from "@registry/blocks/edit-sheet";
import { Button } from "@registry/ui/button";
import { Input } from "@registry/ui/input";
import { Label } from "@registry/ui/label";

export default function EditSheetDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const id = useId();
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div
      id="preview"
      data-demo="edit-sheet"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-3">
        <Button
          onClick={() => {
            setOpen(true);
            setSaved(false);
          }}
        >
          {text("编辑项目", "Edit project")}
        </Button>
        <Button
          variant="outline"
          onClick={() => setEmpty(!empty)}
          aria-pressed={empty}
        >
          {text("模拟保存失败", "Simulate save failure")}
        </Button>
        {saved && <p role="status">{text("已保存示例", "Example saved")}</p>}
        <UI.EditSheet
          open={open}
          onOpenChange={setOpen}
          title={text("编辑项目", "Edit project")}
          description={text(
            "更改仅影响此预览。",
            "Changes only affect this preview.",
          )}
          saveLabel={text("保存", "Save")}
          savingLabel={text("保存中…", "Saving…")}
          cancelLabel={text("取消", "Cancel")}
          closeLabel={text("关闭", "Close")}
          saving={saving}
          error={
            error
              ? text("保存失败，请重试。", "Save failed; please retry.")
              : undefined
          }
          onSave={(event) => {
            event.preventDefault();
            setSaving(true);
            setTimeout(() => {
              setSaving(false);
              if (empty) setError(true);
              else {
                setSaved(true);
                setOpen(false);
                setError(false);
              }
            }, 500);
          }}
        >
          <Label htmlFor={id}>{text("名称", "Name")}</Label>
          <Input id={id} required defaultValue="Example" />
        </UI.EditSheet>
      </div>
    </div>
  );
}
