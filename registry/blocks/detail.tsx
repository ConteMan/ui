import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Check, Copy, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PageHeader({
  title,
  secondary,
  status,
  actions,
  copy,
}: {
  title: ReactNode;
  secondary?: ReactNode;
  status?: ReactNode;
  actions?: ReactNode;
  copy?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="break-words text-xl font-semibold">{title}</h2>
          {copy}
          {status}
        </div>
        {secondary && (
          <div className="mt-1 break-words text-sm text-muted-foreground">
            {secondary}
          </div>
        )}
      </div>
      {actions}
    </div>
  );
}
export function DescriptionList({ children }: { children: ReactNode }) {
  return (
    <dl className="grid grid-cols-1 gap-6 border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </dl>
  );
}
export function DescriptionItem({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="mb-1 text-sm text-muted-foreground">{label}</dt>
      <dd className="break-words text-sm font-medium">{children}</dd>
    </div>
  );
}
export function CopyableId({
  value,
  label,
  copiedLabel,
  failedLabel,
  children,
}: {
  value: string;
  label: string;
  copiedLabel: string;
  failedLabel: string;
  children?: ReactNode;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const text =
    state === "copied" ? copiedLabel : state === "failed" ? failedLabel : label;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              aria-label={text}
              className="min-h-11"
              onClick={() => {
                void navigator.clipboard
                  .writeText(value)
                  .then(() => setState("copied"))
                  .catch(() => setState("failed"));
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setState("idle"), 2000);
              }}
            />
          }
        >
          {children}
          {state === "copied" ? (
            <Check aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
      <span role="status" className="sr-only">
        {state !== "idle" ? text : ""}
      </span>
    </TooltipProvider>
  );
}
export function StatusBadge({
  children,
  variant = "secondary",
}: {
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
}) {
  return <Badge variant={variant}>{children}</Badge>;
}
export type MenuAction = {
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  onSelect: (trigger: HTMLButtonElement) => void;
};
export function ActionsMenu({
  actions,
  label,
  iconOnly = false,
  disabled = false,
  className,
}: {
  actions: MenuAction[];
  label: string;
  iconOnly?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            ref={trigger}
            variant="outline"
            disabled={disabled}
            aria-label={label}
            className={className}
          />
        }
      >
        <MoreHorizontal aria-hidden="true" />
        {!iconOnly && label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            variant={action.destructive ? "destructive" : "default"}
            disabled={action.disabled}
            onClick={() => {
              if (trigger.current) action.onSelect(trigger.current);
            }}
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function TimeTooltip({
  iso,
  format,
  empty,
}: {
  iso: string | null | undefined;
  format: (iso: string) => ReactNode;
  empty: ReactNode;
}) {
  if (!iso || !Number.isFinite(Date.parse(iso))) return <>{empty}</>;
  const utc = new Date(iso).toISOString();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<time dateTime={utc} tabIndex={0} />}>
          {format(iso)}
        </TooltipTrigger>
        <TooltipContent>{utc}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export type FinalFocus = RefObject<HTMLElement | null>;
