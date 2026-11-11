import { useState } from "react";
import * as UI from "@registry/ui/pagination";

export default function PaginationDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [selected, setSelected] = useState(1);
  return (
    <div
      id="preview"
      data-demo="pagination"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Pagination aria-label={text("示例分页", "Example pagination")}>
        <UI.PaginationContent>
          <UI.PaginationItem>
            <UI.PaginationPrevious
              href="#preview"
              text={text("上一页", "Previous")}
              onClick={(event) => {
                event.preventDefault();
                setSelected(Math.max(1, selected - 1));
              }}
            />
          </UI.PaginationItem>
          {[1, 2, 3].map((value) => (
            <UI.PaginationItem key={value}>
              <UI.PaginationLink
                href="#preview"
                isActive={selected === value}
                onClick={(event) => {
                  event.preventDefault();
                  setSelected(value);
                }}
              >
                {value}
              </UI.PaginationLink>
            </UI.PaginationItem>
          ))}
          <UI.PaginationItem>
            <UI.PaginationNext
              href="#preview"
              text={text("下一页", "Next")}
              onClick={(event) => {
                event.preventDefault();
                setSelected(Math.min(3, selected + 1));
              }}
            />
          </UI.PaginationItem>
        </UI.PaginationContent>
      </UI.Pagination>
    </div>
  );
}
