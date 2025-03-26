package com.answerbook.mapper;

import com.answerbook.entity.Answer;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 答案Mapper接口
 */
@Mapper
public interface AnswerMapper extends BaseMapper<Answer> {

    /**
     * 查询所有启用状态的答案
     *
     * @return 答案列表
     */
    @Select("SELECT * FROM t_answer WHERE status = 1 AND deleted = 0")
    List<Answer> selectAllEnabled();
}