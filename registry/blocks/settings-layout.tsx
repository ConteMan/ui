import { useId, type ComponentProps, type ReactNode } from "react";
import { Info, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function SettingsLayout({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-settings-layout
      className={cn("mx-auto w-full max-w-5xl space-y-5", className)}
      {...props}
    />
  );
}
export function SettingsSection({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="space-y-2">
      <h2 id={id} className="text-sm font-semibold">
        {title}
      </h2>
      <div className="divide-y border border-border bg-card">{children}</div>
    </section>
  );
}
export function SettingsRow({
  paired = false,
  className,
  ...props
}: ComponentProps<"form"> & { paired?: boolean }) {
  return (
    <form
      data-settings-row
      data-paired={paired}
      className={cn(
        "grid min-w-0 grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto]",
        className,
      )}
      {...props}
    />
  );
}
export function SettingsLabel({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("text-sm", className)} {...props} />;
}
export function SettingsName({
  htmlFor,
  name,
  details,
  detailsLabel,
  children,
}: {
  htmlFor: string;
  name: string;
  details: ReactNode;
  detailsLabel: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FieldLabel htmlFor={htmlFor}>{name}</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={detailsLabel}
              className="min-h-11 min-w-11"
            />
          }
        >
          <Info aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>{detailsLabel}</PopoverTitle>
          {details}
        </PopoverContent>
      </Popover>
      {children}
    </div>
  );
}
export function SettingsControls({
  unit,
  actions,
  resetOnly = false,
  variant = "number",
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  unit?: ReactNode;
  actions?: ReactNode;
  resetOnly?: boolean;
  variant?: "number" | "field" | "segmented";
}) {
  return (
    <div
      data-settings-controls={variant}
      data-reset-only={resetOnly}
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-2 sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {unit && <span>{unit}</span>}
      {actions}
    </div>
  );
}
export function SettingsReadOnly({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "break-words text-sm text-muted-foreground sm:text-right",
        className,
      )}
      {...props}
    />
  );
}
export function SettingsReset({
  label,
  ...props
}: Omit<ComponentProps<typeof Button>, "children" | "aria-label"> & {
  label: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              {...props}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={label}
              className="min-h-11 min-w-11"
            />
          }
        >
          <RotateCcw aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
