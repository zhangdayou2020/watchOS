# emobank-watch

一个面向 Wear OS 智能手表的极简美观 React Native 项目，支持多分支协作开发，适配圆形/方形表盘，适合团队协作和企业级应用。

## 目录
- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [分支管理规范](#分支管理规范)
- [开发规范](#开发规范)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 项目简介

本项目基于 React Native，专为 Wear OS 圆形/方形表盘适配，追求极简美观体验，支持多分支协作和企业级开发流程。

## 功能特性
- 极简美观的多页面 UI
- 圆形/方形表盘自适应
- 任务/奖励/详情分页
- Redux 全局状态管理
- TypeScript 强类型支持
- 多分支协作开发

## 技术栈
- React Native
- Redux Toolkit
- TypeScript
- Jest（单元测试）
- 其他依赖详见 package.json

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Metro
npx react-native start

# Android 运行
npx react-native run-android

# iOS 运行
npx react-native run-ios
```

## 项目结构

```
.
├── android
├── ios
├── src
│   ├── api
│   ├── components
│   ├── screens
│   ├── store
│   └── ...
├── App.tsx
└── ...
```

## 分支管理规范
- main：生产分支，仅合并稳定代码
- dev：日常开发分支
- uat：测试/验收分支
- feature/xxx：新功能分支
- bugfix/xxx：修复分支

## 开发规范
- 统一代码风格，建议使用 Prettier/ESLint
- 提交信息建议遵循 Conventional Commits 规范
- 合并请走 Pull Request 流程，便于代码评审

## 常见问题
- Metro 端口占用、依赖安装、真机调试等问题可见 issue 区或补充

## 贡献指南
欢迎提 issue、PR，贡献代码！

## 许可证
MIT
