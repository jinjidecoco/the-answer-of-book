package com.answerbook.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 每日一言实体类
 */
@Data
@TableName("t_daily_quote")
public class DailyQuote {

    /**
     * 语录ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 语录内容
     */
    private String content;

    /**
     * 作者
     */
    private String author;

    /**
     * 来源
     */
    private String source;

    /**
     * 类型：wisdom哲理，humor幽默，inspiration励志
     */
    private String type;

    /**
     * 发布日期，NULL表示未发布
     */
    private LocalDate publishDate;

    /**
     * 状态：0禁用，1启用
     */
    private Integer status;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 是否删除：0否，1是
     */
    @TableLogic
    private Integer deleted;
}