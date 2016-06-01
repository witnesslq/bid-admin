package com.bid.admin.service;

import com.bid.admin.entity.UserEx;
import com.bid.admin.entity.Role;
import com.bid.admin.entity.UserShiro;

import java.util.List;

public interface UserShiroService {


    /**
     * 获取我管理的用户id列表
     * @param createBody
     * @return
     */
    public List<String> findUsersByCb(String createBody);


    /**
     * 保存用户
     * @param user
     * @return
     */
    public String saveUser(UserEx user);

    /**
     * 保存用户角色关系.
     *
     * @param user
     */
    public void saveUserRole(UserEx user) ;


    /**
     * 按userId查询用户
     *
     * @param userId
     * @return
     */
    public UserShiro getUser(String userId);

    /**
     * 获取当前用户数量.
     */
    public int getUserCount();


    /**
     * 删除用户
     *
     * @param userId
     */
    public void deleteUser(String userId);

    public UserEx getUserExByUserId(String userId) ;

    public UserEx getUserExByLoginName(String loginName);

    /**
     *重置密码
     */

    public void resetPassword(String userId);


//    /**
//     * 修改用户的密码为新密码.
//     *
//     * @param uid 用户ID.
//     * @param password 新密码.
//     * @return 被修改密码的用户.
//     * @throws Exception
//     */
//
//    public UserShiro changePassword(String uid, String password) throws Exception;


//    public UserShiro changePassword(String uid, String old, String password) throws Exception ;

    public List<Role> getUserRoles(String userId);


    /**
     * 更新当前用户个人信息
     *
     * @param user
     */

    public void updateCurrentUserInfo(UserShiro user) throws Exception ;
    /**
     *更新用户信息
     */
    public void updateUserInfo(UserShiro user,String roleId) throws Exception ;


    /**
     *分页获取用户信息
     */

    public int getUserExCount(String loginName,String realName);
    public List<UserEx> getUserExList(int pageNum, int pageSize,String loginName,String realName);

}
