# Docker方式启动后端服务并完成前端联调指南

本文档提供详细步骤，指导如何使用Docker方式启动后端服务，并与前端进行联调测试。

## 前提条件

1. 安装Docker和Docker Compose
   ```bash
   # 安装Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # 安装Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # 启动Docker服务
   sudo systemctl enable docker
   sudo systemctl start docker
   ```

2. 准备好前端和后端代码

## 步骤一：构建和启动后端服务

### 1. 使用docker-compose快速启动
```bash
# 进入项目根目录
cd /path/to/answer-book

# 启动后端服务及依赖（MySQL和Redis）
docker-compose up -d backend
```

这个命令会根据项目根目录下的`docker-compose.yml`文件，同时启动以下容器：
- MySQL数据库（如果在docker-compose.yml中配置）
- Redis缓存（如果在docker-compose.yml中配置）
- 后端Spring Boot应用

### 2. 查看服务状态
```bash
# 查看所有容器运行状态
docker-compose ps

# 查看后端服务日志
docker-compose logs -f backend
```

确保所有服务都处于`Up`状态，特别检查后端服务是否正常启动，没有报错。

### 3. 验证后端API可访问性
```bash
# 测试API是否可访问（随机答案API）
curl http://localhost:8088/api/v1/answers/random

# 测试每日一言API
curl http://localhost:8088/api/v1/quotes/daily
```

如果返回JSON数据，说明后端服务运行正常。

## 步骤二：配置前端连接后端

### 1. 修改前端API请求地址（如果需要）

如果前端代码中的API地址配置不正确，需要修改为Docker环境中的地址。通常在前端项目中会有一个配置文件，如`src/config/api.js`或类似位置：

```javascript
// 示例：修改API基础URL
const API_BASE_URL = 'http://localhost:8088/api';
```

确保前端代码指向正确的后端API地址。

### 2. 启动前端开发服务器
```bash
# 进入前端目录
cd frontend

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev:mp-weixin
```

## 步骤三：进行前后端联调

### 1. 打开微信开发者工具

- 微信开发者工具 -> 导入项目
- 选择项目路径：`/path/to/answer-book/frontend/dist/dev/mp-weixin`
- 填入小程序AppID（如果有）或选择测试号

### 2. 进行接口联调测试

在小程序中测试以下功能：

1. **随机答案获取功能**
   - 点击图腾获取随机答案
   - 检查答案是否正确显示
   - 验证翻书动画效果

2. **每日一言功能**
   - 进入每日一言页面
   - 验证是否正确显示内容
   - 测试刷新功能

3. **用户行为记录功能**
   - 使用图腾功能多次后
   - 检查历史记录是否正确显示

4. **分享功能**
   - 测试分享给好友功能
   - 验证分享卡片内容是否正确

### 3. 问题排查

如果在联调过程中遇到问题：

#### 后端问题排查
```bash
# 查看详细日志
docker-compose logs -f backend

# 检查容器健康状态
docker-compose ps

# 重启后端服务
docker-compose restart backend

# 如果需要，可以进入容器内部调试
docker-compose exec backend sh
```

#### 数据库问题排查
```bash
# 连接到MySQL容器
docker-compose exec mysql mysql -u answerbook -p

# 查看Redis数据
docker-compose exec redis redis-cli
```

#### 前端问题排查
- 检查微信开发者工具的Console面板是否有错误
- 检查Network面板中API请求状态和返回数据
- 验证前端代码中API地址配置是否正确

## 步骤四：完成联调后保存工作

### 1. 记录测试结果
记录所有测试的功能点和结果，特别是：
- 成功的功能点
- 发现的问题和解决方案
- 性能指标

### 2. 停止Docker服务（如需要）
```bash
# 在不需要继续测试时停止服务
docker-compose down

# 如果需要保留数据但停止容器
docker-compose stop
```

## 常见问题及解决方案

### 1. 后端服务启动失败
**问题**：docker-compose up后，后端服务容器自动退出
**解决方案**：
- 检查后端应用配置文件中的数据库连接设置
- 确认MySQL服务已完全启动（可能需要等待几秒）
- 查看详细日志：`docker-compose logs backend`

### 2. 前端无法连接后端API
**问题**：前端请求API时出现网络错误
**解决方案**：
- 确认Docker网络配置正确
- 检查防火墙设置，确保端口开放
- 验证API地址是否正确（包括端口号）

### 3. 数据库连接问题
**问题**：后端报数据库连接错误
**解决方案**：
- 确认MySQL容器运行正常
- 检查数据库用户名密码配置
- 如果使用持久化卷，检查权限设置

### 4. Redis连接问题
**问题**：缓存相关功能不正常
**解决方案**：
- 确认Redis容器运行正常
- 检查Redis连接配置
- 尝试重启Redis容器：`docker-compose restart redis`

## 附录：关键配置文件

### docker-compose.yml
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: answerbook-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: answerbook
      MYSQL_USER: answerbook
      MYSQL_PASSWORD: answerbook
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - answerbook-network

  redis:
    image: redis:6.2-alpine
    container_name: answerbook-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - answerbook-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: answerbook-backend
    restart: always
    ports:
      - "8088:8088"
    depends_on:
      - mysql
      - redis
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    networks:
      - answerbook-network

volumes:
  mysql-data:
  redis-data:

networks:
  answerbook-network:
    driver: bridge
```

### application-docker.yml (后端配置示例)
```yaml
server:
  port: 8088

spring:
  datasource:
    url: jdbc:mysql://mysql:3306/answerbook?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: answerbook
    password: answerbook
    driver-class-name: com.mysql.cj.jdbc.Driver

  redis:
    host: redis
    port: 6379
    database: 0
```