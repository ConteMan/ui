import type { ReactNode, ComponentProps } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function EditSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  saveLabel,
  savingLabel,
  cancelLabel,
  closeLabel,
  saving = false,
  error,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  saveLabel: string;
  savingLabel: string;
  cancelLabel: string;
  closeLabel: string;
  saving?: boolean;
  error?: ReactNode;
  onSave: ComponentProps<"form">["onSubmit"];
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!saving) onOpenChange(next);
      }}
    >
      <SheetContent closeLabel={closeLabel}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={onSave}
          aria-busy={saving}
          className="flex min-h-0 flex-1 flex-col"
        >
          <fieldset
            disabled={saving}
            className="min-h-0 flex-1 space-y-4 overflow-auto px-4 py-2"
          >
            {children}
          </fieldset>
          {error && (
            <div role="alert" className="px-4 text-destructive">
              {error}
            </div>
          )}
          <SheetFooter>
            <SheetClose
              render={
                <Button type="button" variant="outline" disabled={saving} />
              }
            >
              {cancelLabel}
            </SheetClose>
            <Button type="submit" disabled={saving}>
              {saving ? savingLabel : saveLabel}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
