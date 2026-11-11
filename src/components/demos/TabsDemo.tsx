import * as UI from "@registry/ui/tabs";

export default function TabsDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="tabs"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Tabs defaultValue="overview">
        <UI.TabsList aria-label={text("项目面板", "Project panels")}>
          <UI.TabsTrigger value="overview">
            {text("概览", "Overview")}
          </UI.TabsTrigger>
          <UI.TabsTrigger value="details">
            {text("详情", "Details")}
          </UI.TabsTrigger>
          <UI.TabsTrigger value="disabled" disabled>
            {text("不可用", "Unavailable")}
          </UI.TabsTrigger>
        </UI.TabsList>
        <UI.TabsContent value="overview">
          {text("项目概览内容。", "Project overview content.")}
        </UI.TabsContent>
        <UI.TabsContent value="details">
          {text("项目详情内容。", "Project details content.")}
        </UI.TabsContent>
      </UI.Tabs>
    </div>
  );
}
