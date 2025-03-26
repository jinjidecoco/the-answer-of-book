package com.answerbook.controller;

import com.answerbook.common.Result;
import com.answerbook.service.AnswerService;
import com.answerbook.vo.AnswerVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 答案控制器
 */
@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    /**
     * 获取随机答案
     */
    @GetMapping("/random")
    public Result<AnswerVO> getRandomAnswer(@RequestParam(required = false) String question) {
        AnswerVO answerVO = answerService.getRandomAnswer(question);
        return Result.success(answerVO);
    }
}