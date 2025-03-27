FROM openjdk:8-jdk-alpine as build

WORKDIR /workspace/app

# 复制Maven包
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# 构建应用
RUN ./mvnw clean package -DskipTests
# 如果mvnw权限问题，使用下面的命令
# RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# 第二阶段：运行时镜像
FROM openjdk:8-jdk-alpine

VOLUME /tmp

# 复制构建好的JAR
COPY --from=build /workspace/app/target/answer-book-0.0.1-SNAPSHOT.jar app.jar

# 环境变量
ENV SPRING_PROFILES_ACTIVE=docker

# 启动应用
ENTRYPOINT ["java", "-jar", "/app.jar"]