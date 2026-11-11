import { useState } from "react";
import * as UI from "@registry/ui/empty";
import { Button } from "@registry/ui/button";

export default function EmptyDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [empty, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="empty"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Empty>
        <UI.EmptyHeader>
          <UI.EmptyTitle>{text("还没有项目", "No projects yet")}</UI.EmptyTitle>
          <UI.EmptyDescription>
            {text(
              "创建第一个项目后会显示在这里。",
              "Create your first project to see it here.",
            )}
          </UI.EmptyDescription>
        </UI.EmptyHeader>
        <UI.EmptyContent>
          <Button onClick={() => setEmpty(!empty)}>
            {empty
              ? text("示例已创建", "Example created")
              : text("创建项目", "Create project")}
          </Button>
        </UI.EmptyContent>
      </UI.Empty>
    </div>
  );
}
