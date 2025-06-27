# 日历备忘录应用

一个现代化的日历备忘录单页应用，使用React、Tailwind CSS和Font Awesome构建，支持日期选择、备忘录管理和本地数据持久化。

## ✨ 功能特点

- 📅 直观的日历视图，支持月份导航和日期选择
- 📝 备忘录管理，可添加、编辑和删除备忘录
- 💾 使用localStorage进行数据持久化
- 📱 响应式设计，适配桌面端和移动端
- 🎨 现代化UI，包含卡片式设计、柔和阴影和微妙动画
- 🔄 即时保存和错误处理

## 🚀 技术栈

- **前端框架**: React
- **构建工具**: Vite
- **样式解决方案**: Tailwind CSS v3
- **图标库**: Font Awesome
- **日期处理**: date-fns
- **本地存储**: localStorage

## 📋 安装与运行

### 前提条件
- Node.js (v14.0.0或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆本仓库
```bash
https://github.com/yourusername/calendar-memo-app.git
cd calendar-memo-app
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:5173](http://localhost:5173)

## 🔨 构建生产版本

```bash
npm run build
```

构建后的文件将保存在 `dist` 目录中。

## ☁️ Cloudflare Pages 部署

### 方法一：通过Cloudflare Pages控制台部署

1. 将项目推送到GitHub仓库

2. 在Cloudflare Pages中创建新项目，关联你的GitHub仓库

3. 配置构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **环境变量**: 添加 `NODE_VERSION=20`

4. 点击部署，等待构建完成

5. 部署成功后，你将获得一个Cloudflare Pages域名

### 方法二：使用Wrangler CLI部署

1. 安装Cloudflare Wrangler CLI
```bash
npm install -g wrangler
```

2. 登录Cloudflare账号
```bash
wrangler login
```

3. 在项目根目录创建`wrangler.toml`文件
```toml
name = "calendar-diary"
type = "static_site"
build.command = "npm run build"
build.publish = "dist"
compatibility_date = "2023-10-01"

[build.upload]
format = "service-worker"
```

4. 部署项目
```bash
wrangler deploy
```

### 自定义域名配置

1. 在Cloudflare Pages项目设置中，点击"自定义域名"
2. 添加你的域名（需先将域名DNS解析到Cloudflare）
3. 按照提示完成SSL证书配置

### 持续部署

Cloudflare Pages会自动监听GitHub仓库变化，当你推送到主分支时，将自动触发新的构建和部署。

## ⚙️ 自定义配置

### 基础路径配置
如果需要在子路径下部署，可以设置环境变量：
```bash
BASE_URL=/your-subpath npm run build
```

### 颜色主题
可以在 `tailwind.config.js` 文件中修改颜色配置：
```js
colors: {
  primary: '#165DFF', // 主色调
  secondary: '#36BFFA', // 辅助色
  // ...其他颜色
}
```

## 📄 项目结构

```
/src
  /components    # React组件
    Calendar.jsx  # 日历组件
    MemoEditor.jsx # 备忘录编辑器组件
  /assets        # 静态资源
  App.jsx        # 应用入口组件
  index.css      # 全局样式
/tailwind.config.js # Tailwind配置
/postcss.config.js  # PostCSS配置
vite.config.js   # Vite配置
package.json     # 项目依赖
```

## 📝 许可证

本项目采用MIT许可证。

## 🙏 致谢

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [date-fns](https://date-fns.org/)
- [Vite](https://vitejs.dev/)
"# Calendar-Diary"
