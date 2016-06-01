package com.bid.admin.mapper;

import com.bid.admin.entity.Function;
import com.bid.admin.entity.FunctionEx;
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