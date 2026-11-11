import { useState } from "react";
import { zhCN, enGB } from "date-fns/locale";
import { Calendar } from "@registry/ui/calendar";

export default function CalendarDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div data-demo="calendar" className="conteman-preview space-y-4 border p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={english ? enGB : zhCN}
        labels={{
          labelNext: () => (english ? "Next month" : "下个月"),
          labelPrevious: () => (english ? "Previous month" : "上个月"),
          labelGrid: () => (english ? "Choose date" : "选择日期"),
          labelDayButton: (date) =>
            new Intl.DateTimeFormat(english ? "en-GB" : "zh-CN", {
              dateStyle: "full",
            }).format(date),
        }}
      />
      <p role="status">
        {date
          ? new Intl.DateTimeFormat(english ? "en-GB" : "zh-CN", {
              dateStyle: "long",
            }).format(date)
          : english
            ? "Choose a date"
            : "请选择日期"}
      </p>
    </div>
  );
}
