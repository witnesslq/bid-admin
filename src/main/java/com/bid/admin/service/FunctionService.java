package com.bid.admin.service;


import com.bid.admin.entity.Function;
import com.bid.admin.entity.FunctionEx;

import java.util.List;

public interface FunctionService {

	/**
	 * 保存功能信息
	 * @param function
	 */
	public void insertFunction(Function function);

	/**
	 * 通过功能id删除功能信息
	 * @param fid
	 */
	public void delFunction(String fid);
	/**
	 * 通过功能id删除角色信息
	 * @param fid
	 */
	public void delRoleFunc(String fid);

	/**
	 * 通过功能id获取功能信息
	 * @param fid
	 */
	public Function getFunction(String fid);

	/**
	 * 通过功能parentId获取功能信息
	 * @param parentId
	 */
	public List<FunctionEx> findByParentId(String parentId);

	/**
	 * 获取功能的数量
	 * @param fid
	 */
	public int countByPId(String fid) ;

	/**
	 * 通过功能名和功能parentId获取功能信息
	 * @param funcName parentId
	 */
	public Function getByNameAndPId(String funcName, String parentId) ;

	/**
	 * 获取全部功能信息.
	 */
	public List<Function> findAll() ;

	/**
	 * 通过roleid获取功能信息
	 * @param roleId
	 */
	public List<Function> findByRoleId(String roleId) ;
}
