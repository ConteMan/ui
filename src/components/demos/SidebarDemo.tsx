import { useState } from "react";
import * as UI from "@registry/ui/sidebar";

export default function SidebarDemo({
  locale = "zh",
}: {
  locale?: "zh" | "en";
}) {
  const english = locale === "en";
  const text = (zh: string, en: string) => (english ? en : zh);

  const [selected, setSelected] = useState(1);
  return (
    <div
      id="preview"
      data-demo="sidebar"
      className="conteman-preview min-w-0 space-y-4 border border-border p-4 sm:p-6"
    >
      <UI.SidebarProvider className="min-h-0">
        <UI.Sidebar
          collapsible="none"
          mobileTitle={text("导航", "Navigation")}
          className="w-full"
        >
          <UI.SidebarHeader>
            {text("示例工作区", "Example workspace")}
          </UI.SidebarHeader>
          <UI.SidebarContent>
            <UI.SidebarGroup>
              <UI.SidebarGroupLabel>
                {text("工作", "Workspace")}
              </UI.SidebarGroupLabel>
              <UI.SidebarGroupContent>
                <UI.SidebarMenu>
                  {[text("概览", "Overview"), text("项目", "Projects")].map(
                    (label, index) => (
                      <UI.SidebarMenuItem key={label}>
                        <UI.SidebarMenuButton
                          isActive={selected === index}
                          onClick={() => setSelected(index)}
                          className="min-h-11"
                        >
                          {label}
                        </UI.SidebarMenuButton>
                      </UI.SidebarMenuItem>
                    ),
                  )}
                </UI.SidebarMenu>
              </UI.SidebarGroupContent>
            </UI.SidebarGroup>
          </UI.SidebarContent>
          <UI.SidebarFooter>
            {text(
              "基础分组示例，后台外壳另行迁移。",
              "Primitive groups; the admin shell is deferred.",
            )}
          </UI.SidebarFooter>
        </UI.Sidebar>
      </UI.SidebarProvider>
    </div>
  );
}
