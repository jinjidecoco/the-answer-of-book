package com.answerbook.vo;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 答案视图对象
 */
@Data
public class AnswerVO {

    /**
     * 答案ID
     */
    private Long answerId;

    /**
     * 答案内容
     */
    private String content;

    /**
     * 答案类型：1-肯定，2-中性，3-否定
     */
    private Integer type;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
}