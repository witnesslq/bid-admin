package com.bid.admin.mapper;

import com.bid.admin.entity.RoleFunc;

import java.util.List;

public interface RoleFuncMapper {
    int deleteByPrimaryKey(Long id);

    int insert(RoleFunc record);

    RoleFunc selectByPrimaryKey(Long id);

    List<RoleFunc> selectAll();

    int updateByPrimaryKey(RoleFunc record);

    int deleteByRoleId(int roleId);

    List<RoleFunc> selectByRoleId(int roleId);

    int deleteByFuncId(int fid);
}