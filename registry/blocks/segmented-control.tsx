// Project composition of the generated ToggleGroup. Generated UI files stay unchanged.
import {
  useId,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type SegmentedOption = {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
  count?: number;
  disabled?: boolean;
};

export function SegmentedControl({
  options,
  value: valueProp,
  defaultValue,
  onValueChange,
  label,
  size = "default",
  id,
  name,
  disabled = false,
  className,
  "aria-label": ariaLabel,
}: {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: ReactNode;
  size?: "default" | "sm";
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const labelId = useId();
  const [uncontrolled, setUncontrolled] = useState(
    () =>
      defaultValue ??
      options.find((option) => !option.disabled)?.value ??
      options[0]?.value ??
      "",
  );
  const value = valueProp ?? uncontrolled;
  const valueRef = useRef(value);
  valueRef.current = value;
  function commit(next: string) {
    if (!next || next === valueRef.current) return;
    onValueChange?.(next);
    if (valueProp === undefined) setUncontrolled(next);
  }
  function selectFocused(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;
    if (
      !(target instanceof HTMLElement) ||
      !event.currentTarget.contains(target)
    )
      return;
    const next = target.dataset.choiceValue;
    if (!next || target.matches(":disabled")) return;
    commit(next);
  }
  return (
    <div
      id={id}
      data-slot="segmented-control"
      data-size={size}
      data-selected-value={value}
      className={cn(className)}
      onFocus={selectFocused}
    >
      {label ? (
        <span id={labelId} data-slot="segmented-label">
          {label}
        </span>
      ) : null}
      {name ? (
        <input type="hidden" name={name} value={value} aria-hidden="true" />
      ) : null}
      <ToggleGroup
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={label ? labelId : undefined}
        value={[value]}
        spacing={0}
        size={size === "sm" ? "sm" : "default"}
        disabled={disabled}
        onValueChange={(next, details) => {
          // Single-select stays pressed; a second click must not clear it.
          if (next.length !== 1) {
            details.cancel();
            return;
          }
          commit(next[0]);
        }}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            disabled={disabled || option.disabled}
            data-choice-value={option.value}
          >
            {option.icon ? (
              <span aria-hidden="true" data-segment-icon>
                {option.icon}
              </span>
            ) : null}
            <span>{option.label}</span>
            {option.count !== undefined ? (
              <span data-segment-count>{option.count}</span>
            ) : null}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
