package com.answerbook.controller;

import com.answerbook.common.Result;
import com.answerbook.entity.Favorite;
import com.answerbook.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * 用户收藏控制器
 */
@RestController
@RequestMapping("/api/v1/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    /**
     * 添加收藏
     *
     * @param favorite 收藏信息
     * @return 结果
     */
    @PostMapping
    public Result<Favorite> addFavorite(@RequestBody Favorite favorite) {
        Favorite saved = favoriteService.addFavorite(favorite);
        return Result.success(saved);
    }

    /**
     * 取消收藏
     *
     * @param id 收藏ID
     * @return 结果
     */
    @DeleteMapping("/{id}")
    public Result<Boolean> removeFavorite(@PathVariable("id") Long id) {
        boolean result = favoriteService.removeFavorite(id);
        return Result.success(result);
    }

    /**
     * 获取用户收藏列表
     *
     * @param userId 用户ID
     * @param type   收藏类型（可选）
     * @param page   页码
     * @param size   每页大小
     * @return 收藏列表
     */
    @GetMapping
    public Result<List<Favorite>> getUserFavorites(
            @RequestParam("userId") String userId,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size) {
        List<Favorite> favorites = favoriteService.getUserFavorites(userId, type, page, size);
        return Result.success(favorites);
    }

    /**
     * 检查是否已收藏
     *
     * @param userId    用户ID
     * @param type      收藏类型
     * @param contentId 内容ID
     * @return 是否已收藏
     */
    @GetMapping("/check")
    public Result<Map<String, Boolean>> checkFavorite(
            @RequestParam("userId") String userId,
            @RequestParam("type") String type,
            @RequestParam("contentId") Long contentId) {
        boolean favorited = favoriteService.isFavorited(userId, type, contentId);
        Map<String, Boolean> result = new HashMap<>();
        result.put("favorited", favorited);
        return Result.success(result);
    }
}