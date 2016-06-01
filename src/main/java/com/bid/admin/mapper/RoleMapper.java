package com.bid.admin.mapper;

import com.bid.admin.entity.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper {
    int deleteByPrimaryKey(Long roleId);

    int insert(Role record);

    Role selectByPrimaryKey(Long roleId);

    List<Role> selectAll();

    int updateByPrimaryKey(Role record);
    /**
     *华丽的分割线----------------：other add
     */

    List<Role> selectByRoleName(String name);

    List<Role> selectByRoleCode(String code);

    int countRole(@Param("roleName") String roleName,@Param("roleCode")String roleCode);

    List<Role> selectRole(@Param("start") int pageNum, @Param("size") int pageSize,
                              @Param("roleName") String roleName,@Param("roleCode") String roleCode);

}