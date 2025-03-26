package com.answerbook.service.impl;

import com.answerbook.entity.Favorite;
import com.answerbook.mapper.FavoriteMapper;
import com.answerbook.service.FavoriteService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 用户收藏服务实现类
 */
@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Override
    public Favorite addFavorite(Favorite favorite) {
        // 设置创建时间和更新时间
        LocalDateTime now = LocalDateTime.now();
        favorite.setCreateTime(now);
        favorite.setUpdateTime(now);
        
        // 保存收藏记录
        favoriteMapper.insert(favorite);
        return favorite;
    }

    @Override
    public boolean removeFavorite(Long id) {
        int result = favoriteMapper.deleteById(id);
        return result > 0;
    }

    @Override
    public List<Favorite> getUserFavorites(String userId, String type, Integer page, Integer size) {
        // 构建查询条件
        LambdaQueryWrapper<Favorite> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Favorite::getUserId, userId);
        
        // 如果指定了收藏类型，则添加类型条件
        if (StringUtils.hasText(type)) {
            queryWrapper.eq(Favorite::getType, type);
        }
        
        // 按时间倒序排序
        queryWrapper.orderByDesc(Favorite::getCreateTime);
        
        // 分页查询
        IPage<Favorite> pageResult = new Page<>(page, size);
        favoriteMapper.selectPage(pageResult, queryWrapper);
        
        return pageResult.getRecords();
    }

    @Override
    public boolean isFavorited(String userId, String type, Long contentId) {
        // 构建查询条件
        LambdaQueryWrapper<Favorite> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Favorite::getUserId, userId)
                   .eq(Favorite::getType, type)
                   .eq(Favorite::getContentId, contentId);
        
        // 查询数量
        long count = favoriteMapper.selectCount(queryWrapper);
        return count > 0;
    }
}