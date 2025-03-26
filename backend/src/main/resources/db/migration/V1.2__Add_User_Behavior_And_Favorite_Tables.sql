-- 用户行为日志表
CREATE TABLE IF NOT EXISTS `t_user_behavior` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` varchar(64) NOT NULL COMMENT '用户ID',
  `type` varchar(32) NOT NULL COMMENT '行为类型（question-提问，share-分享，favorite-收藏）',
  `content` text COMMENT '行为内容',
  `content_id` bigint(20) DEFAULT NULL COMMENT '关联内容ID',
  `ip` varchar(64) DEFAULT NULL COMMENT '用户IP',
  `device_info` varchar(255) DEFAULT NULL COMMENT '设备信息',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_type` (`type`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户行为日志表';

-- 用户收藏表
CREATE TABLE IF NOT EXISTS `t_favorite` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` varchar(64) NOT NULL COMMENT '用户ID',
  `type` varchar(32) NOT NULL COMMENT '收藏类型（answer-答案，quote-每日一言）',
  `content_id` bigint(20) NOT NULL COMMENT '收藏内容ID',
  `content` text COMMENT '收藏内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_type_content` (`user_id`, `type`, `content_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_type` (`type`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户收藏表';