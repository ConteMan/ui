import { useId, useState } from "react";
import {
  ActivityIcon,
  BoxIcon,
  CircleHelpIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
} from "lucide-react";
import { AdminPageSticky, AdminShell } from "@registry/blocks/admin-shell";
import { Button } from "@registry/ui/button";
import { Input } from "@registry/ui/input";
import { Label } from "@registry/ui/label";

export default function AdminShellDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const text = (zh: string, en: string) => (locale === "en" ? en : zh);
  const fieldId = useId();
  const [selected, setSelected] = useState("overview");
  const [expandedStatus, setExpandedStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const titles = {
    overview: text("工作区概览", "Workspace overview"),
    projects: text("项目", "Projects"),
    settings: text("设置", "Settings"),
    help: text("帮助", "Help"),
  };
  const item = (id: keyof typeof titles, icon: React.ReactNode) => ({
    id,
    label: titles[id],
    icon,
    active: selected === id,
    onSelect: () => setSelected(id),
  });
  return (
    <div
      id="preview"
      data-demo="admin-shell"
      className="conteman-preview min-w-0 overflow-hidden border border-border"
    >
      <AdminShell
        className="h-[38rem] min-h-0"
        labels={{
          navigation: text("工作区导航", "Workspace navigation"),
          mobileTitle: text("工作区", "Workspace"),
          mobileDescription: text(
            "选择页面以继续。",
            "Choose a page to continue.",
          ),
          openNavigation: text("打开导航", "Open navigation"),
          closeNavigation: text("关闭导航", "Close navigation"),
          expandSidebar: text("展开侧栏", "Expand sidebar"),
          collapseSidebar: text("折叠侧栏", "Collapse sidebar"),
        }}
        brand={(compact) => (
          <div className="flex min-h-11 items-center gap-2 px-3 text-sm font-semibold">
            <BoxIcon className="size-5 shrink-0" aria-hidden="true" />
            {!compact && text("示例工作区", "Example workspace")}
          </div>
        )}
        groups={[
          { id: "overview", items: [item("overview", <HomeIcon />)] },
          {
            id: "workspace",
            title: text("工作区", "Workspace"),
            items: [
              item("projects", <FolderIcon />),
              {
                id: "activity",
                label: text("活动（不可用）", "Activity (unavailable)"),
                icon: <ActivityIcon />,
                disabled: true,
              },
            ],
          },
          {
            id: "system",
            title: text("系统", "System"),
            items: [item("settings", <SettingsIcon />)],
          },
        ]}
        bottomGroups={[
          { id: "support", items: [item("help", <CircleHelpIcon />)] },
        ]}
        footer={(compact) => (
          <div className="flex min-h-11 items-center gap-2 px-2 text-xs text-muted-foreground">
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-foreground"
              aria-label={
                compact ? text("示例账户", "Example account") : undefined
              }
            >
              E
            </span>
            {!compact && text("示例账户", "Example account")}
          </div>
        )}
        header={
          <h2 className="m-0! text-base! font-semibold!">
            {titles[selected as keyof typeof titles]}
          </h2>
        }
      >
        <AdminPageSticky>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              role="status"
              className="min-w-0 flex-1 basis-40 text-xs text-muted-foreground"
            >
              {saving
                ? text("保存中…", "Saving…")
                : saved
                  ? text("已保存此预览", "Preview saved")
                  : expandedStatus
                    ? text(
                        "更改尚未保存。此状态会换行，标题与操作仍一起吸顶，聚焦字段会避让整个吸顶区。",
                        "Changes are unsaved. This status wraps; the heading and actions stay together, and focused fields clear the entire sticky region.",
                      )
                    : text(
                        "所有更改仅保留在此预览",
                        "Changes stay in this preview",
                      )}
            </p>
            <Button
              variant="outline"
              aria-pressed={expandedStatus}
              onClick={() => setExpandedStatus(!expandedStatus)}
            >
              {text("切换状态长度", "Toggle status length")}
            </Button>
            <Button type="submit" form={`${fieldId}-form`} disabled={saving}>
              {text("保存", "Save")}
            </Button>
          </div>
        </AdminPageSticky>
        <form
          id={`${fieldId}-form`}
          className="space-y-6 p-4 md:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSaving(true);
            setTimeout(() => {
              setSaving(false);
              setSaved(true);
            }, 500);
          }}
        >
          <p className="text-sm text-muted-foreground">
            {text(
              "示例内容。滚动表单或用 Tab 移动焦点，观察页头与状态行。",
              "Illustrative content. Scroll the form or move focus with Tab to inspect the heading and status row.",
            )}
          </p>
          <fieldset disabled={saving} className="min-w-0 space-y-6">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`${fieldId}-${index}`}>
                  {text("字段", "Field")} {index + 1}
                </Label>
                <Input
                  id={`${fieldId}-${index}`}
                  name={`field-${index + 1}`}
                  defaultValue={`${text("示例值", "Example value")} ${index + 1}`}
                  onChange={() => setSaved(false)}
                  className="min-h-11"
                />
              </div>
            ))}
          </fieldset>
        </form>
      </AdminShell>
    </div>
  );
}
