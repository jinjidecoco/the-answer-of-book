package com.answerbook.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * 登录请求DTO
 */
@Data
public class LoginDTO {

    /**
     * 微信临时登录凭证
     */
    @NotBlank(message = "code不能为空")
    private String code;
}