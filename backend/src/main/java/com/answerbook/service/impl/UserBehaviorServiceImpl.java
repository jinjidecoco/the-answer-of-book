package com.answerbook.service.impl;

import com.answerbook.entity.UserBehavior;
import com.answerbook.mapper.UserBehaviorMapper;
import com.answerbook.service.UserBehaviorService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户行为日志服务实现类
 */
@Service
public class UserBehaviorServiceImpl implements UserBehaviorService {

    @Autowired
    private UserBehaviorMapper userBehaviorMapper;

    @Override
    public UserBehavior recordBehavior(UserBehavior userBehavior) {
        // 设置创建时间
        if (userBehavior.getCreateTime() == null) {
            userBehavior.setCreateTime(LocalDateTime.now());
        }
        
        // 保存行为记录
        userBehaviorMapper.insert(userBehavior);
        return userBehavior;
    }

    @Override
    public List<UserBehavior> getUserBehaviors(String userId, String type, Integer page, Integer size) {
        // 构建查询条件
        LambdaQueryWrapper<UserBehavior> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserBehavior::getUserId, userId);
        
        // 如果指定了行为类型，则添加类型条件
        if (StringUtils.hasText(type)) {
            queryWrapper.eq(UserBehavior::getType, type);
        }
        
        // 按时间倒序排序
        queryWrapper.orderByDesc(UserBehavior::getCreateTime);
        
        // 分页查询
        IPage<UserBehavior> pageResult = new Page<>(page, size);
        userBehaviorMapper.selectPage(pageResult, queryWrapper);
        
        return pageResult.getRecords();
    }

    @Override
    public Object getBehaviorStats(String userId) {
        // 统计各类型行为数量
        Map<String, Object> stats = new HashMap<>();
        
        // 查询问题总数
        LambdaQueryWrapper<UserBehavior> questionQuery = new LambdaQueryWrapper<>();
        questionQuery.eq(UserBehavior::getUserId, userId)
                    .eq(UserBehavior::getType, "question");
        long questionCount = userBehaviorMapper.selectCount(questionQuery);
        stats.put("questionCount", questionCount);
        
        // 查询分享总数
        LambdaQueryWrapper<UserBehavior> shareQuery = new LambdaQueryWrapper<>();
        shareQuery.eq(UserBehavior::getUserId, userId)
                 .eq(UserBehavior::getType, "share");
        long shareCount = userBehaviorMapper.selectCount(shareQuery);
        stats.put("shareCount", shareCount);
        
        // 查询收藏总数
        LambdaQueryWrapper<UserBehavior> favoriteQuery = new LambdaQueryWrapper<>();
        favoriteQuery.eq(UserBehavior::getUserId, userId)
                    .eq(UserBehavior::getType, "favorite");
        long favoriteCount = userBehaviorMapper.selectCount(favoriteQuery);
        stats.put("favoriteCount", favoriteCount);
        
        // 查询最近一次使用时间
        LambdaQueryWrapper<UserBehavior> lastUseQuery = new LambdaQueryWrapper<>();
        lastUseQuery.eq(UserBehavior::getUserId, userId)
                   .orderByDesc(UserBehavior::getCreateTime)
                   .last("LIMIT 1");
        UserBehavior lastUse = userBehaviorMapper.selectOne(lastUseQuery);
        if (lastUse != null) {
            stats.put("lastUseTime", lastUse.getCreateTime());
        }
        
        return stats;
    }

    @Override
    public boolean deleteBehavior(Long id) {
        int result = userBehaviorMapper.deleteById(id);
        return result > 0;
    }
}