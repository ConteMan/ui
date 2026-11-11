import { useState } from "react";
import * as UI from "@registry/blocks/detail";

export default function DetailDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [empty, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="detail"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="space-y-4">
        <UI.PageHeader
          title={text("示例项目", "Example project")}
          secondary="Project 001"
          status={
            <UI.StatusBadge>{text("可使用", "Available")}</UI.StatusBadge>
          }
          copy={
            <UI.CopyableId
              value="project-001"
              label={text("复制编号", "Copy ID")}
              copiedLabel={text("已复制", "Copied")}
              failedLabel={text("复制失败", "Copy failed")}
            />
          }
        />
        <UI.DescriptionList>
          <UI.DescriptionItem label={text("名称", "Name")}>
            Example
          </UI.DescriptionItem>
          <UI.DescriptionItem label={text("版本", "Version")}>
            1.0.0
          </UI.DescriptionItem>
        </UI.DescriptionList>
        <UI.ActionsMenu
          label={text("操作", "Actions")}
          actions={[
            {
              label: text("查看详情", "View details"),
              onSelect: () => setEmpty(!empty),
            },
          ]}
        />
        {empty && (
          <p role="status">{text("已打开详情预览", "Detail preview opened")}</p>
        )}
      </div>
    </div>
  );
}
