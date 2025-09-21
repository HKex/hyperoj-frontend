# HyperOJ

一个现代化的在线编程评测平台，帮助程序员提升编程技能。

## ✨ 特性

- 🎯 **题目管理** - 支持题目的增删改查和管理
-  **在线编程** - 集成 Monaco Editor，支持多种编程语言
-  **Markdown 支持** - 题目描述支持 Markdown 格式
- 👤 **用户系统** - 用户注册、登录和个人中心
-  **提交记录** - 查看和管理代码提交历史
-  **现代 UI** - 基于 Arco Design 的美观界面
-  **响应式设计** - 支持桌面和移动端访问

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **UI 组件库**: Arco Design Vue
- **状态管理**: Vuex 4
- **路由管理**: Vue Router 4
- **代码编辑器**: Monaco Editor
- **Markdown 编辑器**: ByteMD
- **HTTP 客户端**: Axios
- **构建工具**: Vue CLI 5

## 📦 安装依赖

```bash
npm install
```

## 🚀 开发

启动开发服务器：

```bash
npm run serve
```

应用将在 `http://localhost:8080` 启动。

## ️ 构建

构建生产版本：

```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

## 🔍 代码检查

运行 ESLint 检查：

```bash
npm run lint
```

## 📁 项目结构

```
src/
├── access/          # 权限控制
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── CodeEditor.vue    # 代码编辑器
│   ├── GlobalHeader.vue  # 全局头部
│   ├── MDEditor.vue      # Markdown 编辑器
│   └── MDViewer.vue      # Markdown 查看器
├── layouts/         # 布局组件
├── plugins/         # 插件配置
├── router/          # 路由配置
├── store/           # Vuex 状态管理
├── views/           # 页面组件
│   ├── question/         # 题目相关页面
│   │   ├── AddQuestionView.vue      # 添加题目
│   │   ├── ListQuestionView.vue     # 题目列表
│   │   ├── QuestionView.vue         # 题目详情
│   │   └── ManageQuestionView.vue   # 题目管理
│   └── user/            # 用户相关页面
│       ├── UserLoginView.vue        # 用户登录
│       └── UserRegisterView.vue     # 用户注册
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

## 🎯 主要功能

### 题目管理
- 浏览题目列表
- 查看题目详情和描述
- 在线编写和提交代码
- 查看提交记录和结果

### 用户系统
- 用户注册和登录
- 个人中心和设置
- 签到日历功能

### 管理功能
- 题目管理（管理员）
- 用户权限控制

## ⚙️ 配置

项目配置文件：
- `vue.config.js` - Vue CLI 配置
- `tsconfig.json` - TypeScript 配置
- `.eslintrc.js` - ESLint 配置
- `babel.config.js` - Babel 配置

更多配置信息请参考 [Vue CLI 配置参考](https://cli.vuejs.org/config/)。
