package com.bid.admin.mapper;

import com.bid.admin.entity.UserRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserRoleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(UserRole record);

    UserRole selectByPrimaryKey(Long id);

    List<UserRole> selectAll();

    int updateByPrimaryKey(UserRole record);
    /**
     * 华丽的分割线——————————————————:ORTHER ADD
     */

    List<UserRole>  selectByUserId(String userId);

    List<UserRole>  selectByRoleId(int roleId);

    int deleteByRoleId(int roleId);

    int deleteByUseId(String userId);

    int updateByUserId(@Param("userId")String userId,@Param("roleId")int roleId);
}