package com.answerbook.mapper;

import com.answerbook.entity.DailyQuote;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.util.List;

/**
 * 每日引用数据访问接口
 */
@Mapper
public interface DailyQuoteMapper extends BaseMapper<DailyQuote> {

    /**
     * 根据发布日期查询每日一言
     *
     * @param publishDate 发布日期
     * @return 每日一言
     */
    @Select("SELECT * FROM daily_quote WHERE publish_date = #{publishDate} AND status = 1 AND deleted = 0 LIMIT 1")
    DailyQuote selectByPublishDate(LocalDate publishDate);

    /**
     * 查询所有已启用的每日一言
     *
     * @return 每日一言列表
     */
    @Select("SELECT * FROM daily_quote WHERE status = 1 AND deleted = 0")
    List<DailyQuote> selectAllEnabled();
}