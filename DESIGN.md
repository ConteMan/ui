# 文档与示例设计

保留 Nimbus 官方三栏文档布局。文档为阅读场景；交互示例为操作场景。

- 字体：本地 Inter Variable；中文使用系统中文字体；代码为 JetBrains Mono Variable。
- 文档颜色来自 Nimbus 的 `--nb-*`；组件色彩来自 `registry.json` 中的主题变量。
- 组件预览限定在 `.conteman-preview`，弹层 Portal 同样携带这个类。
- 深色模式由 Nimbus 的 `data-mode="dark"` 驱动；安装后的组件使用 shadcn 的 `.dark`。
- Button 与表格维持 Lyra 方角、细边框、紧凑文字；演示交互目标至少 44px。
- 主内容最大宽度约 70ch；移动端表格在自身容器内横向滚动。
- 所有控件保留键盘焦点、加载、禁用、错误和空状态。
- 社交卡使用 Inter 与 Noto Sans SC 字体；字体只在构建时读取，不发送到页面。
- P1 验收覆盖 1440px 与 390px 的浅深色页面、弹层键盘循环、搜索分页和状态切换。
- 后台外壳：分组标题仅在展开态显示，图标态保留分隔线与可访问名称；底部导航随长菜单滚动。标题行与页面声明的状态／操作行一起吸顶，高度在各布局内测量，字段聚焦避让整个吸顶区；手机改用 Sheet 导航。
- 主题提供 Base UI 状态变体（`data-open`、`data-checked`、`data-horizontal` 等）；组件沿用简写，安装器把它们写入入口 CSS，与 `shadcn/tailwind.css` 等价。
