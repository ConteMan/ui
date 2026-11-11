import * as UI from "@registry/ui/skeleton";

export default function SkeletonDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="skeleton"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div
        aria-busy="true"
        aria-label={text("加载项目", "Loading project")}
        className="space-y-4"
      >
        <UI.Skeleton className="h-6 w-40" />
        <UI.Skeleton className="h-4 w-full" />
        <UI.Skeleton className="h-4 w-3/4" />
        <UI.Skeleton className="h-24 w-full" />
        <span role="status" className="sr-only">
          {text("加载中", "Loading")}
        </span>
      </div>
    </div>
  );
}
