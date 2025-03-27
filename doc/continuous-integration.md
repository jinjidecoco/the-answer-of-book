# 答案之书 - 持续集成/持续部署方案

## 概述

本文档详细描述了"答案之书"项目的CI/CD（持续集成/持续部署）流程设计和实现。该方案旨在实现代码提交后自动构建、测试和部署，确保产品质量并加速交付过程。

## CI/CD 工作流程

### 工作流程图

```
代码提交 -> 代码检查 -> 构建 -> 单元测试 -> 集成测试 -> 生成制品 -> 部署到测试环境 -> 测试验收 -> 部署到生产环境
```

### 触发条件

- **前端代码**：当`frontend`目录的代码有变更并提交到主分支时
- **后端代码**：当`backend`目录的代码有变更并提交到主分支时
- **手动触发**：支持手动触发完整构建流程

## GitHub Actions 配置

项目使用GitHub Actions作为CI/CD平台，配置文件位于`.github/workflows/`目录下。

### 前端构建流程 (frontend-ci.yml)

```yaml
name: Frontend CI/CD

on:
  push:
    branches: [ main, master ]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'frontend/**'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build project
        run: pnpm run build:mp-weixin

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: frontend-build
          path: frontend/dist/build/mp-weixin

  deploy-test:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: frontend-build
          path: frontend-build

      - name: Deploy to test server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.TEST_SERVER_HOST }}
          username: ${{ secrets.TEST_SERVER_USER }}
          key: ${{ secrets.TEST_SERVER_SSH_KEY }}
          source: "frontend-build/*"
          target: "/var/www/answer-book/frontend"
          strip_components: 1
```

### 后端构建流程 (backend-ci.yml)

```yaml
name: Backend CI/CD

on:
  push:
    branches: [ main, master ]
    paths:
      - 'backend/**'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'backend/**'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend

    steps:
      - uses: actions/checkout@v3

      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: maven

      - name: Build with Maven
        run: mvn -B package -DskipTests

      - name: Run tests
        run: mvn test

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: backend-build
          path: backend/target/answer-book-0.0.1-SNAPSHOT.jar

  deploy-test:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: backend-build
          path: backend-build

      - name: Deploy to test server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.TEST_SERVER_HOST }}
          username: ${{ secrets.TEST_SERVER_USER }}
          key: ${{ secrets.TEST_SERVER_SSH_KEY }}
          source: "backend-build/answer-book-0.0.1-SNAPSHOT.jar"
          target: "/opt/answer-book/backend"
          strip_components: 1

      - name: Restart service
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.TEST_SERVER_HOST }}
          username: ${{ secrets.TEST_SERVER_USER }}
          key: ${{ secrets.TEST_SERVER_SSH_KEY }}
          script: |
            systemctl restart answer-book-backend.service
```

### Docker 构建流程 (docker-ci.yml)

```yaml
name: Docker Build and Push

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: yourcompany/answer-book-backend
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            latest

      - name: Build and push Backend
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: Extract metadata for Frontend
        id: meta-frontend
        uses: docker/metadata-action@v4
        with:
          images: yourcompany/answer-book-frontend
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            latest

      - name: Build and push Frontend
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: true
          tags: ${{ steps.meta-frontend.outputs.tags }}
          labels: ${{ steps.meta-frontend.outputs.labels }}
```

## 生产环境部署流程

生产环境部署采用蓝绿部署策略，确保服务平滑切换和零停机部署。

### 部署步骤

1. **准备阶段**
   - 创建新的环境（绿环境）
   - 配置必要的环境参数

2. **部署阶段**
   - 部署最新版本到绿环境
   - 运行应用健康检查

3. **验证阶段**
   - 执行自动化测试
   - 进行基本功能验证

4. **切换阶段**
   - 将流量从蓝环境逐步切换到绿环境
   - 监控系统状态和性能指标

5. **完成阶段**
   - 确认流量完全切换到绿环境
   - 停用旧环境（蓝环境）

### 回滚策略

如果在部署过程中发现问题，系统支持快速回滚：

1. 将流量路由回蓝环境
2. 保留绿环境以便进行问题诊断
3. 记录回滚事件和原因

## 监控与告警

CI/CD流程中集成了自动化监控与告警系统：

1. **构建监控**
   - 构建失败自动通知到开发团队
   - 构建时间异常告警

2. **部署监控**
   - 部署成功/失败通知
   - 环境健康状态监控

3. **服务监控**
   - 应用性能指标监控
   - 错误率监控
   - 服务可用性监控

## 安全考量

CI/CD流程中实施了以下安全措施：

1. **凭证管理**
   - 所有敏感凭证存储在GitHub Secrets中
   - 定期轮换凭证

2. **代码扫描**
   - 集成依赖项安全扫描
   - 代码质量检查

3. **镜像扫描**
   - Docker镜像漏洞扫描
   - 只允许安全镜像部署到生产环境

## 总结

该CI/CD流程为"答案之书"项目提供了自动化的构建、测试和部署能力，大大提高了开发效率，降低了人为错误的风险，同时确保了产品质量和部署的可靠性。通过持续改进此流程，我们将进一步优化开发体验和产品交付速度。