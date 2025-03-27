package com.answerbook.vo;

import lombok.Data;

import java.time.LocalDate;

/**
 * 每日一言视图对象
 */
@Data
public class QuoteVO {

    /**
     * 一言ID
     */
    private Long id;

    /**
     * 一言内容
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
     * 类型：1-励志，2-生活，3-哲学
     */
    private Integer type;

    /**
     * 日期
     */
    private LocalDate quoteDate;
}