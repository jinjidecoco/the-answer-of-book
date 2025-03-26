package com.answerbook.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * 每日引用实体类
 */
@Data
@TableName("daily_quote")
public class DailyQuote {

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 引用内容
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
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除：0否，1是
     */
    @TableLogic
    private Integer deleted;
}