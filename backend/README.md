# 答案之书小程序后端项目

## 项目概述

本项目是「答案之书小程序」的后端部分，基于SpringBoot + MyBatis Plus开发，提供了答案之书的核心API服务，包括随机答案获取、每日一言、用户行为记录等功能。

## 技术栈

- **核心框架**: SpringBoot 2.7.x
- **ORM框架**: MyBatis Plus
- **数据库**: MySQL 8.0
- **API文档**: Swagger
- **部署**: Docker + Nginx
- **缓存**: Redis
- **安全**: Spring Security

## 目录结构

```
/backend
├── src                           # 源代码
│   ├── main                      # 主代码
│   │   ├── java                  # Java代码
│   │   │   └── com.answerbook    # 项目包
│   │   │       ├── config        # 配置类
│   │   │       ├── controller    # 控制器
│   │   │       ├── service       # 服务层
│   │   │       │   └── impl      # 服务实现
│   │   │       ├── mapper        # 数据访问层
│   │   │       ├── entity        # 实体类
│   │   │       ├── dto           # 数据传输对象
│   │   │       ├── vo            # 视图对象
│   │   │       ├── util          # 工具类
│   │   │       └── exception     # 异常处理
│   │   └── resources             # 资源文件
│   │       ├── mapper            # MyBatis XML映射文件
│   │       ├── application.yml   # 应用配置
│   │       └── db                # 数据库脚本
│   │           └── migration     # Flyway迁移脚本
│   └── test                      # 测试代码
│       └── java                  # Java测试代码
│           └── com.answerbook    # 测试包
├── pom.xml                       # Maven配置
└── README.md                     # 项目说明
```

## 核心功能

### 1. 随机答案API

提供随机答案获取接口，支持按类型筛选（积极、消极、中性等）。

### 2. 每日一言API

提供每日一言获取接口，支持按类型筛选（哲理、幽默、励志等）。

### 3. 用户行为记录

记录用户查看答案、分享等行为，用于数据分析和个性化推荐。

### 4. 分享功能

生成分享海报图片，支持自定义背景。

## 数据库设计

详见项目根目录下的`doc/data-dictionary.md`文件。

## API文档

详见项目根目录下的`doc/api-doc.md`文件。

## 开发指南

### 环境要求

- JDK 1.8+
- Maven 3.6+
- MySQL 8.0+
- Redis 6.0+

### 本地开发

```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd backend

# 编译项目
mvn clean compile

# 运行项目
mvn spring-boot:run
```


### 打包部署

```bash
# 打包
mvn clean package -Dmaven.test.skip=true

# 运行JAR包
java -jar target/answer-book-0.0.1-SNAPSHOT.jar

# Docker方式部署
docker-compose up -d
```

## 注意事项

1. 开发环境和生产环境使用不同的配置文件
2. 敏感信息（如数据库密码）使用环境变量或配置中心管理
3. 定期备份数据库
4. API接口需要做好限流和安全防护


我将为您创建一个admin用户，密码为123456。

```java:backend/src/main/java/com/answerbook/config/SecurityConfig.java
package com.answerbook.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * 安全配置类
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/swagger-ui/**", "/api-docs/**", "/mock/**", "/h2-console/**", "/auth/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .and()
            .httpBasic()
                .and()
            .csrf().disable()
            .headers().frameOptions().disable(); // 允许H2控制台使用iframe

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails adminUser = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("123456"))
                .roles("ADMIN")
                .build();

        UserDetails testUser = User.builder()
                .username("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(adminUser, testUser);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

```bash
cd backend && mvn spring-boot:run
```

```bash
mvn spring-boot:run
```

```bash
lsof -i :8088 | grep LISTEN
```

```bash
kill 9830
```

```bash
lsof -i :8088 | grep LISTEN
```

```bash
mvn spring-boot:run
```



## 后端服务访问信息

1. **后端服务地址**:
   - 基础URL: http://localhost:8088/api

2. **账号信息**:
   - 管理员账号:
     - 用户名: **admin**
     - 密码: **123456**
     - 权限: ADMIN角色，可访问所有API

   - 普通用户账号:
     - 用户名: **user**
     - 密码: **password**
     - 权限: USER角色，访问权限受限

3. **API文档**:
   - Swagger UI: http://localhost:8088/api/swagger-ui.html
   - OpenAPI JSON: http://localhost:8088/api/api-docs

4. **公开API路径**:
   - 无需认证即可访问: `/swagger-ui/**`, `/api-docs/**`, `/mock/**`, `/h2-console/**`, `/auth/**`
   - 需要ADMIN角色: `/admin/**`
   - 其他API需要登录认证

5. **数据库控制台**:
   - H2控制台: http://localhost:8088/api/h2-console
   - JDBC URL: jdbc:h2:mem:answerbook
   - 用户名: sa
   - 密码: (留空)


image.png

