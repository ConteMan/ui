import { useId, useState, type ReactNode, type ComponentProps } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export type DateRange = { from: string; until: string };
export type DateRangeLabels = {
  trigger: string;
  from: string;
  until: string;
  apply: string;
  clear: string;
  invalid: string;
  reversed: string;
  hint?: ReactNode;
};
export function DateRangePicker({
  from,
  until,
  onChange,
  labels,
  dateOnly = true,
  disabled = false,
  validate,
  calendar,
}: DateRange & {
  onChange: (range: DateRange) => void;
  labels: DateRangeLabels;
  dateOnly?: boolean;
  disabled?: boolean;
  validate?: (range: DateRange) => string | undefined;
  calendar?: Pick<
    ComponentProps<typeof Calendar>,
    "locale" | "labels" | "weekStartsOn"
  >;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ from, until });
  const valid = (value: string) => {
    if (!value) return true;
    const date = new Date(dateOnly ? `${value}T00:00:00Z` : value);
    return (
      Number.isFinite(date.getTime()) &&
      (!dateOnly || date.toISOString().slice(0, 10) === value)
    );
  };
  const error =
    !valid(draft.from) || !valid(draft.until)
      ? labels.invalid
      : draft.from && draft.until && draft.from > draft.until
        ? labels.reversed
        : validate?.(draft);
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft({ from, until });
        setOpen(next);
      }}
    >
      <PopoverTrigger
        render={
          <Button variant="outline" disabled={disabled} className="min-h-11" />
        }
      >
        <CalendarIcon aria-hidden="true" />
        {labels.trigger}
        {(from || until) && <span className="ml-2">1</span>}
      </PopoverTrigger>
      <PopoverContent
        className="w-[22rem] max-w-[calc(100vw-2rem)]"
        align="start"
      >
        <PopoverTitle>{labels.trigger}</PopoverTitle>
        {labels.hint && (
          <div className="text-xs text-muted-foreground">{labels.hint}</div>
        )}
        {calendar && dateOnly && (
          <Calendar
            {...calendar}
            mode="range"
            className="mx-auto [--cell-size:min(2.75rem,calc((100vw-4.5rem)/7))]"
            selected={{
              from:
                draft.from && valid(draft.from)
                  ? new Date(`${draft.from}T12:00:00`)
                  : undefined,
              to:
                draft.until && valid(draft.until)
                  ? new Date(`${draft.until}T12:00:00`)
                  : undefined,
            }}
            onSelect={(range) => {
              const stamp = (date: Date | undefined) =>
                date
                  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                  : "";
              setDraft({ from: stamp(range?.from), until: stamp(range?.to) });
            }}
          />
        )}
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (!error) {
              onChange(draft);
              setOpen(false);
            }
          }}
        >
          {(["from", "until"] as const).map((key) => (
            <div key={key} className="grid gap-1">
              <Label htmlFor={`${id}-${key}`}>{labels[key]}</Label>
              <Input
                id={`${id}-${key}`}
                type={dateOnly ? "date" : "datetime-local"}
                className="min-h-11"
                value={draft[key]}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                onChange={(event) =>
                  setDraft({ ...draft, [key]: event.target.value })
                }
              />
            </div>
          ))}
          {error && (
            <div id={`${id}-error`} role="alert" className="text-destructive">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setDraft({ from: "", until: "" });
                onChange({ from: "", until: "" });
              }}
            >
              {labels.clear}
            </Button>
            <Button type="submit" disabled={Boolean(error)}>
              {labels.apply}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
