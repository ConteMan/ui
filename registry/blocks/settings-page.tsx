import type { ReactNode, ComponentProps } from "react";
import { SettingsLayout } from "@/components/settings-layout";
import { Button } from "@/components/ui/button";

export function SettingsPage({
  title,
  description,
  children,
  saveLabel,
  savingLabel,
  saving = false,
  disabled = false,
  status,
  onSave,
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  saveLabel: string;
  savingLabel: string;
  saving?: boolean;
  disabled?: boolean;
  status?: ReactNode;
  onSave: ComponentProps<"form">["onSubmit"];
}) {
  return (
    <SettingsLayout>
      <header>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <div className="mt-1 text-muted-foreground">{description}</div>
        )}
      </header>
      <form onSubmit={onSave} aria-busy={saving} className="space-y-5">
        <fieldset disabled={saving || disabled} className="min-w-0 space-y-5">
          {children}
        </fieldset>
        <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t bg-background py-3">
          <div role="status" aria-live="polite">
            {status}
          </div>
          <Button
            type="submit"
            disabled={saving || disabled}
            className="min-h-11"
          >
            {saving ? savingLabel : saveLabel}
          </Button>
        </footer>
      </form>
    </SettingsLayout>
  );
}
