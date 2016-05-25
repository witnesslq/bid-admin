package com.hnczb.admin.mapper;

import com.hnczb.admin.entity.Function;
import com.hnczb.admin.entity.FunctionEx;
import org.apache.ibatis.annotations.Param;

import java.util.List;


/**
 * @author liutao
 *
 */
public interface FunctionMapperEx {

    List<FunctionEx> selectByPid(@Param("pid") String pid);
    
    List<Function> selectByRoleId(@Param("roleId") String roleId);

}