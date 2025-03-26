package com.answerbook.service;

import com.answerbook.entity.UserBehavior;

import java.util.List;

/**
 * 用户行为日志服务接口
 */
public interface UserBehaviorService {

    /**
     * 记录用户行为
     *
     * @param userBehavior 用户行为信息
     * @return 保存后的用户行为
     */
    UserBehavior recordBehavior(UserBehavior userBehavior);

    /**
     * 获取用户行为历史
     *
     * @param userId 用户ID
     * @param type   行为类型（可选）
     * @param page   页码
     * @param size   每页大小
     * @return 用户行为列表
     */
    List<UserBehavior> getUserBehaviors(String userId, String type, Integer page, Integer size);

    /**
     * 获取用户行为统计
     *
     * @param userId 用户ID
     * @return 统计结果
     */
    Object getBehaviorStats(String userId);

    /**
     * 删除用户行为记录
     *
     * @param id 记录ID
     * @return 是否成功
     */
    boolean deleteBehavior(Long id);
}