package com.answerbook.controller;

import com.answerbook.common.Result;
import com.answerbook.service.DailyQuoteService;
import com.answerbook.vo.DailyQuoteVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 每日一言控制器
 */
@RestController
@RequestMapping("/daily-quotes")
@RequiredArgsConstructor
public class DailyQuoteController {

    private final DailyQuoteService dailyQuoteService;

    /**
     * 获取今日一言
     */
    @GetMapping("/today")
    public Result<DailyQuoteVO> getTodayQuote() {
        DailyQuoteVO dailyQuoteVO = dailyQuoteService.getTodayQuote();
        return Result.success(dailyQuoteVO);
    }
}