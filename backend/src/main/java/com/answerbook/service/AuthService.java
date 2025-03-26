package com.answerbook.service;

import com.answerbook.vo.LoginVO;

/**
 * 认证服务接口
 */
public interface AuthService {

    /**
     * 登录
     *
     * @param code 微信临时登录凭证
     * @return 登录响应
     */
    LoginVO login(String code);
}