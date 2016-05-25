package com.hnczb.admin.mapper;

import com.hnczb.admin.entity.Function;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FunctionMapper {
    int deleteByPrimaryKey(Long funcId);

    int insert(Function record);

    Function selectByPrimaryKey(Long funcId);

    List<Function> selectAll();

    int updateByPrimaryKey(Function record);

    /**
     *华丽的分割线------------:OTHERS ADD
     */


    List<Function> findByParentId(String parentId);

    int countByParentId(String parentId);

    List<Function> selectByNameAndPid(@Param("parentId")String parentId,@Param("funcName")String funcName);
}