package com.answerbook.mapper;

import com.answerbook.entity.UserBehavior;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户行为日志Mapper接口
 */
@Mapper
public interface UserBehaviorMapper extends BaseMapper<UserBehavior> {
    // 继承BaseMapper，使用MyBatis-Plus提供的基础方法
}