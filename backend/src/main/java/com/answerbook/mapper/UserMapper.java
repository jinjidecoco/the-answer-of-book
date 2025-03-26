package com.answerbook.mapper;

import com.answerbook.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 用户Mapper接口
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据openid查询用户
     *
     * @param openid 微信用户唯一标识
     * @return 用户信息
     */
    @Select("SELECT * FROM t_user WHERE openid = #{openid} AND deleted = 0 LIMIT 1")
    User selectByOpenid(@Param("openid") String openid);
}