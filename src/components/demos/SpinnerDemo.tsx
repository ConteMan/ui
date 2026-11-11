import * as UI from "@registry/ui/spinner";

export default function SpinnerDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="spinner"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-5">
        <UI.Spinner aria-label={text("加载中", "Loading")} />
        <UI.Spinner className="size-6" aria-label={text("同步中", "Syncing")} />
        <span role="status">{text("正在准备预览…", "Preparing preview…")}</span>
      </div>
    </div>
  );
}
