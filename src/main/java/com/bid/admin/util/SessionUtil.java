package com.bid.admin.util;

import com.bid.admin.entity.UserShiro;
import com.bid.admin.security.ShiroDbRealm;
import org.apache.shiro.SecurityUtils;

public class SessionUtil {
	
	/**
	 * 获取当前用户
	 * 
	 * @return
	 */
	public static UserShiro currentUser() {
		try{			
			return ((ShiroDbRealm.ShiroUser) SecurityUtils.getSubject().getPrincipal()).getUser();
		}catch(Exception e){
			return null;
		}
	}

	/**
	 * 获取当前用户id
	 * 
	 * @return
	 */
	public static String currentUserId() {
		try {
			return currentUser().getUserId();
		} catch (Exception e) {
			return null;
		}
	}
	

	/**
	 * 获取当前用户名
	 * 
	 * @return
	 */
	public static String currentUsername() {
		try {
			return ((ShiroDbRealm.ShiroUser) SecurityUtils.getSubject().getPrincipal()).getLoginName();
		} catch (Exception e) {
			return null;
		}
	}
	/**
	 * 获取用户的角色id
	 * 
	 * @return
	 */
	public static String currentUserRole() {
		try {
			String roleId=((ShiroDbRealm.ShiroUser) SecurityUtils.getSubject().getPrincipal()).getUser().getRoleId();
			return roleId;
		} catch (Exception e) {
			return null;
		}
	}
}
