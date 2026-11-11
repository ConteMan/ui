import type { SidebarItem } from "@cloudflare/nimbus-docs/types";

export function isEnglish(pathname: string) {
  return /^\/en(?:\/|$)/.test(pathname);
}

export function localeLinks(pathname: string) {
  const suffix = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return { zh: suffix, en: `/en${suffix === "/" ? "/" : suffix}` };
}

export function docsNavigation(pathname: string): SidebarItem[] {
  const english = isEnglish(pathname);
  const prefix = english ? "/en" : "";
  const link = (label: string, path: string, order: number): SidebarItem => ({
    type: "link", label, href: `${prefix}${path}`, order,
    isCurrent: pathname.replace(/\/$/, "") === `${prefix}${path}`.replace(/\/$/, ""),
  });
  const groups: [string, string, [string, string][]][] = [
    ["基础", "Basics", [["Button", "/basics/button/"]]],
    ["表单", "Forms", []],
    ["数据展示", "Data display", [["DataTable", "/data-display/data-table/"]]],
    ["浮层与反馈", "Overlays & feedback", []],
    ["导航与布局", "Navigation & layout", []],
    ["页面模式", "Page patterns", []],
    ["主题", "Theme", [[english ? "Conteman theme" : "Conteman 主题", "/theme/"]]],
  ];
  return [
    link(english ? "Introduction" : "开始使用", "/", 0),
    ...groups.map(([zh, en, entries], index): SidebarItem => ({
      type: "group", label: english ? en : zh, order: index + 1, collapsed: false,
      children: entries.map(([label, path], order) => link(label, path, order)),
    })),
  ];
}
