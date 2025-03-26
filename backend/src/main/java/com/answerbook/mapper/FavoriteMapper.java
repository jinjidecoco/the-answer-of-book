package com.answerbook.mapper;

import com.answerbook.entity.Favorite;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户收藏Mapper接口
 */
@Mapper
public interface FavoriteMapper extends BaseMapper<Favorite> {
    // 继承BaseMapper，使用MyBatis-Plus提供的基础方法
}