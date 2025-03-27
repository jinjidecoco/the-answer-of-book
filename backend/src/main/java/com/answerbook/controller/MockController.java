package com.answerbook.controller;

import com.answerbook.common.Result;
import com.answerbook.vo.AnswerVO;
import com.answerbook.vo.LoginVO;
import com.answerbook.vo.QuoteVO;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

/**
 * 模拟数据控制器，用于前端联调测试
 */
@RestController
@RequestMapping("/mock")
public class MockController {

    private static final List<String> ANSWER_CONTENTS = Arrays.asList(
            "是的，毫无疑问。",
            "这是确定的。",
            "不用怀疑。",
            "是的，绝对如此。",
            "你可以相信它。",
            "正如我所看到的，是的。",
            "很可能。",
            "前景良好。",
            "迹象表明是肯定的。",
            "是。",
            "回答模糊，请再试一次。",
            "请稍后再问。",
            "最好现在不要告诉你。",
            "现在无法预测。",
            "专心再问一次。",
            "不要指望它。",
            "我的回答是否定的。",
            "我的消息来源说不。",
            "前景不太好。",
            "非常值得怀疑。"
    );

    private static final List<String> QUOTE_CONTENTS = Arrays.asList(
            "生活中最重要的事情是明确什么对你最重要，然后忽略其他的一切。",
            "能给别人快乐的人，自己也会得到快乐。",
            "不要用过去的错误惩罚自己，而要用它们指导自己。",
            "真正的成功是内心的平静。",
            "简单是最终的复杂。",
            "世界上没有完美的个体，只有完美的瞬间。",
            "不要害怕改变，你可能会失去一些好东西，但你可能会获得更好的东西。"
    );

    private static final List<String> QUOTE_AUTHORS = Arrays.asList(
            "卡尔·拉格斐", "佚名", "安妮·拉莫特", "达赖喇嘛", "达芬奇", "鲁斯·鲍尔森", "佚名"
    );

    /**
     * 获取随机答案
     */
    @GetMapping("/answers/random")
    public Result<AnswerVO> getRandomAnswer(@RequestParam(required = false) String question) {
        int randomIndex = ThreadLocalRandom.current().nextInt(ANSWER_CONTENTS.size());
        String content = ANSWER_CONTENTS.get(randomIndex);

        AnswerVO answerVO = new AnswerVO();
        answerVO.setAnswerId((long) (randomIndex + 1));
        answerVO.setContent(content);
        answerVO.setType(randomIndex < 10 ? 1 : (randomIndex < 15 ? 2 : 3));  // 1-肯定，2-中性，3-否定

        return Result.success(answerVO);
    }

    /**
     * 获取每日一言
     */
    @GetMapping("/quotes/daily")
    public Result<QuoteVO> getDailyQuote() {
        int randomIndex = ThreadLocalRandom.current().nextInt(QUOTE_CONTENTS.size());

        QuoteVO quoteVO = new QuoteVO();
        quoteVO.setId((long) (randomIndex + 1));
        quoteVO.setContent(QUOTE_CONTENTS.get(randomIndex));
        quoteVO.setAuthor(QUOTE_AUTHORS.get(randomIndex));
        quoteVO.setQuoteDate(LocalDate.now());
        quoteVO.setType(1);  // 1-励志

        return Result.success(quoteVO);
    }

    /**
     * 模拟登录
     */
    @PostMapping("/auth/login")
    public Result<LoginVO> login(@RequestBody Map<String, String> loginParams) {
        String code = loginParams.getOrDefault("code", "defaultCode");

        LoginVO loginVO = new LoginVO();
        loginVO.setToken("mock_token_" + code);
        loginVO.setExpiresIn(86400);  // 24小时

        return Result.success(loginVO);
    }

    /**
     * 记录用户行为
     */
    @PostMapping("/user/behavior")
    public Result<Map<String, Object>> recordBehavior(@RequestBody Map<String, Object> behavior) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", ThreadLocalRandom.current().nextLong(1000));
        result.put("status", "success");
        result.put("message", "行为记录成功");
        result.putAll(behavior);

        return Result.success(result);
    }

    /**
     * 健康检查接口
     */
    @GetMapping("/health")
    public Result<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", System.currentTimeMillis());
        health.put("version", "1.0.0");

        return Result.success(health);
    }
}