package com.answerbook.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户行为日志实体类
 */
@Data
@TableName("t_user_behavior")
public class UserBehavior {

    /**
     * 日志ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 行为类型：view查看，share分享，feedback反馈
     */
    private String behaviorType;

    /**
     * 目标ID，如答案ID、每日一言ID等
     */
    private Long targetId;

    /**
     * 目标类型：answer答案，daily_quote每日一言
     */
    private String targetType;

    /**
     * 额外信息，如分享平台、反馈内容等
     */
    private String extra;

    /**
     * 用户IP地址
     */
    private String ip;

    /**
     * 用户代理信息
     */
    private String userAgent;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
}