package com.hnczb.admin.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.hnczb.admin.entity.Function;
import com.hnczb.admin.mapper.FunctionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

/**
 *获取功能的url和权限
 */
@Component
@Lazy
public class FunctionProvider extends Providers.AbstractProvider {

	@Autowired
	private FunctionMapper functionMapper;
	
	private Map<String, String> actionPermissionMap;
	
	private List<String> actions;
	
	public FunctionProvider() {
		Providers.add(this);
	}

	protected void load() {

		clear();
		
		Set<String> set = new HashSet<>();
		//获取功能信息
		List<Function> funcs = functionMapper.selectAll();
		for (Function f : funcs) {
			actionPermissionMap.put(f.getAction(), f.getPermission());
			set.add(f.getAction());
		}
		
		actions.addAll(set);
		Collections.sort(actions);
		Collections.reverse(actions);

	}
	
	public void clear() {
		actionPermissionMap = new HashMap<>();
		actions = new ArrayList<>();
	}

	public List<String> getActions() {
		tryLoad();
		return actions;
	}

	public Map<String, String> getActionPermissionMap() {
		tryLoad();
		return actionPermissionMap;
	}

}
