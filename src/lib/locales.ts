import type { SidebarItem } from "@cloudflare/nimbus-docs/types";
import { componentGroups } from "./catalog";

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
    type: "link",
    label,
    href: `${prefix}${path}`,
    order,
    isCurrent:
      pathname.replace(/\/$/, "") === `${prefix}${path}`.replace(/\/$/, ""),
  });
  const groups: [string, string, [string, string][]][] = [
    [
      "基础",
      "Basics",
      componentGroups.basics.map((name) => [name, `/basics/${name}/`]),
    ],
    [
      "表单",
      "Forms",
      componentGroups.forms.map((name) => [name, `/forms/${name}/`]),
    ],
    [
      "数据展示",
      "Data display",
      componentGroups["data-display"].map((name) => [
        name,
        `/data-display/${name}/`,
      ]),
    ],
    [
      "浮层与反馈",
      "Overlays & feedback",
      componentGroups.overlays.map((name) => [name, `/overlays/${name}/`]),
    ],
    [
      "导航与布局",
      "Navigation & layout",
      componentGroups.navigation.map((name) => [name, `/navigation/${name}/`]),
    ],
    [
      "页面模式",
      "Page patterns",
      [
        ...componentGroups.patterns.map(
          (name) => [name, `/patterns/${name}/`] as [string, string],
        ),
        [
          english ? "Admin shell (deferred)" : "后台外壳（待迁移）",
          "/patterns/admin-shell/",
        ],
      ],
    ],
    [
      "主题",
      "Theme",
      [[english ? "Conteman theme" : "Conteman 主题", "/theme/"]],
    ],
  ];
  return [
    link(english ? "Introduction" : "开始使用", "/", 0),
    ...groups.map(([zh, en, entries], index): SidebarItem => ({
      type: "group",
      label: english ? en : zh,
      order: index + 1,
      collapsed: false,
      children: entries.map(([label, path], order) => link(label, path, order)),
    })),
  ];
}
