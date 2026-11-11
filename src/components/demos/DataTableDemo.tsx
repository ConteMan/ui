import { useEffect, useMemo, useState } from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import {
  DataTable,
  DataTableActionBar,
  FacetedFilter,
} from "@registry/blocks/data-table";
import { Button } from "@registry/ui/button";
import { useTableLabels } from "./table-labels";

type RecordRow = { id: string; name: string; category: string; status: string };

export default function DataTableDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);
  const [state, setState] = useState("ready");
  const [server, setServer] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState<RowSelectionState>({});
  const [pending, setPending] = useState(false);
  const data = useMemo<RecordRow[]>(
    () => [
      {
        id: "1",
        name: "Button",
        category: english ? "Basics" : "基础",
        status: english ? "Available" : "可使用",
      },
      {
        id: "2",
        name: "Input",
        category: english ? "Forms" : "表单",
        status: english ? "Available" : "可使用",
      },
      {
        id: "3",
        name: "Table",
        category: english ? "Data display" : "数据展示",
        status: english ? "Available" : "可使用",
      },
      {
        id: "4",
        name: "DataTable",
        category: english ? "Data display" : "数据展示",
        status: english ? "Available" : "可使用",
      },
      {
        id: "5",
        name: "Theme",
        category: english ? "Theme" : "主题",
        status: english ? "Available" : "可使用",
      },
      {
        id: "6",
        name: "Dialog",
        category: english ? "Overlays" : "浮层",
        status: english ? "Available" : "可使用",
      },
      {
        id: "7",
        name: "Sheet",
        category: english ? "Overlays" : "浮层",
        status: english ? "Available" : "可使用",
      },
      {
        id: "8",
        name: "Select",
        category: english ? "Forms" : "表单",
        status: english ? "Available" : "可使用",
      },
      {
        id: "9",
        name: "Badge",
        category: english ? "Basics" : "基础",
        status: english ? "Available" : "可使用",
      },
    ],
    [english],
  );
  const columns = useMemo<ColumnDef<RecordRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: english ? "Component" : "组件名称",
        enableHiding: false,
        cell: ({ row }) => (
          <span className="font-medium">{row.original.name}</span>
        ),
      },
      { accessorKey: "category", header: english ? "Category" : "分类" },
      { accessorKey: "status", header: english ? "Status" : "状态" },
    ],
    [english],
  );
  const filtered = useMemo(() => {
    const result = data.filter(
      (row) =>
        Object.values(row).some((value) =>
          value.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ) &&
        columnFilters.every(
          (filter) => row[filter.id as keyof RecordRow] === filter.value,
        ),
    );
    const sort = sorting[0];
    if (sort)
      result.sort(
        (left, right) =>
          String(left[sort.id as keyof RecordRow]).localeCompare(
            String(right[sort.id as keyof RecordRow]),
          ) * (sort.desc ? -1 : 1),
      );
    return result;
  }, [data, search, sorting, columnFilters]);
  const [response, setResponse] = useState({
    data: data.slice(0, 4),
    total: data.length,
  });
  useEffect(() => {
    if (!server) return;
    setPending(true);
    const timer = setTimeout(() => {
      setResponse({
        data: filtered.slice(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize,
        ),
        total: filtered.length,
      });
      setPending(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [server, filtered, pagination]);
  const labels = useTableLabels(locale);
  const category = String(
    columnFilters.find((filter) => filter.id === "category")?.value ?? "",
  );
  const selectedCount = Object.values(selection).filter(Boolean).length;
  return (
    <div
      data-demo="data-table"
      className="conteman-preview min-w-0 space-y-5 border border-border p-4 sm:p-6"
    >
      <div
        role="group"
        aria-label={text("预览状态", "Preview state")}
        className="flex flex-wrap gap-2"
      >
        {[
          ["ready", text("默认", "Default")],
          ["loading", text("加载中", "Loading")],
          ["refreshing", text("刷新中", "Refreshing")],
          ["empty", text("空状态", "Empty")],
          ["error", text("错误", "Error")],
        ].map(([value, label]) => (
          <Button
            key={value}
            className="min-h-11"
            variant={value === state ? "secondary" : "ghost"}
            aria-pressed={value === state}
            onClick={() => setState(value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        className="min-h-11"
        aria-pressed={server}
        onClick={() => {
          setServer(!server);
          setPagination({ pageIndex: 0, pageSize: 4 });
          setSelection({});
        }}
      >
        {server
          ? text("受控服务端模式", "Controlled server mode")
          : text("客户端模式", "Client mode")}
      </Button>
      {selectedCount > 0 && (
        <DataTableActionBar
          label={text("所选行操作", "Selected row actions")}
          summary={text(
            `已选择 ${selectedCount} 行`,
            `${selectedCount} selected`,
          )}
          clearLabel={text("清除选择", "Clear selection")}
          onClear={() => setSelection({})}
        >
          <Button variant="outline" onClick={() => setSelection({})}>
            {text("处理示例", "Process example")}
          </Button>
        </DataTableActionBar>
      )}
      <div className="h-[32rem] min-h-0">
        <DataTable
          data={state === "empty" ? [] : server ? response.data : data}
          columns={columns}
          labels={labels}
          fillHeight
          enableColumnResizing
          enableRowSelection
          searchShortcut
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          globalFilter={search}
          onGlobalFilterChange={setSearch}
          rowSelection={selection}
          onRowSelectionChange={setSelection}
          getRowId={(row) => row.id}
          manualPagination={server}
          manualSorting={server}
          manualFiltering={server}
          rowCount={state === "empty" ? 0 : server ? response.total : undefined}
          refreshing={state === "refreshing" || (server && pending)}
          loading={state === "loading"}
          pageSizeOptions={[4, 8, 20]}
          toolbar={(table) => (
            <FacetedFilter
              label={text("分类", "Category")}
              value={category}
              options={[...new Set(data.map((row) => row.category))].map(
                (value) => ({
                  value,
                  label: value,
                  count: data.filter((row) => row.category === value).length,
                }),
              )}
              onChange={(value) =>
                table.getColumn("category")?.setFilterValue(value || undefined)
              }
              allLabel={text("全部", "All")}
              searchLabel={text("搜索分类", "Search categories")}
              emptyLabel={text("没有匹配选项", "No matching options")}
              disabled={state === "loading"}
            />
          )}
          error={
            state === "error" ? (
              <div className="flex flex-wrap items-center gap-3">
                <span>
                  {text(
                    "清单加载失败，请重试。",
                    "Could not load the list. Please retry.",
                  )}
                </span>
                <Button
                  variant="outline"
                  className="min-h-11"
                  onClick={() => setState("ready")}
                >
                  {text("重试", "Retry")}
                </Button>
              </div>
            ) : undefined
          }
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {server
          ? text(
              "模拟服务端响应（350ms）。组件只发送受控回调，示例负责筛选、排序和切片。",
              "Simulated server response (350ms). Controlled callbacks drive filtering, sorting and slicing in the demo.",
            )
          : text(
              "示例数据。搜索、排序、筛选与分页在本地执行。",
              "Illustrative data. Search, sorting, filters and pagination run locally.",
            )}
      </p>
      <output data-query className="block overflow-x-auto text-xs">
        {JSON.stringify({
          mode: server ? "server" : "client",
          pagination,
          sorting,
          columnFilters,
          search,
        })}
      </output>
    </div>
  );
}
