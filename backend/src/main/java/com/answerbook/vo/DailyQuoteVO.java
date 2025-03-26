package com.answerbook.vo;

import lombok.Data;

import java.time.LocalDate;

/**
 * 每日一言视图对象
 */
@Data
public class DailyQuoteVO {

    /**
     * 语录ID
     */
    private Long quoteId;

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
     * 发布日期
     */
    private LocalDate publishDate;
}