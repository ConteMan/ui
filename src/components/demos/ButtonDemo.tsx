import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@registry/ui/button";

export default function ButtonDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const [count, setCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const labels = english
    ? ["Primary", "Outline", "Secondary", "Ghost", "Delete", "Link"]
    : ["主要按钮", "描边按钮", "次要按钮", "幽灵按钮", "删除", "链接按钮"];
  return (
    <div
      data-demo="button"
      className="conteman-preview space-y-6 border border-border p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-3">
        {(
          [
            "default",
            "outline",
            "secondary",
            "ghost",
            "destructive",
            "link",
          ] as const
        ).map((variant, index) => (
          <Button
            key={variant}
            variant={variant}
            className="min-h-11"
            onClick={() => setCount((previous) => previous + 1)}
          >
            {labels[index]}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled className="min-h-11">
          {english ? "Disabled" : "不可用"}
        </Button>
        <Button
          className="min-h-11"
          aria-busy={saving}
          disabled={saving}
          onClick={() => {
            setSaving(true);
            setSaved(false);
            window.setTimeout(() => {
              setSaving(false);
              setSaved(true);
            }, 900);
          }}
        >
          {saving
            ? english
              ? "Saving…"
              : "保存中…"
            : saved
              ? english
                ? "Saved"
                : "已保存"
              : english
                ? "Save changes"
                : "保存更改"}
        </Button>
        <Dialog.Root>
          <Dialog.Trigger
            render={<Button variant="outline" className="min-h-11" />}
          >
            {english ? "Open dialog" : "打开弹层"}
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
            <Dialog.Popup className="conteman-preview fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-border p-6 shadow-lg">
              <Dialog.Title className="text-lg font-semibold">
                {english ? "Keyboard-ready dialog" : "可用键盘操作的弹层"}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm text-muted-foreground">
                {english
                  ? "Focus stays inside. Press Escape to close and return focus to the trigger."
                  : "焦点保留在弹层内。按 Escape 关闭，焦点会回到触发按钮。"}
              </Dialog.Description>
              <div className="mt-6 flex justify-end gap-3">
                <Dialog.Close
                  render={<Button variant="outline" className="min-h-11" />}
                >
                  {english ? "Cancel" : "取消"}
                </Dialog.Close>
                <Dialog.Close render={<Button className="min-h-11" />}>
                  {english ? "Confirm" : "确认"}
                </Dialog.Close>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="text-xs text-muted-foreground"
      >
        {english ? `Button clicks: ${count}` : `按钮点击次数：${count}`}
      </p>
    </div>
  );
}
