import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ListPage({
  title,
  description,
  actions,
  filters,
  children,
  className,
  ...props
}: Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  filters?: ReactNode;
}) {
  return (
    <section
      className={cn("flex h-full min-h-0 flex-col gap-4", className)}
      {...props}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-xl font-semibold">{title}</h2>
          {description && (
            <div className="mt-1 text-muted-foreground">{description}</div>
          )}
        </div>
        {actions}
      </header>
      {filters}
      <div className="min-h-0 flex-1">{children}</div>
    </section>
  );
}
