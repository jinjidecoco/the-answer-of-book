-- 初始用户数据
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `avatar`, `email`, `phone`, `status`, `create_time`, `update_time`) VALUES
(1, 'admin', '$2a$10$rLEkBds6WyZBJ8aq0LRzEe.FIiWTjkS5/Jx.VuLYjXD3F/U2TqNI.', '管理员', 'https://example.com/avatar/admin.jpg', 'admin@example.com', '13800000000', 1, NOW(), NOW()),
(2, 'test', '$2a$10$rLEkBds6WyZBJ8aq0LRzEe.FIiWTjkS5/Jx.VuLYjXD3F/U2TqNI.', '测试用户', 'https://example.com/avatar/test.jpg', 'test@example.com', '13900000000', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE update_time = NOW();

-- 随机答案数据
INSERT INTO `answer` (`id`, `content`, `type`, `create_time`, `update_time`) VALUES
(1, '是的，毫无疑问。', 1, NOW(), NOW()),
(2, '这是确定的。', 1, NOW(), NOW()),
(3, '不用怀疑。', 1, NOW(), NOW()),
(4, '是的，绝对如此。', 1, NOW(), NOW()),
(5, '你可以相信它。', 1, NOW(), NOW()),
(6, '正如我所看到的，是的。', 1, NOW(), NOW()),
(7, '很可能。', 1, NOW(), NOW()),
(8, '前景良好。', 1, NOW(), NOW()),
(9, '迹象表明是肯定的。', 1, NOW(), NOW()),
(10, '是。', 1, NOW(), NOW()),
(11, '回答模糊，请再试一次。', 2, NOW(), NOW()),
(12, '请稍后再问。', 2, NOW(), NOW()),
(13, '最好现在不要告诉你。', 2, NOW(), NOW()),
(14, '现在无法预测。', 2, NOW(), NOW()),
(15, '专心再问一次。', 2, NOW(), NOW()),
(16, '不要指望它。', 3, NOW(), NOW()),
(17, '我的回答是否定的。', 3, NOW(), NOW()),
(18, '我的消息来源说不。', 3, NOW(), NOW()),
(19, '前景不太好。', 3, NOW(), NOW()),
(20, '非常值得怀疑。', 3, NOW(), NOW())
ON DUPLICATE KEY UPDATE update_time = NOW();

-- 每日一言数据
INSERT INTO `daily_quote` (`id`, `content`, `author`, `source`, `type`, `quote_date`, `create_time`, `update_time`) VALUES
(1, '生活中最重要的事情是明确什么对你最重要，然后忽略其他的一切。', '卡尔·拉格斐', '', 1, CURDATE(), NOW(), NOW()),
(2, '能给别人快乐的人，自己也会得到快乐。', '佚名', '谚语', 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), NOW(), NOW()),
(3, '不要用过去的错误惩罚自己，而要用它们指导自己。', '安妮·拉莫特', '', 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), NOW(), NOW()),
(4, '真正的成功是内心的平静。', '达赖喇嘛', '', 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), NOW(), NOW()),
(5, '简单是最终的复杂。', '达芬奇', '', 1, DATE_ADD(CURDATE(), INTERVAL 4 DAY), NOW(), NOW()),
(6, '世界上没有完美的个体，只有完美的瞬间。', '鲁斯·鲍尔森', '', 1, DATE_ADD(CURDATE(), INTERVAL 5 DAY), NOW(), NOW()),
(7, '不要害怕改变，你可能会失去一些好东西，但你可能会获得更好的东西。', '佚名', '', 1, DATE_ADD(CURDATE(), INTERVAL 6 DAY), NOW(), NOW())
ON DUPLICATE KEY UPDATE update_time = NOW();

-- 用户行为数据示例
INSERT INTO `user_behavior` (`id`, `user_id`, `behavior_type`, `behavior_content`, `ip_address`, `create_time`) VALUES
(1, 1, 'SEARCH', '我未来会成功吗？', '127.0.0.1', NOW()),
(2, 1, 'VIEW', '查看答案ID:5', '127.0.0.1', NOW()),
(3, 2, 'SEARCH', '我该换工作吗？', '127.0.0.1', NOW()),
(4, 2, 'VIEW', '查看答案ID:8', '127.0.0.1', NOW())
ON DUPLICATE KEY UPDATE create_time = NOW();