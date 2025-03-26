package com.answerbook.common;

import lombok.Data;

/**
 * 通用响应对象
 */
@Data
public class Result<T> {

    /**
     * 状态码，0表示成功，非0表示失败
     */
    private Integer code;

    /**
     * 状态描述
     */
    private String message;

    /**
     * 响应数据
     */
    private T data;

    /**
     * 成功响应
     */
    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setCode(0);
        result.setMessage("成功");
        result.setData(data);
        return result;
    }

    /**
     * 成功响应（无数据）
     */
    public static <T> Result<T> success() {
        return success(null);
    }

    /**
     * 失败响应
     */
    public static <T> Result<T> error(Integer code, String message) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }

    /**
     * 参数错误
     */
    public static <T> Result<T> paramError(String message) {
        return error(1001, message);
    }

    /**
     * 未授权
     */
    public static <T> Result<T> unauthorized(String message) {
        return error(1002, message);
    }

    /**
     * 服务器内部错误
     */
    public static <T> Result<T> serverError(String message) {
        return error(2001, message);
    }

    /**
     * 资源不存在
     */
    public static <T> Result<T> notFound(String message) {
        return error(3001, message);
    }
}