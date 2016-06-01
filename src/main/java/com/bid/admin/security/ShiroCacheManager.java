package com.bid.admin.security;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * 缓存管理器
 * */
@Component
public class ShiroCacheManager {
	
	private static final Logger log = LoggerFactory.getLogger(ShiroCacheManager.class);
	
	
	@Autowired
	private ShiroDbRealm shiroDbRealm;
	
	public void clear() {
		//启用身份验证缓存，即缓存AuthenticationInfo信息，默认false
		log.debug("身份验证缓存是否开启 = {}", shiroDbRealm.isAuthenticationCachingEnabled());
		//启用授权缓存，即缓存AuthorizationInfo信息，默认false
		log.debug("授权缓存是否开启 = {}", shiroDbRealm.isAuthorizationCachingEnabled());
		
		if (shiroDbRealm.isAuthenticationCachingEnabled()) {
			//缓存AuthenticationInfo信息的缓存名称；
			log.debug("AuthenticationCacheName = {}", shiroDbRealm.getAuthenticationCacheName());
            //获取身份验证信息
			Cache<Object, AuthenticationInfo> cache = shiroDbRealm.getAuthenticationCache();
			if (cache != null) cache.clear();
		}
		
		if (shiroDbRealm.isAuthorizationCachingEnabled()) {
			//缓存AuthorizationInfo信息的缓存名称
			log.debug("AuthorizationCacheName = {}", shiroDbRealm.getAuthorizationCacheName());
			Cache<Object, AuthorizationInfo> cache = shiroDbRealm.getAuthorizationCache();
			if (cache != null) cache.clear();
		}
	}
}
