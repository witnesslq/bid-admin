package com.hnczb.admin.util;

import java.lang.reflect.Type;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class MyGson {
	
	private final Gson gson;
	private final static String DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";
	private final static GsonBuilder builder = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss");
	
	private static MyGson myGson = null;
	
	public static MyGson newInstance(){
		if(myGson==null){
			myGson = new MyGson();
		}
		return myGson;
	}

	public static Gson getInstance(){
		return builder.create();
	}

	private MyGson() {
		GsonBuilder gsb = new GsonBuilder();
		gsb.setDateFormat(DATE_PATTERN);
		gson = gsb.create();
	}

	/**
	 * 从bean生成json串
	 * 
	 * @param bean
	 * @return
	 */
	public String toJson(Object bean) {
		return gson.toJson(bean);
	}

	/**
	 * 从bean生成json串
	 * 
	 * @param bean
	 * @param datePattern
	 *                    时间格式 类似 yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public String toJson(Object bean, String datePattern) {
		GsonBuilder gsb = new GsonBuilder();
		gsb.setDateFormat(datePattern);
		return gsb.create().toJson(bean);
	}

	/**
	 * 从json串生成对象
	 * 
	 * @param json
	 * @param clazz
	 * @return
	 */
	public <T> T fromJson(String json, Class<T> clazz) {
		return (T) gson.fromJson(json, clazz);
	}

	/**
	 * 用于转换map
	 * 
	 * @param json
	 * @param type
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> T fromJson(String json, Type type) {
		return (T) gson.fromJson(json, type);
	}

	/**
	 * 从json串生成对象
	 * 
	 * @param json
	 * @param clazz
	 * @param datePattern
	 *                    时间格式 类似 yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public <T> T fromJson(String json, Class<T> clazz, String datePattern) {
		GsonBuilder gsb = new GsonBuilder();
		gsb.setDateFormat(datePattern);
		return (T) gsb.create().fromJson(json, clazz);
	}

	/**
	 * 用于转换map
	 * 
	 * @param json
	 * @param type
	 * @param datePattern
	 *                    时间格式 类似 yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> T fromJson(String json, Type type, String datePattern) {
		GsonBuilder gsb = new GsonBuilder();
		gsb.setDateFormat(datePattern);
		return (T) gsb.create().fromJson(json, type);
	}

	public static void main(String[] args) {
		String json = "{\"ua\":\"renren\",\"remoteAddr\":\"127.0.0.1\",\"User-Agent\":\"Java/1.7.0\",\"from\":\"cctv\",\"remoteHost\":\"127.0.0.1\"}";
		Type mapType = new TypeToken<Map<String, String>>(){}.getType();
		Map<String,String> map = new MyGson().fromJson(json, mapType);
		System.out.println(map);
	}
}
