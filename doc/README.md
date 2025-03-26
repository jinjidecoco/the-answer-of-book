# 答案之书小程序项目说明

## 项目概述

本项目是基于《答案之书》核心逻辑的轻量级互动小程序，通过随机算法为用户提供趣味性答案，辅助决策或提供心灵慰藉。用户可以通过长按图腾触发答案，体验翻书效果，获得随机答案。UI设计采用玻璃拟态等视觉效果，注重高级感和质感。

## 目录结构

```
/answer
├── doc                      # 文档目录
│   ├── README.md            # 项目说明文档
│   ├── development-progress.md  # 开发进度文档
│   ├── api-doc.md           # API文档
│   └── data-dictionary.md   # 数据字典文档
├── frontend                 # 前端项目目录
│   ├── src                  # 源代码
│   │   ├── pages            # 页面
│   │   ├── components       # 组件
│   │   ├── static           # 静态资源
│   │   └── utils            # 工具函数
│   ├── package.json         # 依赖配置
│   └── README.md            # 前端说明
└── backend                  # 后端项目目录
    ├── src                  # 源代码
    │   ├── main             # 主代码
    │   └── test             # 测试代码
    ├── pom.xml              # Maven配置
    └── README.md            # 后端说明
```

## 技术选型

### 前端技术栈

- **框架**: Uniapp + Vue3
- **UI组件**: uView UI库 + 自定义悬浮窗控件
- **动画**: animate.css + 微信原生createAnimation
- **构建工具**: Webpack
- **状态管理**: Pinia

### 后端技术栈

- **核心框架**: SpringBoot 2.7.x
- **ORM框架**: MyBatis Plus
- **数据库**: MySQL 8.0
- **API文档**: Swagger
- **部署**: Docker + Nginx

## 启动命令

### 前端启动

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 开发模式启动
npm run dev:mp-weixin

# 构建生产版本
npm run build:mp-weixin
```

### 后端启动

```bash
# 进入后端目录
cd backend

# Maven构建
mvn clean package

# 运行JAR包
java -jar target/answer-book-0.0.1-SNAPSHOT.jar

# Docker方式启动
docker-compose up -d
```

## 核心功能

1. **随机答案**: 用户输入问题后，触发随机算法从答案库抽取结果，答案展示搭配动态特效
2. **每日一言**: 每日首次打开推送一句哲理/幽默语录，支持分享至社交平台
3. **交互仪式感**: 长按图腾触发答案（3秒等待动画），答案页增加「再试一次」按钮
4. **翻书效果**: 用户打开小程序后显示一个打开答案之书，然后有一个翻书的效果，显示出答案
5. **高级UI**: 运用玻璃拟态等视觉效果，遵守设计规范，注重UI细节