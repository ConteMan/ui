import { useState } from "react";
import * as UI from "@registry/ui/card";
import { Button } from "@registry/ui/button";

export default function CardDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [empty, setEmpty] = useState(false);
  return (
    <div
      id="preview"
      data-demo="card"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Card>
        <UI.CardHeader>
          <UI.CardTitle>{text("偏好设置", "Preferences")}</UI.CardTitle>
          <UI.CardDescription>
            {text("此处展示组合插槽", "Composed slots example")}
          </UI.CardDescription>
        </UI.CardHeader>
        <UI.CardContent>
          <p>
            {text("内容由调用方提供。", "Content is supplied by the caller.")}
          </p>
        </UI.CardContent>
        <UI.CardFooter>
          <Button variant="outline" onClick={() => setEmpty(!empty)}>
            {empty ? text("已保存", "Saved") : text("保存", "Save")}
          </Button>
        </UI.CardFooter>
      </UI.Card>
    </div>
  );
}
