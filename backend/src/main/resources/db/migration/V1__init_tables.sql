-- 用户表
CREATE TABLE IF NOT EXISTS `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `openid` varchar(64) NOT NULL COMMENT '微信用户唯一标识',
  `union_id` varchar(64) DEFAULT NULL COMMENT '微信开放平台唯一标识',
  `nickname` varchar(64) DEFAULT NULL COMMENT '用户昵称',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '用户头像URL',
  `gender` tinyint(4) DEFAULT '0' COMMENT '性别：0未知，1男，2女',
  `country` varchar(64) DEFAULT NULL COMMENT '国家',
  `province` varchar(64) DEFAULT NULL COMMENT '省份',
  `city` varchar(64) DEFAULT NULL COMMENT '城市',
  `language` varchar(32) DEFAULT NULL COMMENT '语言',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除：0否，1是',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_openid` (`openid`),
  KEY `idx_union_id` (`union_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 答案表
CREATE TABLE IF NOT EXISTS `t_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '答案ID',
  `content` varchar(255) NOT NULL COMMENT '答案内容',
  `type` varchar(32) NOT NULL DEFAULT 'normal' COMMENT '答案类型：normal普通，positive积极，negative消极，neutral中性',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0禁用，1启用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除：0否，1是',
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='答案表';

-- 每日一言表
CREATE TABLE IF NOT EXISTS `t_daily_quote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '语录ID',
  `content` varchar(512) NOT NULL COMMENT '语录内容',
  `author` varchar(64) DEFAULT NULL COMMENT '作者',
  `source` varchar(128) DEFAULT NULL COMMENT '来源',
  `type` varchar(32) NOT NULL DEFAULT 'wisdom' COMMENT '类型：wisdom哲理，humor幽默，inspiration励志',
  `publish_date` date DEFAULT NULL COMMENT '发布日期，NULL表示未发布',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态：0禁用，1启用',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除：0否，1是',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_publish_date` (`publish_date`),
  KEY `idx_type` (`type`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='每日一言表';

-- 用户行为日志表
CREATE TABLE IF NOT EXISTS `t_user_behavior` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `behavior_type` varchar(32) NOT NULL COMMENT '行为类型：view查看，share分享，feedback反馈',
  `target_id` bigint(20) NOT NULL COMMENT '目标ID，如答案ID、每日一言ID等',
  `target_type` varchar(32) NOT NULL COMMENT '目标类型：answer答案，daily_quote每日一言',
  `extra` json DEFAULT NULL COMMENT '额外信息，如分享平台、反馈内容等',
  `ip` varchar(64) DEFAULT NULL COMMENT '用户IP地址',
  `user_agent` varchar(255) DEFAULT NULL COMMENT '用户代理信息',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_behavior_type` (`behavior_type`),
  KEY `idx_target` (`target_type`,`target_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户行为日志表';

-- 分享记录表
CREATE TABLE IF NOT EXISTS `t_share` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '分享ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `share_type` varchar(32) NOT NULL COMMENT '分享类型：answer答案，daily_quote每日一言',
  `target_id` bigint(20) NOT NULL COMMENT '目标ID',
  `platform` varchar(32) NOT NULL COMMENT '分享平台：wechat微信，moments朋友圈，qq，weibo微博',
  `image_url` varchar(255) DEFAULT NULL COMMENT '分享图片URL',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_share_type` (`share_type`,`target_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分享记录表';

-- 初始化答案数据
INSERT INTO `t_answer` (`content`, `type`) VALUES
('相信你的直觉', 'positive'),
('是时候改变了', 'neutral'),
('放手吧', 'neutral'),
('再等等看', 'neutral'),
('全力以赴', 'positive'),
('不要犹豫', 'positive'),
('需要更多思考', 'neutral'),
('答案就在你身边', 'positive'),
('这不是正确的选择', 'negative'),
('勇敢尝试', 'positive');

-- 初始化每日一言数据
INSERT INTO `t_daily_quote` (`content`, `author`, `source`, `type`) VALUES
('生活不是等待风暴过去，而是学会在雨中跳舞。', '佚名', NULL, 'wisdom'),
('人生就像一杯茶，不会苦一辈子，但总会苦一阵子。', '佚名', NULL, 'wisdom'),
('成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。', '佚名', NULL, 'inspiration'),
('笑是一种力量，微笑是一种智慧。', '佚名', NULL, 'wisdom'),
('人生最大的敌人是自己怀疑自己。', '佚名', NULL, 'inspiration');