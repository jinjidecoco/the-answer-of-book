-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像URL',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 答案表
CREATE TABLE IF NOT EXISTS `answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '答案ID',
  `content` varchar(500) NOT NULL COMMENT '答案内容',
  `type` tinyint(4) DEFAULT '1' COMMENT '类型：1-肯定，2-中性，3-否定',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='答案表';

-- 每日一言表
CREATE TABLE IF NOT EXISTS `daily_quote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '一言ID',
  `content` varchar(500) NOT NULL COMMENT '一言内容',
  `author` varchar(100) DEFAULT NULL COMMENT '作者',
  `source` varchar(100) DEFAULT NULL COMMENT '来源',
  `type` tinyint(4) DEFAULT '1' COMMENT '类型：1-励志，2-生活，3-哲学',
  `quote_date` date DEFAULT NULL COMMENT '日期',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_date` (`quote_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='每日一言表';

-- 用户行为记录表
CREATE TABLE IF NOT EXISTS `user_behavior` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '行为ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `behavior_type` varchar(20) NOT NULL COMMENT '行为类型：SEARCH-提问，VIEW-查看',
  `behavior_content` varchar(500) DEFAULT NULL COMMENT '行为内容',
  `ip_address` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_behavior_type` (`behavior_type`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户行为记录表';

-- 用户收藏表
CREATE TABLE IF NOT EXISTS `user_collection` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `answer_id` bigint(20) NOT NULL COMMENT '答案ID',
  `question` varchar(500) DEFAULT NULL COMMENT '提问内容',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_answer` (`user_id`, `answer_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户收藏表';