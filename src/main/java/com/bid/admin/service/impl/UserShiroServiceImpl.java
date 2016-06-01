package com.bid.admin.service.impl;

import com.bid.admin.mapper.RoleMapper;
import com.bid.admin.entity.Role;
import com.bid.admin.entity.UserEx;
import com.bid.admin.entity.UserRole;
import com.bid.admin.entity.UserShiro;
import com.bid.admin.mapper.UserMapperEx;
import com.bid.admin.mapper.UserRoleMapper;
import com.bid.admin.mapper.UserShiroMapper;
import com.bid.admin.security.ShiroCacheManager;
import com.bid.admin.security.ShiroDbRealm;
import com.bid.admin.service.UserShiroService;
import com.bid.admin.util.SessionUtil;
import com.bid.user.utils.Password;
import com.bid.user.utils.UserIdGenerator;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 用户管理业务类.
 */
@Service
public class UserShiroServiceImpl implements UserShiroService {

    private static Logger logger = LoggerFactory.getLogger(UserShiroServiceImpl.class);

    @Autowired
    private UserShiroMapper userShiroMapper;

    @Autowired
    private UserMapperEx userMapperEx;


    @Autowired
    private UserRoleMapper userRoleMapper;

    @Autowired
    private ShiroCacheManager shiroCacheManager;

    @Autowired
    private Password passwordUtil;

    @Autowired
    private RoleMapper roleMapper;
    /**
     * 分页获取用户信息
     */
    public List<UserEx> getUserExList(int pageNum, int pageSize, String loginName, String realName) {

        //获取用户信息
        if(StringUtils.isNotEmpty(loginName)){
            loginName=loginName.toLowerCase();
        }
        List<UserEx> list = userMapperEx.selectUserEx(pageNum, pageSize, loginName, realName);
        return list;
    }

    public int getUserExCount(String loginName, String realName) {
        if(StringUtils.isNotEmpty(loginName)){
            loginName=loginName.toLowerCase();
        }
        int num = userMapperEx.countUserEx(loginName, realName);

        return num;
    }

    /**
     * 获取我管理的用户id列表
     *
     * @param createBody
     * @return
     */
    public List<String> findUsersByCb(String createBody) {

        List<UserShiro> list = userShiroMapper.selectByCreateBody(createBody);
        List<String> ids = null;//new ArrayList<String>();
        try {
            ids = new ArrayList<String>();
            for (UserShiro u : list) {
                ids.add(u.getUserId());
            }
        } catch (Exception e) {
        }
        return ids;
    }


    /**
     * 保存用户
     *
     * @param user
     * @return
     */
    @Transactional
    public String saveUser(UserEx user) {
        entryptPassword(user);
        user.setStatus("1");
        user.setUserId(UserIdGenerator.generator());
        user.setCreateTime(new Date());
        user.setCreateBody(getCurrentUserName());
        user.setDelFlg(0);
        userShiroMapper.insert(user);
        //存储关联关系
        saveUserRole(user);
        return user.getUserId();

    }

    /**
     * 保存用户角色关系.
     *
     * @param user
     */
    public void saveUserRole(UserEx user) {

        UserRole ur = new UserRole();
        ur.setRoleId(Long.valueOf(user.getRoleId()));
        ur.setUserId(user.getUserId());
        userRoleMapper.insert(ur);
    }

    @Transactional
    private void deleteUserRole(UserShiro user) {
        userRoleMapper.deleteByUseId(user.getUserId());
    }

    /**
     * 设定安全的密码，生成随机的salt并经过1000次 sha-1 hash
     */
    private void entryptPassword(UserShiro user) {
        if (user.getPassword() == null)
            return;
//
        String password = passwordUtil.encode(user.getPassword(), user.getLoginName().toLowerCase() + "huaneng");
        user.setPassword(password);

    }


    /**
     * 按userId查询用户
     *
     * @param userId
     * @return
     */
    public UserShiro getUser(String userId) {
        return userShiroMapper.selectByUserId(userId);
    }

    /**
     * 获取当前用户数量.
     */
    public int getUserCount() {
        return userShiroMapper.countAll();
    }

    /**
     * 取出Shiro中的当前用户LoginName.
     */
    private String getCurrentUserName() {
        try {
            ShiroDbRealm.ShiroUser user = (ShiroDbRealm.ShiroUser) SecurityUtils.getSubject().getPrincipal();
            return user.getLoginName();
        } catch (Exception e) {
            logger.error(e.getMessage());
            return null;
        }
    }

