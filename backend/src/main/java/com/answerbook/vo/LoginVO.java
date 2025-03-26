package com.answerbook.vo;

import lombok.Data;

/**
 * 登录响应视图对象
 */
@Data
public class LoginVO {

    /**
     * 用户认证令牌
     */
    private String token;

    /**
     * 过期时间（秒）
     */
    private Integer expiresIn;
}