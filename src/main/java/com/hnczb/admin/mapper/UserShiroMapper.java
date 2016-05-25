package com.hnczb.admin.mapper;

import com.hnczb.admin.entity.UserShiro;

import java.util.List;

public interface UserShiroMapper {
    int deleteByPrimaryKey(Long id);

    int insert(UserShiro record);

    UserShiro selectByPrimaryKey(Long id);

    List<UserShiro> selectAll();

    int updateByPrimaryKey(UserShiro record);
    /**
     *华丽的分割线--------------：OTHERS ADD
     */
    List<UserShiro> selectByCreateBody(String createBody);

    int updateByUserId(UserShiro userShiro);

    int deleteByUseId(String userId);

    int countAll();

    UserShiro selectByUserId(String userId);

    List<UserShiro> selectByLoginName(String loginName);
}