import { useState } from "react";
import * as UI from "@registry/blocks/list-page";
import { Button } from "@registry/ui/button";
import { DataTable } from "@registry/blocks/data-table";
import { useTableLabels } from "./table-labels";

export default function ListPageDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [empty, setEmpty] = useState(false);
  const tableLabels = useTableLabels(locale);
  return (
    <div
      id="preview"
      data-demo="list-page"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="h-[32rem]">
        <UI.ListPage
          title={text("项目列表", "Projects")}
          description={text(
            "示例数据，支持本地分页。",
            "Illustrative data with local pagination.",
          )}
          actions={
            <Button onClick={() => setEmpty(!empty)}>
              {text("切换空状态", "Toggle empty state")}
            </Button>
          }
        >
          <DataTable
            fillHeight
            data={
              empty
                ? []
                : [{ name: "Alpha" }, { name: "Beta" }, { name: "Gamma" }]
            }
            columns={[{ accessorKey: "name", header: text("名称", "Name") }]}
            labels={tableLabels}
            pageSize={2}
          />
        </UI.ListPage>
      </div>
    </div>
  );
}
