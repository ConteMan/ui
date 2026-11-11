import * as UI from "@registry/ui/breadcrumb";

export default function BreadcrumbDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="breadcrumb"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Breadcrumb aria-label={text("当前位置", "Breadcrumb")}>
        <UI.BreadcrumbList>
          <UI.BreadcrumbItem>
            <UI.BreadcrumbLink href={english ? "/en/" : "/"}>
              {text("首页", "Home")}
            </UI.BreadcrumbLink>
          </UI.BreadcrumbItem>
          <UI.BreadcrumbSeparator />
          <UI.BreadcrumbItem>
            <UI.BreadcrumbPage>{text("项目", "Projects")}</UI.BreadcrumbPage>
          </UI.BreadcrumbItem>
        </UI.BreadcrumbList>
      </UI.Breadcrumb>
    </div>
  );
}
