import { useMemo, useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export type DataTableLabels = {
  table: string;
  search: string;
  searchPlaceholder: string;
  pagination: string;
  previous: string;
  next: string;
  empty: ReactNode;
  loading: ReactNode;
  range: (start: number, end: number, total: number) => string;
};

export type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  labels: DataTableLabels;
  pageSize?: number;
  loading?: boolean;
  error?: ReactNode;
  toolbar?: ReactNode;
};

export function DataTable<TData, TValue>({
  data, columns, labels, pageSize = 5, loading = false, error, toolbar,
}: DataTableProps<TData, TValue>) {
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const normalizedSize = Math.max(1, Math.floor(pageSize) || 1);
  const filteredModel = useMemo(() => getFilteredRowModel<TData>(), []);
  const table = useReactTable({
    data, columns,
    state: { globalFilter: search, pagination: { pageIndex, pageSize: normalizedSize } },
    onGlobalFilterChange: setSearch,
    onPaginationChange: (updater) => {
      const previous = { pageIndex, pageSize: normalizedSize };
      setPageIndex((typeof updater === "function" ? updater(previous) : updater).pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: filteredModel,
    getPaginationRowModel: getPaginationRowModel(),
  });
  const total = table.getFilteredRowModel().rows.length;
  const lastPage = Math.max(0, Math.ceil(total / normalizedSize) - 1);
  const safePageIndex = Math.min(pageIndex, lastPage);
  if (safePageIndex !== pageIndex) setPageIndex(safePageIndex);
  const start = total ? safePageIndex * normalizedSize + 1 : 0;
  const end = Math.min((safePageIndex + 1) * normalizedSize, total);
  const busy = loading || Boolean(error);

  return (
    <div data-slot="data-table" className="space-y-4 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          aria-label={labels.search}
          placeholder={labels.searchPlaceholder}
          value={search}
          disabled={loading}
          className="min-h-11 max-w-sm text-sm"
          onChange={(event) => { setSearch(event.target.value); setPageIndex(0); }}
        />
        {toolbar}
      </div>
      {error && <div role="alert" className="text-destructive">{error}</div>}
      <div className="border border-border" aria-busy={loading}>
        <Table aria-label={labels.table}>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id} scope="col">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading || !table.getRowModel().rows.length ? (
              <TableRow>
                <TableCell colSpan={Math.max(columns.length, 1)} className="h-28 text-center text-muted-foreground">
                  <span role="status">{loading ? labels.loading : labels.empty}</span>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-12">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <nav aria-label={labels.pagination} className="flex flex-wrap items-center justify-between gap-3">
        <span role="status" aria-live="polite" className="text-xs text-muted-foreground tabular-nums">
          {labels.range(start, end, total)}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" className="min-h-11 min-w-11" disabled={busy || !table.getCanPreviousPage()} onClick={() => table.previousPage()}>{labels.previous}</Button>
          <Button variant="outline" className="min-h-11 min-w-11" disabled={busy || !table.getCanNextPage()} onClick={() => table.nextPage()}>{labels.next}</Button>
        </div>
      </nav>
    </div>
  );
}
