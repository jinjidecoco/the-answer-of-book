package com.answerbook.service;

import com.answerbook.entity.Favorite;

import java.util.List;

/**
 * 用户收藏服务接口
 */
public interface FavoriteService {

    /**
     * 添加收藏
     *
     * @param favorite 收藏信息
     * @return 保存后的收藏
     */
    Favorite addFavorite(Favorite favorite);

    /**
     * 取消收藏
     *
     * @param id 收藏ID
     * @return 是否成功
     */
    boolean removeFavorite(Long id);

    /**
     * 获取用户收藏列表
     *
     * @param userId 用户ID
     * @param type   收藏类型（可选）
     * @param page   页码
     * @param size   每页大小
     * @return 收藏列表
     */
    List<Favorite> getUserFavorites(String userId, String type, Integer page, Integer size);

    /**
     * 检查是否已收藏
     *
     * @param userId    用户ID
     * @param type      收藏类型
     * @param contentId 内容ID
     * @return 是否已收藏
     */
    boolean isFavorited(String userId, String type, Long contentId);
}