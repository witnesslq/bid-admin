package com.hnczb.admin.service;

import com.hnczb.admin.entity.Role;
import com.hnczb.admin.entity.RoleFunc;
import com.hnczb.admin.entity.UserRole;

import java.util.Collection;
import java.util.List;

public interface RoleService {

    /**
     * 获取全部角色信息
     */
    public List<Role> findAll();

//    public List<Role> find(Map<String, Object> map);

    /**
     * 根据roleId获取角色信息
     *
     * @param roleId
     * @return 角色.
     */
    public Role getRole(String roleId) throws Exception;

    /**
     * 保存角色信息
     *
     * @param role
     */
    public void insertRole(Role role);

    /**
     * 根据name获取角色信息
     *
     * @param name
     * @return 角色.
     */
    public Role findByRoleName(String name) ;

    /**
     * 根据角色编码获取角色对象.
     *
     * @param code
     * @return 角色.
     */
    public Role findByRoleCode(String code);

    /**
     * 查询用户拥有的角色列表.
     *
     * @param userId
     * @return 角色列表.
     */
    public List<Role> findByUserId(String userId) ;

    /**
     * 保存角色功能关系.
     * @param rid 角色ID
     * @param fids 功能ID集合
     */
    public void saveRoleFunc(String rid, Collection<String> fids) ;

    /**
     * 删除角色.
     * @param roleId
     * @throws Exception
     */

    public void  delete(String roleId) throws Exception;

//    /**
//     * 批量删除角色.
//     * @param ids 角色ID数组.
//     * @throws Exception
//     */
//
//    public void delete(String[] ids) throws Exception;

    /**
     * 根据roleId获取功能列表
     * @param  roleId
     */
    public List<RoleFunc> findRoleFunc(String roleId);

    /**
     *分页获取用户信息
     */

    public int getRoleCount(String roleName,String roleCode);
    public List<Role> getRoleList(int pageNum, int pageSize,String roleName,String roleCode);

    /**
     *获取用户角色关联信息
     */
    public List<UserRole> getUserRoleList(int roleId);

}
