package com.answerbook.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 分享记录实体类
 */
@Data
@TableName("t_share")
public class Share {

    /**
     * 分享ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 分享类型：answer答案，daily_quote每日一言
     */
    private String shareType;

    /**
     * 目标ID
     */
    private Long targetId;

    /**
     * 分享平台：wechat微信，moments朋友圈，qq，weibo微博
     */
    private String platform;

    /**
     * 分享图片URL
     */
    private String imageUrl;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
}