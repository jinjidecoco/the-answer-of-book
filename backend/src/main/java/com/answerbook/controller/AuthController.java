package com.answerbook.controller;

import com.answerbook.common.Result;
import com.answerbook.dto.LoginDTO;
import com.answerbook.service.AuthService;
import com.answerbook.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 认证控制器
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * 登录接口
     */
    @PostMapping("/login")
    public Result<LoginVO> login(@RequestBody @Validated LoginDTO loginDTO) {
        LoginVO loginVO = authService.login(loginDTO.getCode());
        return Result.success(loginVO);
    }
}