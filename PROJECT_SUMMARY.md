# Chloe Website 项目全流程总结与指南

这份指南记录了从零开始构建、开发功能到最终部署上线的完整过程，特别是包含了我们在解决“缓存不更新”、“数据库不同步”等棘手问题时的关键经验。

## 1. 技术栈概览

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **数据库**: PostgreSQL (Neon via Vercel Storage)
- **ORM**: Prisma (用于操作数据库)
- **样式**: Tailwind CSS
- **部署**: Vercel

## 2. 核心功能实现

### 2.1 博客系统 (Blog)
- **数据模型 (`schema.prisma`)**:
  ```prisma
  model Post {
    id        String   @id @default(cuid())
    title     String
    slug      String   @unique  // 文章链接标识，必须唯一
    content   String
    imageUrl  String?  // 图片链接（可选）
    published Boolean  @default(false)
    // ...
  }
  ```
- **图片功能**: 我们在数据库中添加了 `imageUrl` 字段，允许在后台直接输入图片 URL，前台自动渲染。

### 2.2 管理后台 (Admin)
- **认证**: 使用 NextAuth.js 实现简单的密码保护。
- **表单**: 创建/编辑文章和项目。
- **关键优化**: 
  - **强制刷新**: 保存成功后使用 `window.location.href` 强制刷新页面，确保看到最新数据。
  - **错误处理**: 增加了对“重复 Slug”等错误的友好提示。

## 3. 部署全流程 (Deployment)

这是最关键的部分，包含了我们踩过的坑和解决方案。

### 3.1 准备工作
1.  代码上传到 GitHub。
2.  在 Vercel 导入项目。
3.  配置 Postgres 数据库 (Vercel Storage)。

### 3.2 环境变量 (Environment Variables)
在 Vercel 后台配置：
- `DATABASE_URL`: 数据库连接串 (自动生成)
- `AUTH_SECRET`: 用于加密 Session 的密钥
- `ADMIN_PASSWORD`: 后台登录密码

### 3.3 关键构建配置 (Build Command) 🌟
**这是解决“数据库字段不更新”的关键！**

默认的 Next.js 构建命令是 `next build`。但它不会自动更新数据库结构。
我们需要修改 `package.json` 的 `build` 脚本：

```json
"scripts": {
  "build": "prisma generate && prisma db push && next build"
}
```

- `prisma generate`: 生成最新的 Prisma Client 代码。
- **`prisma db push`**: 强制将本地定义的数据库结构（如新加的 `imageUrl`）同步到线上数据库。
- `next build`: 构建网站。

### 3.4 缓存与实时更新 (Caching Strategy) 🌟
Next.js 默认缓存非常激进。为了确保后台修改后前台立即更新，我们做了三层保障：

1.  **页面级**: 在 `page.tsx` 头部加入强制动态声明：
    ```typescript
    export const dynamic = 'force-dynamic';
    export const revalidate = 0;
    ```
2.  **数据级**: 使用 `unstable_noStore()` 告诉 Next.js 不要缓存查询结果：
    ```typescript
    import { unstable_noStore as noStore } from 'next/cache';
    // 在组件内调用
    noStore();
    ```
3.  **API级**: 在写入数据（POST/PUT/DELETE）成功后，主动清除缓存：
    ```typescript
    import { revalidatePath } from "next/cache";
    revalidatePath('/blog'); // 清除博客列表页缓存
    ```

## 4. 常见问题排查 (Troubleshooting)

### Q1: 后台保存了，前台不显示？
- **检查 Published**: 确认文章是否勾选了“Published”。
- **检查缓存**: 稍微等待几秒，或尝试强制刷新浏览器。我们的代码已经加了 `revalidatePath` 来最小化这个问题。

### Q2: 报错 "Unique constraint failed on slug"？
- **原因**: 试图使用一个已经存在的 Slug（URL路径）。
- **解决**: 修改 Slug 字段，使其唯一（例如在后面加个数字）。

### Q3: 报错 "Column does not exist"？
- **原因**: 代码里有新字段，但线上数据库还没更新。
- **解决**: 确保 `package.json` 的 build 脚本里包含了 `prisma db push`，然后重新部署。

## 5. 开发常用命令

- **启动本地服务器**: `npm run dev`
- **同步数据库结构**: `npx prisma db push`
- **查看数据库**: `npx prisma studio`

---
*Created by Trae AI Partner for Chloe*
