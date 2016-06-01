package com.bid.admin.service.impl;

import com.google.common.collect.Lists;
import com.bid.admin.entity.Role;
import com.bid.admin.entity.RoleFunc;
import com.bid.admin.entity.UserRole;
import com.bid.admin.mapper.RoleFuncMapper;
import com.bid.admin.mapper.RoleMapper;
import com.bid.admin.mapper.UserRoleMapper;
import com.bid.admin.security.ShiroCacheManager;
import com.bid.admin.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private UserRoleMapper userRoleMapper;


    @Autowired
    private ShiroCacheManager shiroCacheManager;

    public List<Role> findAll() {
        return (List<Role>) roleMapper.selectAll();
    }

//	public List<Role> find(Map<String, Object> map) {
//		if (map == null || map.get("roleName") == null) {
//			return roleMapper.selectByExample(null);
//		} else {
//			RoleCriteria rc = new RoleCriteria();
//			RoleCriteria.Criteria cri = rc.createCriteria();
//			cri.andRoleNameLike("%" + map.get("roleName") + "%");
//			return roleMapper.selectByExample(rc);
//		}
//	}


    public Role getRole(String roleId) throws Exception {
        return roleMapper.selectByPrimaryKey(Long.valueOf(roleId));
    }

    @Transactional
    public void insertRole(Role role) {
        if (role.getRoleId() != null) {

            try {
                roleMapper.updateByPrimaryKey(role);
            } catch (Exception e) {
                e.getStackTrace();
            }
        } else {
            try {
                roleMapper.insert(role);
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }

    public Role findByRoleName(String name) {

        List<Role> list = roleMapper.selectByRoleName(name);
        return list == null || list.isEmpty() ? null : list.get(0);
    }


    public Role findByRoleCode(String code) {

        List<Role> list = roleMapper.selectByRoleCode(code);
        return list == null || list.isEmpty() ? null : list.get(0);
    }

    public List<Role> findByUserId(String userId) {

        List<Role> roles = Lists.newArrayList();
        List<UserRole> list = userRoleMapper.selectByUserId(userId);
        if (list != null && list.size() > 0) {
            for (UserRole ur : list) {
                try {
                    roles.add(getRole(ur.getRoleId().toString()));
                } catch (Exception e) {
                }
            }
        }
        return roles;
    }

    @Autowired
    private RoleFuncMapper roleFuncMapper;

    @Transactional
    public void saveRoleFunc(String roleId, Collection<String> fids) {
        //删除已有关系
        roleFuncMapper.deleteByRoleId(Integer.valueOf(roleId));

        //角色和功能关系
        for (String fid : fids) {
            RoleFunc rf = new RoleFunc();
            rf.setRoleId(Long.valueOf(roleId));
            rf.setFuncId(Long.valueOf(fid));

            roleFuncMapper.insert(rf);
        }

        shiroCacheManager.clear();
    }

    @Transactional
    public void delete(String roleId) throws Exception {
        //1、删除用户角色关系

        userRoleMapper.deleteByRoleId(Integer.valueOf(roleId));

        //2、删除角色功能关系

        roleFuncMapper.deleteByRoleId(Integer.valueOf(roleId));

        //3、最后删除角色
        roleMapper.deleteByPrimaryKey(Long.valueOf(roleId));

        //shiro缓存清除
        shiroCacheManager.clear();

    }

    public List<RoleFunc> findRoleFunc(String roleId) {

        return roleFuncMapper.selectByRoleId(Integer.valueOf(roleId));
    }

    /**
     * 分页获取用户信息
     */

    public int getRoleCount(String roleName, String roleCode) {
        return roleMapper.countRole(roleName, roleCode);

    }

    public List<Role> getRoleList(int pageNum, int pageSize, String roleName, String roleCode) {
        return roleMapper.selectRole(pageNum, pageSize, roleName, roleCode);
    }

    public List<UserRole> getUserRoleList(int roleId){
        return userRoleMapper.selectByRoleId(roleId);
    }

}
