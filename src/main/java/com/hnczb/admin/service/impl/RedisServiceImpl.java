package com.hnczb.admin.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.hnczb.admin.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

/**
 * 封装REDIS缓存服务器服务接口
 * 
 * @author liutao
 * @date 2015-4-24
 */
@Service("redisService")
public class RedisServiceImpl implements RedisService {

	@SuppressWarnings("rawtypes")
	@Autowired
	private RedisTemplate redisTemplate;

	private static String redisCode = "utf-8";

	/**
	 * <通过key删除><功能具体实现>
	 * 
	 * @param
	 */
	@SuppressWarnings("unchecked")
	public List<Long> del(final String... keys) {
		return (List<Long>) redisTemplate.execute(new RedisCallback() {
			public List<Long> doInRedis(RedisConnection connection)
					throws DataAccessException {
				List<Long> listId = new ArrayList<Long>();
				for (int i = 0; i < keys.length; i++) {
					listId.add(connection.del(keys[i].getBytes()));
				}
				return listId;
			}
		});
	}

	/**
	 * <通过key删除><功能具体实现>
	 * 
	 * @param keys
	 */
	@SuppressWarnings("unchecked")
	public void del(List<String> keys) {
		redisTemplate.delete(keys);
	}

	/**
	 * <根据key更新值><功能具体实现>
	 * 
	 * @param key
	 */
	@SuppressWarnings("unchecked")
	public boolean update(final byte[] key, final byte[] value, final long liveTime) {
		return (Boolean) redisTemplate.execute(new RedisCallback() {
			public Boolean doInRedis(RedisConnection connection)throws DataAccessException {
				byte[] bytes = connection.get(key);
				if (bytes == null) {
					throw new RuntimeException("key not found");
				} else {
					connection.set(key, value);
					if(liveTime > 0){
						connection.expire(key, liveTime);
					}
				}
				return true;
			}
		});
	}

	/**
	 * <添加key value 并且设置存活时间(byte)><功能具体实现>
	 * 
	 * @param key
	 * @param value
	 * @param liveTime 缓存时间(按秒计算)
	 */
	@SuppressWarnings("unchecked")
	public void set(final byte[] key, final byte[] value, final long liveTime) {
		redisTemplate.execute(new RedisCallback() {
			public Long doInRedis(RedisConnection connection)
					throws DataAccessException {
				connection.set(key, value);
				if (liveTime > 0) {
					connection.expire(key, liveTime);
				}
				return 1L;
			}
		});
	}

	/**
	 * <添加key value 并且设置存活时间><功能具体实现>
	 * 
	 * @param key
	 * @param value
	 * @param liveTime
	 */
	public void set(String key, String value, long liveTime) {
		this.set(key.getBytes(), value.getBytes(), liveTime);
	}

	/**
	 * <添加key value><功能具体实现>
	 * 
	 * @param key
	 * @param value
	 */
	public void set(String key, String value) {
		this.set(key, value, 0L);
	}

	/**
	 * <添加key value 并且设置存活时间><功能具体实现>
	 * 
	 * @param key
	 * @param value
	 */
	public void set(byte[] key, byte[] value) {
		this.set(key, value, 0L);
	}

	/**
	 * <获取redis value><功能具体实现>
	 * 
	 * @param key
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String get(final String key) {
		return (String) redisTemplate.execute(new RedisCallback() {
			public String doInRedis(RedisConnection connection) {
				try {
					byte[] bytes = connection.get(key.getBytes());
					if (bytes == null) {
						return null;
					} else {
						return new String(bytes, redisCode);
					}
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
					return null;
				}
			}
		});
	}

	/**
	 * <通过正则匹配keys><功能具体实现>
	 * 
	 * @param pattern
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Set<String> Setkeys(String pattern) {
		return redisTemplate.keys(pattern);
	}

	/**
	 * <检查key是否已经存在><功能具体实现>
	 * 
	 * @param key
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean exists(final String key) {
		return (Boolean) redisTemplate.execute(new RedisCallback() {
			public Boolean doInRedis(RedisConnection connection)
					throws DataAccessException {
				return connection.exists(key.getBytes());
			}
		});
	}

	/**
	 * <清空redis 所有数据><功能具体实现>
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean flushDB() {
		return (Boolean) redisTemplate.execute(new RedisCallback() {
			public Boolean doInRedis(RedisConnection connection) {
				try {
					connection.flushDb();
					return true;
				} catch (DataAccessException e) {
					e.printStackTrace();
					return false;
				}
			}
		});
	}

	/**
	 * <查看redis里有多少数据><功能具体实现>
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public long dbSize() {
		return (Long) redisTemplate.execute(new RedisCallback() {
			public Long doInRedis(RedisConnection connection)
					throws DataAccessException {
				return connection.dbSize();
			}
		});
	}

	/**
	 * <检查是否连接成功><功能具体实现>
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String ping() {
		return (String) redisTemplate.execute(new RedisCallback() {
			public String doInRedis(RedisConnection connection)
					throws DataAccessException {
				return connection.ping();
			}
		});
	}

}
