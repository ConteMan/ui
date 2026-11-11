import * as UI from "@registry/ui/slider";

export default function SliderDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="slider"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <div className="grid gap-8 py-4">
        <UI.Slider
          aria-label={text("音量", "Volume")}
          getAriaLabel={() => text("音量", "Volume")}
          defaultValue={[40]}
        />
        <UI.Slider
          aria-label={text("范围", "Range")}
          getAriaLabel={(index) =>
            index === 0 ? text("下限", "Minimum") : text("上限", "Maximum")
          }
          defaultValue={[20, 80]}
        />
        <UI.Slider
          aria-label={text("不可用", "Unavailable")}
          defaultValue={[30]}
          disabled
        />
      </div>
    </div>
  );
}
