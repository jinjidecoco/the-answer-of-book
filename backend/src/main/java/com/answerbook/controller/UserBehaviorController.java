package com.answerbook.controller;

import com.answerbook.common.Result;
import com.answerbook.entity.UserBehavior;
import com.answerbook.service.UserBehaviorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户行为日志控制器
 */
@RestController
@RequestMapping("/api/v1/behaviors")
public class UserBehaviorController {

    @Autowired
    private UserBehaviorService userBehaviorService;

    /**
     * 记录用户行为
     *
     * @param userBehavior 用户行为信息
     * @return 结果
     */
    @PostMapping
    public Result<UserBehavior> recordBehavior(@RequestBody UserBehavior userBehavior) {
        UserBehavior saved = userBehaviorService.recordBehavior(userBehavior);
        return Result.success(saved);
    }

    /**
     * 获取用户行为历史
     *
     * @param userId 用户ID
     * @param type   行为类型（可选）
     * @param page   页码
     * @param size   每页大小
     * @return 用户行为列表
     */
    @GetMapping
    public Result<List<UserBehavior>> getUserBehaviors(
            @RequestParam("userId") String userId,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size) {
        List<UserBehavior> behaviors = userBehaviorService.getUserBehaviors(userId, type, page, size);
        return Result.success(behaviors);
    }

    /**
     * 获取用户行为统计
     *
     * @param userId 用户ID
     * @return 统计结果
     */
    @GetMapping("/stats")
    public Result<Object> getBehaviorStats(@RequestParam("userId") String userId) {
        Object stats = userBehaviorService.getBehaviorStats(userId);
        return Result.success(stats);
    }

    /**
     * 删除用户行为记录
     *
     * @param id 记录ID
     * @return 结果
     */
    @DeleteMapping("/{id}")
    public Result<Boolean> deleteBehavior(@PathVariable("id") Long id) {
        boolean result = userBehaviorService.deleteBehavior(id);
        return Result.success(result);
    }
}