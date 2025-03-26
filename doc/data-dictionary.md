# 答案之书小程序数据字典

## 数据库设计

数据库采用MySQL 8.0，字符集使用utf8mb4，排序规则使用utf8mb4_unicode_ci。

## 表结构

### 1. 用户表 (t_user)

存储小程序用户基本信息。

| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | bigint | 20 | 否 | | 是 | 用户ID，自增主键 |
| openid | varchar | 64 | 否 | | | 微信用户唯一标识 |
| union_id | varchar | 64 | 是 | NULL | | 微信开放平台唯一标识 |
| nickname | varchar | 64 | 是 | NULL | | 用户昵称 |
| avatar_url | varchar | 255 | 是 | NULL | | 用户头像URL |
| gender | tinyint | 4 | 是 | 0 | | 性别：0未知，1男，2女 |
| country | varchar | 64 | 是 | NULL | | 国家 |
| province | varchar | 64 | 是 | NULL | | 省份 |
| city | varchar | 64 | 是 | NULL | | 城市 |
| language | varchar | 32 | 是 | NULL | | 语言 |
| last_login_time | datetime | | 是 | NULL | | 最后登录时间 |
| created_at | datetime | | 否 | CURRENT_TIMESTAMP | | 创建时间 |
| updated_at | datetime | | 否 | CURRENT_TIMESTAMP | | 更新时间 |
| deleted | tinyint | 1 | 否 | 0 | | 是否删除：0否，1是 |

索引：
- PRIMARY KEY (`id`)
- UNIQUE KEY `idx_openid` (`openid`)
- KEY `idx_union_id` (`union_id`)

### 2. 答案表 (t_answer)

存储答案之书中的所有可能答案。

| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | bigint | 20 | 否 | | 是 | 答案ID，自增主键 |
| content | varchar | 255 | 否 | | | 答案内容 |
| type | varchar | 32 | 否 | 'normal' | | 答案类型：normal普通，positive积极，negative消极，neutral中性 |
| status | tinyint | 1 | 否 | 1 | | 状态：0禁用，1启用 |
| created_at | datetime | | 否 | CURRENT_TIMESTAMP | | 创建时间 |
| updated_at | datetime | | 否 | CURRENT_TIMESTAMP | | 更新时间 |
| deleted | tinyint | 1 | 否 | 0 | | 是否删除：0否，1是 |

索引：
- PRIMARY KEY (`id`)
- KEY `idx_type` (`type`)
- KEY `idx_status` (`status`)

### 3. 每日一言表 (t_daily_quote)

存储每日推送的哲理/幽默语录。

| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | bigint | 20 | 否 | | 是 | 语录ID，自增主键 |
| content | varchar | 512 | 否 | | | 语录内容 |
| author | varchar | 64 | 是 | NULL | | 作者 |
| source | varchar | 128 | 是 | NULL | | 来源 |
| type | varchar | 32 | 否 | 'wisdom' | | 类型：wisdom哲理，humor幽默，inspiration励志 |
| publish_date | date | | 是 | NULL | | 发布日期，NULL表示未发布 |
| status | tinyint | 1 | 否 | 1 | | 状态：0禁用，1启用 |
| created_at | datetime | | 否 | CURRENT_TIMESTAMP | | 创建时间 |
| updated_at | datetime | | 否 | CURRENT_TIMESTAMP | | 更新时间 |
| deleted | tinyint | 1 | 否 | 0 | | 是否删除：0否，1是 |

索引：
- PRIMARY KEY (`id`)
- UNIQUE KEY `idx_publish_date` (`publish_date`)
- KEY `idx_type` (`type`)
- KEY `idx_status` (`status`)

### 4. 用户行为日志表 (t_user_behavior)

记录用户的行为日志，如查看答案、分享等。

| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | bigint | 20 | 否 | | 是 | 日志ID，自增主键 |
| user_id | bigint | 20 | 否 | | | 用户ID |
| behavior_type | varchar | 32 | 否 | | | 行为类型：view查看，share分享，feedback反馈 |
| target_id | bigint | 20 | 否 | | | 目标ID，如答案ID、每日一言ID等 |
| target_type | varchar | 32 | 否 | | | 目标类型：answer答案，daily_quote每日一言 |
| extra | json | | 是 | NULL | | 额外信息，如分享平台、反馈内容等 |
| ip | varchar | 64 | 是 | NULL | | 用户IP地址 |
| user_agent | varchar | 255 | 是 | NULL | | 用户代理信息 |
| created_at | datetime | | 否 | CURRENT_TIMESTAMP | | 创建时间 |

索引：
- PRIMARY KEY (`id`)
- KEY `idx_user_id` (`user_id`)
- KEY `idx_behavior_type` (`behavior_type`)
- KEY `idx_target` (`target_type`, `target_id`)
- KEY `idx_created_at` (`created_at`)

### 5. 分享记录表 (t_share)

记录用户生成的分享海报信息。

| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | bigint | 20 | 否 | | 是 | 分享ID，自增主键 |
| user_id | bigint | 20 | 否 | | | 用户ID |
| answer_id | bigint | 20 | 是 | NULL | | 答案ID |
| quote_id | bigint | 20 | 是 | NULL | | 每日一言ID |
| image_url | varchar | 255 | 否 | | | 分享图片URL |
| background_id | bigint | 20 | 是 | NULL | | 背景图ID |
| expires_at | datetime | | 否 | | | 过期时间 |
| created_at | datetime | | 否 | CURRENT_TIMESTAMP | | 创建时间 |
| updated_at | datetime | | 否 | CURRENT_TIMESTAMP | | 更新时间 |
| deleted | tinyint | 1 | 否 | 0 | | 是否删除：0否，1是 |

索引：
- PRIMARY KEY (`id`)
- KEY `idx_user_id` (`user_id`)
- KEY `idx_answer_id` (`answer_id`)
- KEY `idx_quote_id` (`quote_id`)
- KEY `idx_expires_at` (`expires_at`)

### 6. 背景图表 (t_background)

存储分享海报的背景图信息。

| 字段名 | 类型 | 长度 | 允许空 | 默认值 | 主键 | 说明 |
|--------|------|------|--------|--------|------|------|
| id | bigint | 20 | 否 | | 是 | 背景图ID，自增主键 |
| name | varchar | 64 | 否 | | | 背景图名称 |
| url | varchar | 255 | 否 | | | 背景图URL |
| thumbnail_url | varchar | 255 | 是 | NULL | | 缩略图URL |
| type | varchar | 32 | 否 | 'normal' | | 类型：normal普通，festival节日，season季节 |
| status | tinyint | 1 | 否 | 1 | | 状态：0禁用，1启用 |
| sort_order | int | 11 | 否 | 0 | | 排序顺序，数值越小越靠前 |
| created_at | datetime | | 否 | CURRENT_TIMESTAMP | | 创建时间 |
| updated_at | datetime | | 否 | CURRENT_TIMESTAMP | | 更新时间 |
| deleted | tinyint | 1 | 否 | 0 | | 是否删除：0否，1是 |

索引：
- PRIMARY KEY (`id`)
- KEY `idx_type` (`type`)
- KEY `idx_status` (`status`)
- KEY `idx_sort_order` (`sort_order`)

## 数据关系图

```
+--------+       +----------+       +--------------+
| t_user |------>| t_share  |<------| t_background |
+--------+       +----------+       +--------------+
    |                 ^
    |                 |
    v                 |
+------------------+  |
| t_user_behavior  |  |
+------------------+  |
    |                 |
    v                 |
+----------+          |
| t_answer |----------+
+----------+          |
                      |
+--------------+      |
| t_daily_quote|------+
+--------------+
```

## 初始数据

### 答案表初始数据示例

```sql
INSERT INTO `t_answer` (`content`, `type`) VALUES
('是的', 'positive'),
('不是', 'negative'),
('也许吧', 'neutral'),
('绝对不是', 'negative'),
('毫无疑问', 'positive'),
('不要犹豫', 'positive'),
('再等等看', 'neutral'),
('相信你的直觉', 'positive'),
('现在不是时候', 'negative'),
('放手去做', 'positive');
```

### 每日一言表初始数据示例

```sql
INSERT INTO `t_daily_quote` (`content`, `author`, `source`, `type`) VALUES
('生活中最重要的不是你所处的位置，而是你所朝的方向。', '奥利弗·温德尔·霍姆斯', NULL, 'wisdom'),
('不要等待机会，而要创造机会。', '林肯', NULL, 'inspiration'),
('人生就像骑自行车，为了保持平衡，你必须保持运动。', '爱因斯坦', NULL, 'wisdom'),
('世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。', '罗曼·罗兰', '《巨人三传》', 'inspiration'),
('如果你不给自己烦恼，别人也永远不可能给你烦恼。', '佚名', NULL, 'wisdom');
```

### 背景图表初始数据示例

```sql
INSERT INTO `t_background` (`name`, `url`, `thumbnail_url`, `type`, `sort_order`) VALUES
('星空', 'https://static.answerbook.example.com/backgrounds/starry_sky.jpg', 'https://static.answerbook.example.com/backgrounds/thumbnails/starry_sky.jpg', 'normal', 1),
('森林', 'https://static.answerbook.example.com/backgrounds/forest.jpg', 'https://static.answerbook.example.com/backgrounds/thumbnails/forest.jpg', 'normal', 2),
('海洋', 'https://static.answerbook.example.com/backgrounds/ocean.jpg', 'https://static.answerbook.example.com/backgrounds/thumbnails/ocean.jpg', 'normal', 3),
('春节', 'https://static.answerbook.example.com/backgrounds/spring_festival.jpg', 'https://static.answerbook.example.com/backgrounds/thumbnails/spring_festival.jpg', 'festival', 1),
('夏日', 'https://static.answerbook.example.com/backgrounds/summer.jpg', 'https://static.answerbook.example.com/backgrounds/thumbnails/summer.jpg', 'season', 1);
```

## 数据库版本控制

使用Flyway进行数据库版本控制，初始化脚本位于`backend/src/main/resources/db/migration/`目录下。

## 数据安全

1. 所有敏感数据（如用户openid）进行加密存储
2. 数据库定期备份
3. 实现数据访问权限控制
4. 定期清理过期数据（如过期的分享图片）