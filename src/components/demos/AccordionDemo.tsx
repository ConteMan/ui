import * as UI from "@registry/ui/accordion";

export default function AccordionDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="accordion"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Accordion defaultValue={["install"]}>
        <UI.AccordionItem value="install">
          <UI.AccordionTrigger>
            {text("如何安装？", "How do I install it?")}
          </UI.AccordionTrigger>
          <UI.AccordionContent>
            {text(
              "运行本页提供的 shadcn 安装命令。",
              "Run the shadcn installation command on this page.",
            )}
          </UI.AccordionContent>
        </UI.AccordionItem>
        <UI.AccordionItem value="theme">
          <UI.AccordionTrigger>
            {text("支持深色吗？", "Does it support dark mode?")}
          </UI.AccordionTrigger>
          <UI.AccordionContent>
            {text(
              "支持，切换根元素的 dark 类。",
              "Yes. Toggle the dark class on the root element.",
            )}
          </UI.AccordionContent>
        </UI.AccordionItem>
        <UI.AccordionItem value="disabled" disabled>
          <UI.AccordionTrigger>
            {text("不可用", "Unavailable")}
          </UI.AccordionTrigger>
          <UI.AccordionContent />
        </UI.AccordionItem>
      </UI.Accordion>
    </div>
  );
}
