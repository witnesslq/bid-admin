package com.bid.admin.entity;

import java.util.List;

public class UserEx extends UserShiro {
	
	private List<Role> roles;
	private String roleName;
	private String roleId;

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	

	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName){

		this.roleName=roleName;
	}
	


//	public String[] getRoleIds() {
//		return roleIds;
//	}
//
//	public void setRoleIds(String[] roleIds) {
//		this.roleIds = roleIds;
//	}
	


	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	
	
	/**
	 * 当前用户是否包含指定编码的角色。
	 * @param roleCode 角色编码
	 * @return 包含roleCode指定的角色则返回true，否则返回false。
	 */
	public boolean hasRole(String roleCode) {
		boolean hasRole = false;
		if (roles != null) {
			for(Role role : roles) {
				if (role.getRoleCode().equalsIgnoreCase(roleCode)) {
					hasRole = true;
					break;
				}
			}
		}
		return hasRole;
	}
	
}
