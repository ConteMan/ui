import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentProps,
} from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnSizingState,
  type OnChangeFn,
  type Table as TableInstance,
} from "@tanstack/react-table";
import { Search, X, ArrowUpDown, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableLabels = {
  table: string;
  search: string;
  searchPlaceholder: string;
  pagination: string;
  previous: string;
  next: string;
  first?: string;
  last?: string;
  pageSize?: string;
  clearSearch?: string;
  columns?: string;
  resetColumns?: string;
  resetWidths?: string;
  density?: string;
  comfortable?: string;
  compact?: string;
  selectAll?: string;
  selectRow?: (index: number) => string;
  resizeColumn?: (column: string) => string;
  refreshing?: ReactNode;
  empty: ReactNode;
  loading: ReactNode;
  range: (start: number, end: number, total: number) => string;
  unknownRange?: (start: number, end: number) => string;
};

export type FilterSearchProps = Omit<
  ComponentProps<typeof Input>,
  "value" | "onChange"
> & {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  clearLabel?: string;
  debounceMs?: number;
  shortcut?: boolean;
};

export function FilterSearch({
  value,
  onValueChange,
  label,
  clearLabel,
  debounceMs = 250,
  shortcut = false,
  className,
  disabled,
  ...props
}: FilterSearchProps) {
  const [draft, setDraft] = useState(value);
  const [composing, setComposing] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const callback = useRef(onValueChange);
  callback.current = onValueChange;
  const pending = useRef(false);
  useEffect(() => {
    pending.current = false;
    setDraft(value);
  }, [value]);
  useEffect(() => {
    if (composing || disabled || !pending.current) return;
    const timer = setTimeout(
      () => {
        pending.current = false;
        callback.current(draft);
      },
      Math.max(0, debounceMs),
    );
    return () => clearTimeout(timer);
  }, [draft, composing, debounceMs, disabled]);
  useEffect(() => {
    if (!shortcut || disabled) return;
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        event.key !== "/" ||
        event.isComposing ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        target?.closest(
          "input,textarea,select,[contenteditable=true],[role=dialog]",
        )
      )
        return;
      event.preventDefault();
      input.current?.focus();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [shortcut, disabled]);
  return (
    <div
      className={cn("relative w-64 max-w-full", className)}
      data-slot="filter-search"
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
      />
      <Input
        {...props}
        ref={input}
        type="search"
        aria-label={label}
        aria-keyshortcuts={shortcut ? "/" : undefined}
        disabled={disabled}
        value={draft}
        className="min-h-11 pl-9 pr-12 [&::-webkit-search-cancel-button]:appearance-none"
        onChange={(event) => {
          pending.current = true;
          setDraft(event.target.value);
        }}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(event) => {
          pending.current = true;
          setDraft(event.currentTarget.value);
          setComposing(false);
        }}
      />
      {draft && clearLabel && (
        <Button
          type="button"
          aria-label={clearLabel}
          disabled={disabled}
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 min-h-11 min-w-11"
          onClick={() => {
            pending.current = false;
            setDraft("");
            callback.current("");
            input.current?.focus();
          }}
        >
          <X aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

export type FilterOption = { value: string; label: string; count?: number };
export function FacetedFilter({
  label,
  hint,
  value,
  options,
  onChange,
  allLabel,
  searchLabel,
  emptyLabel,
  disabled,
}: {
  label: string;
  hint?: ReactNode;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  allLabel: string;
  searchLabel: string;
  emptyLabel: ReactNode;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = [{ value: "", label: allLabel }, ...options].filter(
    (option) =>
      option.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSearch("");
      }}
    >
      <PopoverTrigger
        render={
          <Button variant="outline" disabled={disabled} className="min-h-11" />
        }
        aria-label={label}
        data-filter-value={value}
      >
        {label}
        {value && (
          <span className="ml-2 rounded-none bg-secondary px-1.5 text-secondary-foreground">
            1
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-64 max-w-[calc(100vw-2rem)]"
        align="start"
        aria-label={label}
      >
        <FilterHeading label={label} hint={hint} />
        <Input
          aria-label={searchLabel}
          placeholder={searchLabel}
          value={search}
          className="min-h-11"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div
          className="max-h-64 overflow-y-auto"
          role="group"
          aria-label={label}
        >
          {filtered.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={value === option.value ? "secondary" : "ghost"}
              className="min-h-11 w-full justify-between"
              aria-pressed={value === option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                setSearch("");
              }}
            >
              {option.label}
              {option.count !== undefined && <span>{option.count}</span>}
            </Button>
          ))}
          {!filtered.length && (
            <div role="status" className="p-3 text-muted-foreground">
              {emptyLabel}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function FilterHeading({
  label,
  hint,
}: {
  label: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="mb-3 space-y-1">
      <div className="font-medium">{label}</div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
export function DataTableToolbar({ children }: { children: ReactNode }) {
  return (
    <div
      data-slot="data-table-toolbar"
      className="flex flex-wrap items-center gap-3"
    >
      {children}
    </div>
  );
}
export function DataTableActionBar({
  children,
  label,
  summary,
  clearLabel,
  onClear,
}: {
  children: ReactNode;
  label: string;
  summary: ReactNode;
  clearLabel: string;
  onClear: () => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap items-center gap-3 border p-2"
    >
      <span role="status">{summary}</span>
      {children}
      <Button variant="ghost" onClick={onClear}>
        {clearLabel}
      </Button>
    </div>
  );
}

export type DataTablePaginationProps = {
  pagination: PaginationState;
  total?: number;
  count: number;
  disabled?: boolean;
  onPaginationChange: OnChangeFn<PaginationState>;
  labels: DataTableLabels;
  pageSizeOptions?: number[];
  refreshing?: boolean;
};
export function DataTablePagination({
  pagination,
  total,
  count,
  disabled,
  onPaginationChange,
  labels,
  pageSizeOptions = [10, 20, 50, 100],
  refreshing = false,
}: DataTablePaginationProps) {
  const lastPage =
    total === undefined
      ? undefined
      : Math.max(0, Math.ceil(total / pagination.pageSize) - 1);
  const start = count ? pagination.pageIndex * pagination.pageSize + 1 : 0;
  const end = count ? Math.min(start + count - 1, total ?? Infinity) : 0;
  const settledRange = useRef({ start, end, total });
  useEffect(() => {
    if (!refreshing) settledRange.current = { start, end, total };
  }, [refreshing, start, end, total]);
  const range = refreshing ? settledRange.current : { start, end, total };
  const change = (pageIndex: number) =>
    onPaginationChange({ ...pagination, pageIndex });
  return (
    <nav
      aria-label={labels.pagination}
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <span
        role="status"
        aria-live="polite"
        aria-busy={disabled}
        className="text-xs text-muted-foreground tabular-nums"
      >
        {range.total === undefined
          ? labels.unknownRange?.(range.start, range.end)
          : labels.range(range.start, range.end, range.total)}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {labels.pageSize && (
          <label className="flex items-center gap-2 text-xs">
            {labels.pageSize}
            <select
              aria-label={labels.pageSize}
              className="min-h-11 border bg-background px-2"
              disabled={disabled}
              value={pagination.pageSize}
              onChange={(event) =>
                onPaginationChange({
                  pageIndex: 0,
                  pageSize: Number(event.target.value),
                })
              }
            >
              {[...new Set([...pageSizeOptions, pagination.pageSize])]
                .filter((size) => size > 0)
                .sort((left, right) => left - right)
                .map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
            </select>
          </label>
        )}
        {labels.first && (
          <Button
            variant="outline"
            className="min-h-11"
            disabled={disabled || pagination.pageIndex <= 0}
            onClick={() => change(0)}
          >
            {labels.first}
          </Button>
        )}
        <Button
          variant="outline"
          className="min-h-11"
          disabled={disabled || pagination.pageIndex <= 0}
          onClick={() => change(pagination.pageIndex - 1)}
        >
          {labels.previous}
        </Button>
        <Button
          variant="outline"
          className="min-h-11"
          disabled={
            disabled ||
            (lastPage === undefined
              ? count < pagination.pageSize
              : pagination.pageIndex >= lastPage)
          }
          onClick={() => change(pagination.pageIndex + 1)}
        >
          {labels.next}
        </Button>
        {labels.last && lastPage !== undefined && (
          <Button
            variant="outline"
            className="min-h-11"
            disabled={disabled || pagination.pageIndex >= lastPage}
            onClick={() => change(lastPage)}
          >
            {labels.last}
          </Button>
        )}
      </div>
    </nav>
  );
}

export function ViewOptions<TData>({
  table,
  labels,
  columnLabels = {},
  density,
  onDensityChange,
  disabled,
}: {
  table: TableInstance<TData>;
  labels: DataTableLabels;
  columnLabels?: Record<string, string>;
  density?: "comfortable" | "compact";
  onDensityChange?: (density: "comfortable" | "compact") => void;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="min-h-11" disabled={disabled} />
        }
        aria-label={labels.columns}
      >
        <Settings2 aria-hidden="true" />
        {labels.columns}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64" aria-label={labels.columns}>
        {labels.density && (
          <div
            role="group"
            aria-label={labels.density}
            className="mb-3 flex gap-2"
          >
            {(["comfortable", "compact"] as const).map(
              (value) =>
                labels[value] && (
                  <Button
                    key={value}
                    variant={density === value ? "secondary" : "ghost"}
                    aria-pressed={density === value}
                    onClick={() => onDensityChange?.(value)}
                  >
                    {labels[value]}
                  </Button>
                ),
            )}
          </div>
        )}
        {table
          .getAllLeafColumns()
          .filter((column) => column.id !== "__selection")
          .map((column) => (
            <label key={column.id} className="flex min-h-11 items-center gap-2">
              <Checkbox
                checked={column.getIsVisible()}
                disabled={!column.getCanHide()}
                onCheckedChange={(checked) =>
                  column.toggleVisibility(checked === true)
                }
              />
              {columnLabels[column.id] ??
                (typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id)}
            </label>
          ))}
        {labels.resetColumns && (
          <Button
            variant="ghost"
            className="min-h-11 w-full"
            onClick={() => table.resetColumnVisibility()}
          >
            {labels.resetColumns}
          </Button>
        )}
        {labels.resetWidths && (
          <Button
            variant="ghost"
            className="min-h-11 w-full"
            onClick={() => table.resetColumnSizing()}
          >
            {labels.resetWidths}
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}

export type DataTableProps<TData, TValue = unknown> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  labels: DataTableLabels;
  pageSize?: number;
  loading?: boolean;
  refreshing?: boolean;
  error?: ReactNode;
  toolbar?: ReactNode | ((table: TableInstance<TData>) => ReactNode);
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  rowCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  globalFilter?: string;
  onGlobalFilterChange?: OnChangeFn<string>;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  columnSizing?: ColumnSizingState;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: TData, index: number) => string;
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  fillHeight?: boolean;
  className?: string;
  columnLabels?: Record<string, string>;
  density?: "comfortable" | "compact";
  onDensityChange?: (density: "comfortable" | "compact") => void;
  searchDebounceMs?: number;
  searchShortcut?: boolean;
  showSearch?: boolean;
  pageSizeOptions?: number[];
};

export function DataTable<TData, TValue = unknown>({
  data,
  columns,
  labels,
  pageSize = 5,
  loading = false,
  refreshing = false,
  error,
  toolbar,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  rowCount,
  pagination: controlledPagination,
  onPaginationChange,
  sorting: controlledSorting,
  onSortingChange,
  columnFilters: controlledFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  columnVisibility: controlledVisibility,
  onColumnVisibilityChange,
  columnSizing: controlledSizing,
  onColumnSizingChange,
  rowSelection: controlledSelection,
  onRowSelectionChange,
  getRowId,
  enableRowSelection = false,
  enableColumnResizing = false,
  fillHeight = false,
  className,
  columnLabels,
  density: controlledDensity,
  onDensityChange,
  searchDebounceMs = 250,
  searchShortcut = false,
  showSearch = true,
  pageSizeOptions,
}: DataTableProps<TData, TValue>) {
  const [localPagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: Math.max(1, Math.floor(pageSize) || 1),
  });
  const [localSorting, setSorting] = useState<SortingState>([]);
  const [localFilters, setFilters] = useState<ColumnFiltersState>([]);
  const [localVisibility, setVisibility] = useState<VisibilityState>({});
  const [localSizing, setSizing] = useState<ColumnSizingState>({});
  const [localSelection, setSelection] = useState<RowSelectionState>({});
  const [localSearch, setSearch] = useState("");
  const [localDensity, setDensity] = useState<"comfortable" | "compact">(
    "comfortable",
  );
  const [knownData, setKnownData] = useState(data);
  useEffect(() => {
    if (!loading && !refreshing && !error) setKnownData(data);
  }, [data, loading, refreshing, error]);
  const displayData = error ? knownData : data;
  const region = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLTableSectionElement>(null);
  const parkedFocus = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const node = body.current;
    if (!node) return;
    if (refreshing && node.contains(document.activeElement)) {
      parkedFocus.current = document.activeElement as HTMLElement;
      region.current?.focus({ preventScroll: true });
    }
    node.inert = refreshing;
    if (!refreshing && parkedFocus.current) {
      if (
        document.activeElement === region.current &&
        parkedFocus.current.isConnected
      )
        parkedFocus.current.focus({ preventScroll: true });
      parkedFocus.current = null;
    }
  }, [refreshing]);
  const density = controlledDensity ?? localDensity;
  const pagination = controlledPagination ?? localPagination;
  const busy = loading || refreshing || Boolean(error);
  const selectionLabels = useRef(labels);
  selectionLabels.current = labels;
  const [selectionColumn] = useState<ColumnDef<TData, TValue>>(() => ({
    id: "__selection",
    size: 48,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => (
      <Checkbox
        aria-label={selectionLabels.current.selectAll}
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(checked === true)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={selectionLabels.current.selectRow?.(row.index + 1)}
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
      />
    ),
  }));
  const table = useReactTable({
    data: displayData,
    columns: enableRowSelection ? [selectionColumn, ...columns] : columns,
    state: {
      pagination,
      sorting: controlledSorting ?? localSorting,
      columnFilters: controlledFilters ?? localFilters,
      globalFilter: globalFilter ?? localSearch,
      columnVisibility: controlledVisibility ?? localVisibility,
      columnSizing: controlledSizing ?? localSizing,
      rowSelection: controlledSelection ?? localSelection,
    },
    onPaginationChange: onPaginationChange ?? setPagination,
    onSortingChange: (updater) => {
      (onSortingChange ?? setSorting)(updater);
      table.setPageIndex(0);
    },
    onColumnFiltersChange: (updater) => {
      (onColumnFiltersChange ?? setFilters)(updater);
      table.setPageIndex(0);
    },
    onGlobalFilterChange: (updater) => {
      (onGlobalFilterChange ?? setSearch)(updater);
      table.setPageIndex(0);
    },
    onColumnVisibilityChange: onColumnVisibilityChange ?? setVisibility,
    onColumnSizingChange: onColumnSizingChange ?? setSizing,
    onRowSelectionChange: onRowSelectionChange ?? setSelection,
    getRowId,
    enableRowSelection,
    enableColumnResizing,
    columnResizeMode: "onChange",
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const total = manualPagination
    ? rowCount
    : table.getFilteredRowModel().rows.length;
  const lastPage = Math.max(
    0,
    Math.ceil((total ?? 0) / pagination.pageSize) - 1,
  );
  useEffect(() => {
    if (!manualPagination && pagination.pageIndex > lastPage)
      table.setPageIndex(lastPage);
  }, [manualPagination, lastPage, pagination.pageIndex, table]);
  const rows = table.getRowModel().rows;
  return (
    <div
      data-slot="data-table"
      data-density={density}
      className={cn(
        "flex min-h-0 flex-col gap-4 text-sm",
        fillHeight && "h-full",
        className,
      )}
    >
      <DataTableToolbar>
        {showSearch && (
          <FilterSearch
            value={globalFilter ?? localSearch}
            onValueChange={(value) => table.setGlobalFilter(value)}
            label={labels.search}
            placeholder={labels.searchPlaceholder}
            clearLabel={labels.clearSearch}
            debounceMs={searchDebounceMs}
            shortcut={searchShortcut}
            disabled={loading}
          />
        )}
        {typeof toolbar === "function" ? toolbar(table) : toolbar}
        {labels.columns && (
          <ViewOptions
            table={table}
            labels={labels}
            columnLabels={columnLabels}
            density={density}
            onDensityChange={(value) => {
              setDensity(value);
              onDensityChange?.(value);
            }}
            disabled={loading}
          />
        )}
      </DataTableToolbar>
      {error && (
        <div role="alert" className="text-destructive">
          {error}
        </div>
      )}
      {refreshing && (
        <div role="status" aria-live="polite">
          {labels.refreshing ?? labels.loading}
        </div>
      )}
      <div
        ref={region}
        tabIndex={-1}
        role="region"
        aria-label={labels.table}
        data-slot="data-table-scroll"
        className={cn(
          "relative overflow-auto border border-border",
          fillHeight &&
            "min-h-0 flex-1 [&>[data-slot=table-container]]:overflow-visible",
        )}
        aria-busy={loading || refreshing}
      >
        <Table
          aria-label={labels.table}
          style={
            enableColumnResizing
              ? {
                  width: table.getTotalSize(),
                  tableLayout: "fixed",
                  minWidth: "100%",
                }
              : undefined
          }
        >
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    scope="col"
                    className="relative"
                    style={
                      enableColumnResizing
                        ? { width: header.getSize() }
                        : undefined
                    }
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : undefined
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="inline-flex min-h-11 items-center gap-2 text-left"
                        disabled={busy}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <ArrowUpDown aria-hidden="true" className="size-3" />
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                    {enableColumnResizing &&
                      header.column.getCanResize() &&
                      labels.resizeColumn && (
                        <input
                          type="range"
                          min={header.column.columnDef.minSize ?? 20}
                          max={header.column.columnDef.maxSize ?? 1000}
                          value={header.getSize()}
                          aria-label={labels.resizeColumn(
                            columnLabels?.[header.column.id] ??
                              header.column.id,
                          )}
                          className="absolute right-0 top-0 h-full w-3 cursor-col-resize opacity-0 focus:opacity-100"
                          style={{ touchAction: "none" }}
                          onPointerDown={(event) => {
                            event.preventDefault();
                            const control = event.currentTarget;
                            const startX = event.clientX;
                            const startWidth = header.getSize();
                            control.focus();
                            control.setPointerCapture(event.pointerId);
                            const move = (moveEvent: PointerEvent) => {
                              const width = Math.min(
                                header.column.columnDef.maxSize ?? 1000,
                                Math.max(
                                  header.column.columnDef.minSize ?? 20,
                                  startWidth + moveEvent.clientX - startX,
                                ),
                              );
                              table.setColumnSizing((current) => ({
                                ...current,
                                [header.column.id]: width,
                              }));
                            };
                            const end = () => {
                              control.removeEventListener("pointermove", move);
                              control.removeEventListener(
                                "lostpointercapture",
                                end,
                              );
                            };
                            control.addEventListener("pointermove", move);
                            control.addEventListener("lostpointercapture", end);
                          }}
                          onChange={(event) =>
                            table.setColumnSizing((current) => ({
                              ...current,
                              [header.column.id]: Number(event.target.value),
                            }))
                          }
                        />
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody ref={body}>
            {loading || !rows.length ? (
              <TableRow>
                <TableCell
                  colSpan={Math.max(table.getVisibleLeafColumns().length, 1)}
                  className="h-28 text-center text-muted-foreground"
                >
                  <span role="status">
                    {loading ? labels.loading : labels.empty}
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        density === "compact"
                          ? "h-9 truncate py-1"
                          : "h-12 truncate"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        pagination={pagination}
        total={total}
        count={rows.length}
        labels={labels}
        disabled={busy}
        refreshing={refreshing}
        onPaginationChange={(updater) => table.setPagination(updater)}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
