import { useState } from "react";
import * as UI from "@registry/ui/dropdown-menu";
import { Button } from "@registry/ui/button";

export default function DropdownMenuDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="dropdown-menu"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger
          render={<Button variant="outline" className="min-h-11" />}
        >
          {text("更多操作", "More actions")}
        </UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          <UI.DropdownMenuGroup>
            <UI.DropdownMenuLabel>
              {text("项目操作", "Project actions")}
            </UI.DropdownMenuLabel>
            <UI.DropdownMenuItem onClick={() => setEmpty(true)}>
              {text("复制项目", "Duplicate project")}
            </UI.DropdownMenuItem>
            <UI.DropdownMenuItem disabled>
              {text("暂不可用", "Unavailable")}
            </UI.DropdownMenuItem>
            <UI.DropdownMenuSeparator />
            <UI.DropdownMenuItem
              variant="destructive"
              onClick={() => setEmpty(true)}
            >
              {text("移除示例", "Remove example")}
            </UI.DropdownMenuItem>
          </UI.DropdownMenuGroup>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    </div>
  );
}
