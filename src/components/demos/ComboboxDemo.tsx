import * as UI from "@registry/ui/combobox";

export default function ComboboxDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="combobox"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Combobox items={["React", "Astro", "Vite"]}>
        <UI.ComboboxInput
          aria-label={text("搜索框架", "Search frameworks")}
          placeholder={text("选择或搜索…", "Choose or search…")}
        />
        <UI.ComboboxContent>
          <UI.ComboboxEmpty>
            {text("没有匹配选项", "No matching options")}
          </UI.ComboboxEmpty>
          <UI.ComboboxList>
            {(item: string) => (
              <UI.ComboboxItem key={item} value={item}>
                {item}
              </UI.ComboboxItem>
            )}
          </UI.ComboboxList>
        </UI.ComboboxContent>
      </UI.Combobox>
    </div>
  );
}
