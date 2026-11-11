import { useState } from "react";
import * as UI from "@registry/blocks/date-range-picker";
import { zhCN, enGB } from "date-fns/locale";

export default function DateRangePickerDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [range, setRange] = useState({ from: "", until: "" });
  return (
    <div
      id="preview"
      data-demo="date-range-picker"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.DateRangePicker
        calendar={{
          locale: english ? enGB : zhCN,
          labels: {
            labelNext: () => text("下个月", "Next month"),
            labelPrevious: () => text("上个月", "Previous month"),
            labelGrid: () => text("选择日期", "Choose dates"),
            labelDayButton: (date) =>
              new Intl.DateTimeFormat(english ? "en-GB" : "zh-CN", {
                dateStyle: "full",
              }).format(date),
          },
        }}
        from={range.from}
        until={range.until}
        onChange={setRange}
        labels={{
          trigger: text("日期范围", "Date range"),
          from: text("开始日期", "Start date"),
          until: text("结束日期（包含）", "End date (inclusive)"),
          apply: text("应用", "Apply"),
          clear: text("清除", "Clear"),
          invalid: text("请输入有效日期", "Enter valid dates"),
          reversed: text("结束日期不能早于开始日期", "End must follow start"),
          hint: text(
            "保留日历日期，时区转换由调用方完成。",
            "Calendar dates; the caller converts time zones.",
          ),
        }}
      />
    </div>
  );
}
