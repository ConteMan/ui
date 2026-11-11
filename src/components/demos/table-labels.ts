import type { DataTableLabels } from "@registry/blocks/data-table";

export function useTableLabels(locale: "zh" | "en"): DataTableLabels {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  return {
    table: text("组件清单示例数据", "Illustrative component inventory"),
    search: text("搜索组件", "Search components"),
    searchPlaceholder: text(
      "搜索名称、分类或状态…",
      "Search name, category or status…",
    ),
    clearSearch: text("清除搜索", "Clear search"),
    pagination: text("表格分页", "Table pagination"),
    first: text("首页", "First"),
    previous: text("上一页", "Previous"),
    next: text("下一页", "Next"),
    last: text("末页", "Last"),
    pageSize: text("每页条数", "Rows per page"),
    columns: text("列设置", "Column settings"),
    resetColumns: text("重置列", "Reset columns"),
    resetWidths: text("重置列宽", "Reset widths"),
    density: text("密度", "Density"),
    comfortable: text("舒适", "Comfortable"),
    compact: text("紧凑", "Compact"),
    selectAll: text("选择本页所有行", "Select all rows on this page"),
    selectRow: (index) => text(`选择第 ${index} 行`, `Select row ${index}`),
    resizeColumn: (column) => text(`调整 ${column} 列宽`, `Resize ${column}`),
    refreshing: text(
      "正在刷新，保留已有数据…",
      "Refreshing; keeping current data…",
    ),
    empty: text(
      "没有找到结果，试试其他关键词。",
      "No results. Try another search.",
    ),
    loading: text("正在加载组件清单…", "Loading component list…"),
    range: (start, end, total) =>
      text(
        `第 ${start}–${end} 条，共 ${total} 条`,
        `${start}–${end} of ${total}`,
      ),
  };
}
