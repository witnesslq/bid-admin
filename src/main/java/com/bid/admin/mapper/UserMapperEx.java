package com.bid.admin.mapper;


import com.bid.admin.entity.Role;
import com.bid.admin.entity.UserEx;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapperEx extends UserShiroMapper {

	List<Role> selectRoleByUserId(String userId);

	UserEx getUserExUserId(String userId);

	UserEx getUserExByLoginName(String loginName);

	int countUserEx(@Param("loginName") String loginName,@Param("realName")String realName);

	List<UserEx> selectUserEx(@Param("start") int pageNum, @Param("size") int pageSize,
							  @Param("loginName") String loginName,@Param("realName") String realName);


}
