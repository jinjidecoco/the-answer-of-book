# 答案之书 - 部署指南

本文档提供了"答案之书"项目的完整部署指南，包括环境准备、配置步骤和维护说明。

## 系统要求

### 硬件要求
- CPU: 2核心或以上
- 内存: 最小4GB，推荐8GB
- 存储: 最小20GB SSD空间

### 软件要求
- 操作系统: Ubuntu 20.04 LTS或更高版本
- Docker: 20.10或更高版本
- Docker Compose: 2.0或更高版本
- Nginx: 1.18或更高版本

## 部署方式

本项目支持两种部署方式：传统部署和Docker容器化部署。

### 方式一：传统部署

#### 1. 后端部署

##### 环境准备
```bash
# 安装JDK 17
sudo apt update
sudo apt install openjdk-17-jdk

# 安装MySQL
sudo apt install mysql-server
sudo systemctl enable mysql
sudo systemctl start mysql

# 安装Redis
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

##### 创建数据库
```bash
# 登录MySQL
sudo mysql -u root -p

# 创建数据库和用户
CREATE DATABASE answerbook CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'answerbook'@'localhost' IDENTIFIED BY 'answerbook';
GRANT ALL PRIVILEGES ON answerbook.* TO 'answerbook'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

##### 创建应用用户
```bash
# 创建用户和目录
sudo useradd -m -s /bin/bash answerbook
sudo mkdir -p /opt/answer-book/backend
sudo chown -R answerbook:answerbook /opt/answer-book
```

##### 部署应用
```bash
# 复制JAR文件
sudo cp answer-book-0.0.1-SNAPSHOT.jar /opt/answer-book/backend/

# 创建并配置application-prod.yml
sudo nano /opt/answer-book/backend/application-prod.yml

# 复制systemd服务文件
sudo cp answer-book-backend.service /etc/systemd/system/
sudo systemctl daemon-reload

# 启动服务
sudo systemctl enable answer-book-backend
sudo systemctl start answer-book-backend
```

#### 2. 前端部署

##### 安装Nginx
```bash
sudo apt install nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

##### 配置Nginx
```bash
# 创建配置文件
sudo nano /etc/nginx/sites-available/answer-book.conf

# 添加以下配置
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/answer-book/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8088;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 启用配置
sudo ln -s /etc/nginx/sites-available/answer-book.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

##### 部署前端文件
```bash
# 创建目录
sudo mkdir -p /var/www/answer-book/frontend
sudo chown -R www-data:www-data /var/www/answer-book

# 复制构建文件
sudo cp -r dist/* /var/www/answer-book/frontend/
```

### 方式二：Docker容器化部署

#### 1. 安装Docker和Docker Compose
```bash
# 安装Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动Docker
sudo systemctl enable docker
sudo systemctl start docker
```

#### 2. 部署应用
```bash
# 创建部署目录
mkdir -p ~/answer-book
cd ~/answer-book

# 复制docker-compose.yml文件
cp /path/to/docker-compose.yml .

# 创建环境变量文件(可选)
nano .env

# 启动服务
sudo docker-compose up -d
```

## 配置HTTPS

### 使用Let's Encrypt获取证书
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo systemctl status certbot.timer
```

## 监控和日志

### 查看日志
```bash
# 传统部署 - 查看系统日志
sudo journalctl -u answer-book-backend.service

# Docker部署 - 查看容器日志
sudo docker-compose logs -f backend
sudo docker-compose logs -f frontend
```

### 设置监控
```bash
# 安装Prometheus和Grafana(略)
# 配置监控面板(略)
```

## 备份策略

### 数据库备份
```bash
# 创建备份脚本
nano ~/backup_db.sh

# 脚本内容
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/answer-book"
mkdir -p $BACKUP_DIR
mysqldump -u answerbook -p'answerbook' --databases answerbook > $BACKUP_DIR/answerbook_$DATE.sql
find $BACKUP_DIR -type f -name "answerbook_*.sql" -mtime +7 -delete

# 设置定时任务
chmod +x ~/backup_db.sh
crontab -e
# 添加: 0 2 * * * /home/user/backup_db.sh > /dev/null 2>&1
```

## 维护和更新

### 更新应用
```bash
# 传统部署 - 更新后端
sudo systemctl stop answer-book-backend
sudo cp new-version.jar /opt/answer-book/backend/answer-book-0.0.1-SNAPSHOT.jar
sudo systemctl start answer-book-backend

# Docker部署 - 更新应用
cd ~/answer-book
git pull # 获取最新的docker-compose配置
sudo docker-compose pull
sudo docker-compose down
sudo docker-compose up -d
```

## 常见问题排查

### 服务无法启动
1. 检查日志: `sudo journalctl -u answer-book-backend.service -n 100`
2. 检查配置文件正确性
3. 确认数据库和Redis服务正常运行

### 数据库连接问题
1. 检查数据库服务状态: `sudo systemctl status mysql`
2. 验证数据库凭证正确性
3. 检查防火墙配置

### Nginx相关问题
1. 检查Nginx状态: `sudo systemctl status nginx`
2. 检查配置语法: `sudo nginx -t`
3. 检查访问日志: `sudo tail -f /var/log/nginx/access.log`
4. 检查错误日志: `sudo tail -f /var/log/nginx/error.log`

## 联系和支持

如有任何部署方面的问题，请联系技术支持团队：
- 邮箱: support@answer-book.com
- 项目仓库: https://github.com/yourcompany/answer-book