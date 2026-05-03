# English Coach · 30 天日常英语 📚

个人英语教练 · 30 天日常对话学习计划。包含每日任务、句子练习、随机测验和 AI 对话练习。

![Tech](https://img.shields.io/badge/React-18-61dafb) ![Build](https://img.shields.io/badge/Vite-5-646cff) ![Style](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ 功能

- **📅 学习计划** — 30 天每日任务（口语 / 听力 / 单字 / 文法 / 复习），每天 30 分钟以内
- **📖 句子练习** — 32 句常用句，4 个情境分类，每句含自然说法 / 直翻意思 / 发音提示
- **🔀 随机测验** — 中文翻英文，答错自动重排，直到说对为止
- **💬 对话练习** — AI 母语者陪练，A2-B1 等级，温和纠正

## 🚀 本地运行

需要 Node.js 18+。

```bash
# 1. 安装套件
npm install

# 2. 开发模式
npm run dev
# 浏览器开 http://localhost:5173

# 3. 打包
npm run build
```

## 🌐 部署到 GitHub Pages

### 方法 1：自动部署（推荐）

1. 在 GitHub 建一个新 repo，名称设为 `english-coach`（或其他名字）
2. 把这个项目推上去：
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/english-coach.git
   git push -u origin main
   ```
3. 在 GitHub repo 页：Settings → Pages → Source 选 **GitHub Actions**
4. 推送后会自动 build 并部署。完成后网址是：
   ```
   https://YOUR_USERNAME.github.io/english-coach/
   ```

### 重要：repo 名字 vs base path

`vite.config.js` 里有 `base: '/english-coach/'`。如果你的 repo 叫别的名字（例如 `my-english-app`），要改成：

```js
base: '/my-english-app/'
```

不然部署后 CSS / JS 会 404。

### 方法 2：手动部署

```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

## 🔑 对话练习功能（API Key）

只有「对话练习」需要 Anthropic API key（其他功能都不用）。

**取得 key**：[console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

**输入**：打开 app 右上角 ⚙️ 图示 → 贴 key → 存档。Key 存在浏览器的 localStorage（不会上传到 GitHub）。

### ⚠️ 安全警告

> 这个 app 让浏览器**直接呼叫** Anthropic API（用 `anthropic-dangerous-direct-browser-access` header）。
>
> - **只适合个人使用** — 部署到 GitHub Pages 后，**不要**把 URL 分享给别人，否则别人在你的电脑上能用你的 key
> - **不要把 API key commit 到 git** — `.gitignore` 已经设好，但还是别在代码里 hardcode key
> - **想公开使用**：要写一个后端 proxy（Cloudflare Workers / Vercel Functions / Netlify Functions），把 key 藏在伺服器端

### 想做后端 proxy？

最简单的方式是 [Cloudflare Workers](https://workers.cloudflare.com)：
1. 把 API key 设为 worker 的 secret
2. Worker 收到前端请求 → 加上 key → 转发到 Anthropic
3. 把 `src/App.jsx` 里 `fetch("https://api.anthropic.com/v1/messages", ...)` 改成你 worker 的 URL，移掉 `x-api-key` header

## 📝 自订内容

所有学习内容都在 `src/App.jsx` 顶部的两个常数：

- `SENTENCES` — 句子库，按情境分类
- `PLAN` — 30 天计划

直接改这两个就能调整内容，不用动 UI 代码。

## 📦 技术栈

- **React 18** — UI 框架
- **Vite 5** — 打包工具
- **Tailwind CSS 3** — 样式
- **lucide-react** — 图示
- **Anthropic API** — 对话练习（Claude Haiku 4.5 默认，可在设定切换）

## 📄 License

MIT — 自己用、改、分享都行。

---

*Three months. One step at a time. You've got this.* 🌱
