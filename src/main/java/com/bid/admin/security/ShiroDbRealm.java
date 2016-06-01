/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.bid.admin.security;

import com.bid.admin.entity.Function;
import com.bid.admin.entity.UserEx;
import com.bid.admin.mapper.FunctionMapper;
import com.bid.admin.mapper.RoleFuncMapper;
import com.bid.admin.service.UserShiroService;
import com.google.common.base.Objects;
import com.bid.admin.entity.Role;
import com.bid.admin.entity.RoleFunc;
import com.bid.admin.mapper.UserMapperEx;
import com.bid.user.utils.Password;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Component
public class ShiroDbRealm extends AuthorizingRealm {

    private static final Logger log = LoggerFactory.getLogger(ShiroDbRealm.class);
    @Autowired
    UserShiroService userShiroService;


    /**
     * 认证回调函数,登录时调用.
     * 认证实现
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        //token验证
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        //用户信息实体类
        UserEx user = null;
        try {
            log.info("***************登陆认证，获取用户信息*********************");
            user = getUserExByLoginName(token.getUsername());
        } catch (Exception e) {
            log.error("Can't find by loginName: " + token.getUsername(), e);
        }

        if (user != null) {
            //roleName
//				if (user.getRoles() != null&& user.getRoles().size()>0) {
//					StringBuilder sb = new StringBuilder();
//					for(Role role : user.getRoles()) {
//						if (sb.length() > 0) {
//							sb.append(", ");
//						}
//						sb.append(role.getRoleName());
//					}
//					user.setRoleName(sb.toString());
//				}
//			//roleIds
//			if ( user.getRoles() != null && user.getRoles().size() > 0) {
//				String[] roleIds = new String[user.getRoles().size()];
//				for(int i = 0, len = user.getRoles().size(); i < len; i++) {
//					roleIds[i] = user.getRoles().get(i).getId().toString();
//				}
//				user.setRoleIds(roleIds);
//			}
            //roleId
//			if (user.getRoles() != null && user.getRoles().size() > 0) {
//				user.setRoleId(user.getRoles().get(0).getId().toString());
//			}

            //返回用户信息
            SimpleAuthenticationInfo ai = new SimpleAuthenticationInfo(new ShiroUser(user), user.getPassword(), getName());
            ai.setCredentialsSalt(ByteSource.Util.bytes(user.getLoginName().toLowerCase() + "huaneng"));
            return ai;

        } else {
            return null;
        }
    }


    @Autowired
    private UserMapperEx userMapperEx;

    /**
     * 通过用户登陆名获取用户信息
     */
    private UserEx getUserExByLoginName(String loginName) throws Exception {
        log.info("*****************getUserExByLoginName 获取登陆用户信息*********************");
        return userShiroService.getUserExByLoginName(loginName);
    }

    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
     * 授权实现
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        //获取登陆用户信息
        ShiroUser shiroUser = (ShiroUser) principals.getPrimaryPrincipal();
        UserEx user = (UserEx) shiroUser.getUser();

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        //获取角色信息
        for (Role role : user.getRoles()) {
            //基于Role的权限信息
            info.addRole(role.getRoleCode());
            info.addRole(role.getRoleId().toString());
            info.addRole(role.getRoleName());
            //基于Permission的权限信息
            info.addStringPermissions(getPermissions(role.getRoleId().toString()));
        }

        return info;
    }

    /**
     * 设定Password校验的Hash算法与迭代次数.
     */
    @PostConstruct
    public void initCredentialsMatcher() {
//		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(password.DEFAULT_HASH_ALGORITHM);
//		matcher.setHashIterations(password.DEFAULT_HASH_ITERATIONS);

        HashedCredentialsMatcher matcher = new LimitRetryHashedMatcher();

        setCredentialsMatcher(matcher);
    }

    /**
     * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息.
     */
    public static class ShiroUser implements Serializable {
        private static final long serialVersionUID = -1373760761780840081L;

        private UserEx user;

        public ShiroUser(UserEx user) {
            this.user = user;
        }

        public UserEx getUser() {
            return user;
        }

        /**
         * 本函数输出将作为默认的<shiro:principal/>输出.
         */
        public String toString() {
            return user.getRealName();
        }

        public int hashCode() {
            return user.hashCode();
        }

        public String getLoginName() {
            return user.getLoginName();
        }

        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;

            ShiroUser that = (ShiroUser) obj;

            return Objects.equal(this.getLoginName(), that.getLoginName());
        }
    }

    @Autowired
    private RoleFuncMapper roleFuncMapper;
    @Autowired
    private FunctionMapper functionMapper;

    /**
     * 从数据库中查询角色拥有的权限.
     *
     * @param roleId 角色ID.
     * @return 权限集合.
     */
    private Collection<String> getPermissions(String roleId) {

        List<String> perms = new ArrayList<>();

        //获取角色的功能访问信息
        List<RoleFunc> list = roleFuncMapper.selectByRoleId(Integer.valueOf(roleId));
        for (RoleFunc roleFunc : list) {
            Function function = functionMapper.selectByPrimaryKey(roleFunc.getFuncId());
            if (function != null) {
                String perm = function.getPermission();
                if (StringUtils.isNotBlank(perm))
                    perms.add(perm);
            }
        }


        return perms;
    }

    public static void main(String[] args) {
//		DefaultHashService hashService = new DefaultHashService(); //默认算法SHA-512
//		hashService.setHashAlgorithmName("SHA-256");
//		hashService.setPrivateSalt(new SimpleByteSource("huaneng")); //私盐，默认无
//		hashService.setGeneratePublicSalt(true);//是否生成公盐，默认false
////		hashService.setRandomNumberGenerator(new SecureRandomNumberGenerator());//用于生成公盐。默认就这个
//		hashService.setHashIterations(50000); //生成Hash值的迭代次数
//
//
//		Hash save=new DefaultPasswordService().hashPassword("123456");
//		String  password=new DefaultPasswordService().encryptPassword("123456");
//		String salt=save.getSalt().toHex();
//
////        System.out.println(new Password().checkPasswordLevel("AFSJ823232").ordinal());
//		System.out.println(new DefaultPasswordService().passwordsMatch("123456",save));
//		System.out.println(password + "--------" + salt + "-----" + save.toHex());
        String ss = new Password().encode("123456", "operhuaneng");

        System.out.print(ss);

    }
}
