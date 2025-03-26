package com.answerbook.service.impl;

import com.answerbook.entity.DailyQuote;
import com.answerbook.mapper.DailyQuoteMapper;
import com.answerbook.service.DailyQuoteService;
import com.answerbook.vo.DailyQuoteVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * 每日一言服务实现类
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DailyQuoteServiceImpl implements DailyQuoteService {

    private final DailyQuoteMapper dailyQuoteMapper;

    @Override
    public DailyQuoteVO getTodayQuote() {
        // 获取今日日期
        LocalDate today = LocalDate.now();

        // 查询今日一言
        DailyQuote dailyQuote = dailyQuoteMapper.selectByPublishDate(today);

        // 如果今日没有设置一言，则随机获取一条
        if (dailyQuote == null) {
            List<DailyQuote> quotes = dailyQuoteMapper.selectAllEnabled();
            if (quotes.isEmpty()) {
                log.error("No daily quotes found in database");
                return null;
            }

            // 随机选择一条
            int randomIndex = (int) (Math.random() * quotes.size());
            dailyQuote = quotes.get(randomIndex);

            // 设置为今日一言
            dailyQuote.setPublishDate(today);
            dailyQuoteMapper.updateById(dailyQuote);
        }

        // 构建返回对象
        DailyQuoteVO dailyQuoteVO = new DailyQuoteVO();
        dailyQuoteVO.setQuoteId(dailyQuote.getId());
        dailyQuoteVO.setContent(dailyQuote.getContent());
        dailyQuoteVO.setAuthor(dailyQuote.getAuthor());
        dailyQuoteVO.setSource(dailyQuote.getSource());
        dailyQuoteVO.setType(dailyQuote.getType());
        dailyQuoteVO.setPublishDate(dailyQuote.getPublishDate());

        return dailyQuoteVO;
    }
}