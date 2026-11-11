# Conteman UI

可复制、可组合的 React 组件。基于 Base UI、Tailwind CSS 4 和 shadcn registry，提供中文与英文文档、实时示例和浅深色主题。

文档：https://ui.conteman.com · English：https://ui.conteman.com/en/

先在已有 Tailwind CSS 4 的 React 项目运行 `npx shadcn@4.23.0 init`，再在 `components.json` 中加入：

```json
{
  "registries": {
    "@conteman": "https://ui.conteman.com/r/{name}.json"
  }
}
```

```sh
npx shadcn add @conteman/button
npx shadcn add @conteman/data-table
```

DataTable 会自动安装 Button、Input、Table、工具函数与主题。所有文案由调用方传入。

## 本地开发

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm preview
```

完成 Cloudflare 登录后运行 `pnpm deploy`。该命令先校验与构建，再用 `cf deploy dist` 发布静态资源；域名配置见 `cloudflare.config.ts`。

`registry/` 是组件唯一源码；`registry.json` 声明分发依赖与主题。`pnpm build` 先运行 `shadcn build` 到 `public/r/`，再构建 Nimbus。`skills/use-conteman-ui/` 自动发布到 `/.well-known/agent-skills/`。

Nimbus 目前只有站点级 `locale`。本项目通过 `/en/` 内容、语言感知的导航与页面元数据补齐双语切换。Nimbus 的 `data-mode` 通过预览作用域映射到组件的主题变量；接入项目使用标准 `.dark`。

许可：MIT。上游许可见 `LICENSE.upstream.md`。使用官方 Nimbus 脚手架 0.8.3；具体依赖固定于 `pnpm-lock.yaml`。
