package com.answerbook.service.impl;

import com.answerbook.entity.Answer;
import com.answerbook.entity.UserBehavior;
import com.answerbook.mapper.AnswerMapper;
import com.answerbook.mapper.UserBehaviorMapper;
import com.answerbook.service.AnswerService;
import com.answerbook.vo.AnswerVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

/**
 * 答案服务实现类
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerServiceImpl implements AnswerService {

    private final AnswerMapper answerMapper;
    private final UserBehaviorMapper userBehaviorMapper;

    @Override
    public AnswerVO getRandomAnswer(String question) {
        // 获取所有启用状态的答案
        List<Answer> answers = answerMapper.selectAllEnabled();

        if (answers.isEmpty()) {
            log.error("No answers found in database");
            return null;
        }

        // 随机选择一个答案
        Random random = new Random();
        Answer answer = answers.get(random.nextInt(answers.size()));

        // 记录用户行为（实际项目中需要获取当前登录用户ID）
        try {
            UserBehavior userBehavior = new UserBehavior();
            userBehavior.setUserId(String.valueOf(1L)); // 模拟用户ID，转为String
            userBehavior.setType("view"); // 设置行为类型
            userBehavior.setContentId(answer.getId()); // 设置内容ID
            userBehavior.setCreateTime(LocalDateTime.now()); // 设置创建时间
            userBehaviorMapper.insert(userBehavior);
        } catch (Exception e) {
            log.error("Failed to record user behavior", e);
        }

        // 构建返回对象
        AnswerVO answerVO = new AnswerVO();
        answerVO.setAnswerId(answer.getId());
        answerVO.setContent(answer.getContent());
        answerVO.setCreatedAt(answer.getCreatedAt());

        return answerVO;
    }
}