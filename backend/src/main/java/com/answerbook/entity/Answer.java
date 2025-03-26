package com.answerbook.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 答案实体类
 */
@Data
@TableName("t_answer")
public class Answer {

    /**
     * 答案ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 答案内容
     */
    private String content;

    /**
     * 答案类型：normal普通，positive积极，negative消极，neutral中性
     */
    private String type;

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