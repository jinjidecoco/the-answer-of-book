package com.answerbook.service.impl;

import com.answerbook.entity.User;
import com.answerbook.mapper.UserMapper;
import com.answerbook.service.AuthService;
import com.answerbook.util.JwtUtil;
import com.answerbook.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 认证服务实现类
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    @Value("${jwt.expiration}")
    private Integer expireSeconds;

    @Override
    public LoginVO login(String code) {
        // 模拟微信登录，实际项目中需要调用微信接口获取openid
        String openid = "mock_" + code;

        // 查询用户是否存在
        User user = userMapper.selectByOpenid(openid);

        // 用户不存在则创建
        if (user == null) {
            user = new User();
            user.setOpenid(openid);
            user.setLastLoginTime(LocalDateTime.now());
            userMapper.insert(user);
        } else {
            // 更新登录时间
            user.setLastLoginTime(LocalDateTime.now());
            userMapper.updateById(user);
        }

        // 生成token - 将Long类型转换为String
        String token = jwtUtil.generateToken(String.valueOf(user.getId()));

        // 构建返回对象
        LoginVO loginVO = new LoginVO();
        loginVO.setToken(token);
        loginVO.setExpiresIn(expireSeconds);

        return loginVO;
    }
}