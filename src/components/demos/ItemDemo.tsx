import { useState } from "react";
import * as UI from "@registry/ui/item";
import { Button } from "@registry/ui/button";

export default function ItemDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [empty, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="item"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.ItemGroup>
        <UI.Item variant="outline">
          <UI.ItemContent>
            <UI.ItemTitle>{text("示例项目", "Example project")}</UI.ItemTitle>
            <UI.ItemDescription>
              {text("组件组合示例", "Component composition example")}
            </UI.ItemDescription>
          </UI.ItemContent>
          <UI.ItemActions>
            <Button variant="outline" onClick={() => setEmpty(!empty)}>
              {empty ? text("已添加", "Added") : text("添加", "Add")}
            </Button>
          </UI.ItemActions>
        </UI.Item>
        <UI.ItemSeparator />
        <UI.Item>
          <UI.ItemContent>
            <UI.ItemTitle>{text("第二项", "Second item")}</UI.ItemTitle>
          </UI.ItemContent>
        </UI.Item>
      </UI.ItemGroup>
    </div>
  );
}