    /**
     * 删除用户
     *
     * @param userId
     */
    @Transactional
    public void deleteUser(String userId) {
        UserShiro user = getUser(userId);

        //1、删除角色关系
        deleteUserRole(user);

        //2、删除用户
        userShiroMapper.deleteByUseId(userId);
    }


    public UserEx getUserExByUserId(String userId) {

        return userMapperEx.getUserExUserId(userId);
    }

    public UserEx getUserExByLoginName(String loginName) {
        if(StringUtils.isNotEmpty(loginName)){
            loginName=loginName.toLowerCase();
        }
        UserEx userEx=null;
        //通过loginName 查询userID
        List<UserShiro> list=userShiroMapper.selectByLoginName(loginName);
        List<UserRole> userRoleLsit=new ArrayList<>();
        UserShiro userShiro = new UserShiro();
        if(list!=null&&list.size()>0){
            userEx= new UserEx();
            userShiro = list.get(0);
            //通过userId获取关联信息
            userRoleLsit = userRoleMapper.selectByUserId(userShiro.getUserId());
            userEx.setId(userShiro.getId());
            userEx.setUserId(userShiro.getUserId());
            userEx.setRealName(userShiro.getRealName());
            userEx.setLoginName(userShiro.getLoginName());
            userEx.setPassword(userShiro.getPassword());
            userEx.setPhone(userShiro.getPhone());
            userEx.setDelFlg(userShiro.getDelFlg());
            userEx.setCreateBody(userShiro.getCreateBody());
            userEx.setCreateTime(userShiro.getCreateTime());
            userEx.setStatus(userShiro.getStatus());
            Role role=new Role();
            if(userRoleLsit!=null&&userRoleLsit.size()>0){
                //获取角色信息
                role=roleMapper.selectByPrimaryKey(userRoleLsit.get(0).getRoleId());
                List<Role> roleList = new ArrayList<>();
                roleList.add(role);
                userEx.setRoles(roleList);
                userEx.setRoleName(role.getRoleName());
                userEx.setRoleId(String.valueOf(role.getRoleId()));
            }
        }

        return userEx;
    }

    /**
     * 重置密码
     */

    public void resetPassword(String userId) {
        UserShiro user = getUser(userId);
        user.setPassword("123456");
//            String[] hash = Encrypts.hashPassword(user.getLoginName());
        entryptPassword(user);

        userShiroMapper.updateByUserId(user);
    }


//    /**
//     * 修改用户的密码为新密码.
//     *
//     * @param uid      用户ID.
//     * @param password 新密码.
//     * @return 被修改密码的用户.
//     * @throws Exception
//     */

//    public UserShiro changePassword(String uid, String password) throws Exception {
//        UserShiro user = getUser(uid);
//        String[] hash = passwordUtil.hashEncode(password);
//
//        user.setPassword(hash[0]);
//
//        userShiroMapper.updateByUserId(user);
//
////		if (user.getLoginName().equals("root")) {
////			String value = Encrypts.encryptAES(password, UserContext.ENCODE_KEY);
////			configService.set(UserContext.SYSTEM_PASSWORD_KEY, value);
////		}
//
//        return user;
//    }


//    public UserShiro changePassword(String uid, String old, String password) throws Exception {
//        UserShiro user = getUser(uid);
//        String hash = passwordUtil.encode(old, user.getLoginName() + "huaneng");
//        if (!hash.equals(user.getPassword())) {
//            throw new Exception("旧密码不正确!");
//        }
//
//        return changePassword(uid, password);
//    }

    public List<Role> getUserRoles(String userId) {
        return userMapperEx.selectRoleByUserId(userId);
    }


    /**
     * 更新当前用户个人信息
     *
     * @param user
     */
    @Transactional
    public void updateCurrentUserInfo(UserShiro user) throws Exception {
        UserShiro current = SessionUtil.currentUser();
        user.setUserId(current.getUserId());
        if(user.getPassword()!=null&&user.getPassword()!=""){
            entryptPassword(user);
        }
        userShiroMapper.updateByUserId(user);

        current.setRealName(user.getRealName());
        current.setPhone(user.getPhone());
    }

    /**
     * 更新用户信息
     */
    @Transactional
    public void updateUserInfo(UserShiro user, String roleId) throws Exception {
        user.setUserId(user.getUserId());
        if(user.getPassword()!=null&&user.getPassword()!=""){
            entryptPassword(user);
        }
        userShiroMapper.updateByUserId(user);
        //更新角色信息
        userRoleMapper.updateByUserId(user.getUserId(), Integer.valueOf(roleId));
    }

}
