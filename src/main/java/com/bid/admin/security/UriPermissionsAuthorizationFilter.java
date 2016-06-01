package com.bid.admin.security;

import com.bid.admin.service.impl.FunctionProvider;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;
/**
 *自定义鉴权
 * 根据url产生的权限字符串。
 * 例如：/User/create.do?***=***  -->权限字符串：/User/create.do
 */
@Component("uriPermsFilter")
public class UriPermissionsAuthorizationFilter extends
		PermissionsAuthorizationFilter {
	
	private final static Logger log = LoggerFactory.getLogger(UriPermissionsAuthorizationFilter.class);
	
	@Autowired
	private FunctionProvider functionProvider;
	
	@Override
	public boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws IOException {
		
		String perm = neededPermission(request);
		
		log.debug("请求 '{}', 需要权限: {}",  getURI(request), perm);
		//权限验证
		if (StringUtils.isNotBlank(perm)) {
			return SecurityUtils.getSubject().isPermitted(perm);
		}
		return true;
	}


	private Object getURI(ServletRequest request) {
		return ((HttpServletRequest)request).getServletPath();
	}

	private AntPathMatcher pathMatcher = new AntPathMatcher();

    //获取权限字符串
	private String neededPermission(ServletRequest request) {
		HttpServletRequest req = (HttpServletRequest)request;
		String servletPath = req.getServletPath();
        //获取action
		List<String> actions = functionProvider.getActions();
		//获取action和对应的权限队
		Map<String, String> actionPermissionMap = functionProvider.getActionPermissionMap();
		
		//路径与功能定义中的action完全匹配，则直接返回.
		if (actions.contains(servletPath)) {
			return actionPermissionMap.get(servletPath);
		}
		
		String perm = null;
		
		for (String action : functionProvider.getActions()) {
			if (pathMatcher.match(action, servletPath))
				perm = actionPermissionMap.get(action);
		}
	
		return perm;
	}
	
}
