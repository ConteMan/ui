import * as UI from "@registry/ui/table";

export default function TableDemo({ locale = "zh" }: { locale?: "zh" | "en" }) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  return (
    <div
      id="preview"
      data-demo="table"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.Table aria-label={text("示例清单", "Example inventory")}>
        <UI.TableCaption>
          {text("示例数据", "Illustrative data")}
        </UI.TableCaption>
        <UI.TableHeader>
          <UI.TableRow>
            <UI.TableHead>{text("名称", "Name")}</UI.TableHead>
            <UI.TableHead>{text("状态", "Status")}</UI.TableHead>
          </UI.TableRow>
        </UI.TableHeader>
        <UI.TableBody>
          {["Button", "Input", "Table"].map((name) => (
            <UI.TableRow key={name}>
              <UI.TableCell>{name}</UI.TableCell>
              <UI.TableCell>{text("可使用", "Available")}</UI.TableCell>
            </UI.TableRow>
          ))}
        </UI.TableBody>
      </UI.Table>
    </div>
  );
}
