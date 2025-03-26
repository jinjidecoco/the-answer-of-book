package com.answerbook.service;

import com.answerbook.vo.DailyQuoteVO;

/**
 * 每日一言服务接口
 */
public interface DailyQuoteService {

    /**
     * 获取今日一言
     *
     * @return 今日一言
     */
    DailyQuoteVO getTodayQuote();
}