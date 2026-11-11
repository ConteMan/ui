import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable, type DataTableLabels } from "@registry/blocks/data-table";
import { Button } from "@registry/ui/button";

type RecordRow = { name: string; category: string; status: string };

export default function DataTableDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const [state, setState] = useState("ready");
  const data = useMemo<RecordRow[]>(() => [
    { name: "Button", category: english ? "Basics" : "基础", status: english ? "Available" : "可使用" },
    { name: "Input", category: english ? "Forms" : "表单", status: english ? "Dependency" : "依赖项" },
    { name: "Table", category: english ? "Data display" : "数据展示", status: english ? "Dependency" : "依赖项" },
    { name: "DataTable", category: english ? "Data display" : "数据展示", status: english ? "Available" : "可使用" },
    { name: "Theme", category: english ? "Theme" : "主题", status: english ? "Available" : "可使用" },
    { name: "Utils", category: english ? "Utilities" : "工具函数", status: english ? "Dependency" : "依赖项" },
    { name: "Dialog", category: english ? "Overlays" : "浮层", status: english ? "Demo only" : "仅用于演示" },
  ], [english]);
  const columns = useMemo<ColumnDef<RecordRow>[]>(() => [
    { accessorKey: "name", header: english ? "Component" : "组件名称", cell: ({ row }) => <span className="font-medium">{row.original.name}</span> },
    { accessorKey: "category", header: english ? "Category" : "分类" },
    { accessorKey: "status", header: english ? "Status" : "状态" },
  ], [english]);
  const labels: DataTableLabels = {
    table: english ? "Illustrative component inventory" : "组件清单示例数据",
    search: english ? "Search components" : "搜索组件",
    searchPlaceholder: english ? "Search name, category or status…" : "搜索名称、分类或状态…",
    pagination: english ? "Table pagination" : "表格分页",
    previous: english ? "Previous" : "上一页", next: english ? "Next" : "下一页",
    empty: english ? "No results. Try another search." : "没有找到结果，试试其他关键词。",
    loading: english ? "Loading component list…" : "正在加载组件清单…",
    range: (start, end, total) => english ? `${start}–${end} of ${total}` : `第 ${start}–${end} 条，共 ${total} 条`,
  };
  return (
    <div data-demo="data-table" className="conteman-preview space-y-5 border border-border p-4 sm:p-6">
      <div role="group" aria-label={english ? "Preview state" : "预览状态"} className="flex flex-wrap gap-2">
        {[["ready", english ? "Default" : "默认"], ["loading", english ? "Loading" : "加载中"], ["empty", english ? "Empty" : "空状态"], ["error", english ? "Error" : "错误"]].map(([value, label]) => (
          <Button key={value} className="min-h-11" variant={value === state ? "secondary" : "ghost"} aria-pressed={value === state} onClick={() => setState(value)}>{label}</Button>
        ))}
      </div>
      <DataTable
        data={state === "empty" ? [] : data}
        columns={columns}
        labels={labels}
        pageSize={4}
        loading={state === "loading"}
        error={state === "error" ? <div className="flex flex-wrap items-center gap-3"><span>{english ? "Could not load the list. Please retry." : "清单加载失败，请重试。"}</span><Button variant="outline" className="min-h-11" onClick={() => setState("ready")}>{english ? "Retry" : "重试"}</Button></div> : undefined}
      />
      <p className="text-xs text-muted-foreground">{english ? "Illustrative data. Search and pagination run locally in this demo." : "示例数据。搜索与分页在本地执行，不发送网络请求。"}</p>
    </div>
  );
}
