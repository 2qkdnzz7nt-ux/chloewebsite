# Chloe Website - 全栈开发与部署完整指南

这份指南总结了从零开始构建、开发、调试到最终部署 Chloe Website 的完整全栈流程。你可以将其作为未来开发的参考手册。

## 1. 技术栈概览 (Tech Stack)

本项目采用了目前最现代化的 React 全栈架构：
- **框架**: [Next.js 15 (App Router)](https://nextjs.org) - React 的全栈框架。
- **语言**: [TypeScript](https://www.typescriptlang.org) - 提供类型安全。
- **样式**: [Tailwind CSS](https://tailwindcss.com) - 原子化 CSS 框架。
- **数据库**: [PostgreSQL](https://www.postgresql.org) - 关系型数据库 (托管在 Vercel/Neon)。
- **ORM**: [Prisma](https://www.prisma.io) - 类型安全的数据库操作工具。
- **认证**: [Auth.js (NextAuth v5)](https://authjs.dev) - 处理管理员登录。
- **邮件**: [Resend](https://resend.com) - 开发者友好的邮件发送 API。
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand) - 轻量级全局状态管理 (用于购物车)。

---

## 2. 项目初始化 (Initialization)

### 创建项目
```bash
npx create-next-app@latest chloewebsite
# 选择: TypeScript, Tailwind, ESLint, App Router, No src directory
```

### 安装核心依赖
```bash
npm install prisma @prisma/client @auth/prisma-adapter next-auth@beta resend zustand lucide-react clsx tailwind-merge date-fns
```

### 初始化 Prisma
```bash
npx prisma init
```

---

## 3. 数据库与模型设计 (Database)

在 `prisma/schema.prisma` 中定义数据模型。这是整个应用的骨架。

### 核心模型
- **User**: 管理员账户。
- **Project**: 作品集项目 (Title, Category, Image, Link)。
- **Post**: 博客文章 (Title, Slug, Content, Published)。
- **Product**: 商品 (Name, Price, Description)。
- **Order & OrderItem**: 订单系统 (关联 Product，记录客户信息和状态)。

### 常用命令
- **同步数据库**: `npx prisma db push` (开发阶段常用，直接修改数据库结构)。
- **查看数据**: `npx prisma studio` (打开浏览器管理界面)。
- **生成 Client**: `npx prisma generate` (每次修改 schema 后必须运行)。

---

## 4. 后端 API 开发 (API Routes)

Next.js App Router 使用 `app/api/.../route.ts` 定义后端接口。

### 关键经验：缓存控制 (Caching Strategy)
**这是我们遇到的最大坑之一。** Next.js 默认会缓存 GET 请求。对于后台管理系统和需要实时更新的前台列表，必须强制禁用缓存。

**代码示例**:
```typescript
// app/api/projects/route.ts 或 app/admin/projects/page.tsx
export const dynamic = 'force-dynamic'; // 强制动态渲染
export const revalidate = 0;            // 0秒缓存
```

### API 最佳实践
- **Headers**: 发送 JSON 数据时，务必带上 `headers: { 'Content-Type': 'application/json' }`。
- **Error Handling**: 使用 `try...catch` 包裹逻辑，并返回标准的 HTTP 状态码 (200, 400, 500)。

---

## 5. 前端开发与交互 (Frontend)

### 后台管理 (Admin Dashboard)
- **表单体验**: 在提交表单时，提供明确的反馈 (如 `alert("Success")`)，并在跳转前等待数据写入。
- **刷新数据**: 使用 `router.refresh()` 触发服务端重新获取数据，配合 `force-dynamic` 确保看到最新内容。

### 购物车 (Shopping Cart)
- 使用 **Zustand** 并配合 `persist` 中间件，将购物车数据自动保存在 LocalStorage 中，刷新页面不丢失。

---

## 6. 邮件服务集成 (Email via Resend)

### 配置流程
1. 注册 [Resend.com](https://resend.com)。
2. 获取 API Key。
3. 在 `.env` 中配置 `RESEND_API_KEY`。

### 避坑指南 (Troubleshooting)
- **测试模式限制**: 在未配置自定义域名 (Domain Verification) 前，Resend **只能** 发送给注册账号的邮箱 (如 `fionalau1977@outlook.com`)。发送给其他邮箱会直接失败 (403 Forbidden)。
- **调试技巧**: 可以在 API 中捕获错误并打印，或者编写独立的测试脚本 (`scripts/test-resend.js`) 来验证 Key 是否有效。

---

## 7. 部署流程 (Deployment)

### 部署到 Vercel
1. 将代码推送到 GitHub。
2. 在 Vercel Dashboard 中 Import 项目。
3. **关键步骤**: 配置 Environment Variables (环境变量)。
   - `DATABASE_URL`: 生产环境数据库地址。
   - `RESEND_API_KEY`: 生产环境邮件 Key。
   - `AUTH_SECRET`: 用于加密 Session 的随机字符串。

### 生产环境检查清单
- [x] 环境变量是否都填了？(特别是 Resend Key)。
- [x] 数据库是否连接正常？
- [x] 域名是否解析正确？

---

## 8. 常见问题自查手册 (FAQ)

### Q: 为什么后台保存了，前台不显示？
**A**: 99% 是缓存问题。
- 检查 Page 文件是否加了 `export const dynamic = 'force-dynamic'`。
- 检查 API 路由是否加了 `revalidate = 0`。

### Q: 为什么无法上传图片/保存表单？
**A**:
- 检查 Network 面板，看 API 返回的错误信息。
- 检查 `fetch` 请求是否加了 `Content-Type: application/json`。
- 检查数据库字段类型 (如 `String?` 允许为空)。

### Q: 为什么收不到邮件？
**A**:
- 检查 Resend Key 是否正确。
- **检查收件人**: 测试环境下只能发给自己。
- 检查 Vercel 环境变量是否勾选了 `Production` 环境。

---

*Created by Trae AI Pair Programmer*
