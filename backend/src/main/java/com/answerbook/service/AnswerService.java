package com.answerbook.service;

import com.answerbook.vo.AnswerVO;

/**
 * 答案服务接口
 */
public interface AnswerService {

    /**
     * 获取随机答案
     *
     * @param question 用户提问内容（用于日志记录，不影响答案生成）
     * @return 随机答案
     */
    AnswerVO getRandomAnswer(String question);
}