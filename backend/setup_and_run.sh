#!/bin/bash

# 检查SDKMAN是否已安装
if [ ! -d "$HOME/.sdkman" ]; then
    echo "SDKMAN未安装，正在安装..."
    curl -s "https://get.sdkman.io" | bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
else
    echo "SDKMAN已安装，继续执行..."
    source "$HOME/.sdkman/bin/sdkman-init.sh"
fi

# 安装Java 8
echo "安装Java 8..."
sdk install java 8.0.442-zulu

# 使用Java 8
echo "切换到Java 8..."
sdk use java 8.0.442-zulu

# 安装Maven
echo "安装Maven..."
sdk install maven

# 编译项目
echo "编译项目..."
mvn clean package -DskipTests

# 启动应用
echo "启动应用程序..."
java -jar target/answer-book-0.0.1-SNAPSHOT.jar