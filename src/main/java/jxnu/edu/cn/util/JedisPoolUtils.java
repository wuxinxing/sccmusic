package jxnu.edu.cn.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.ResourceBundle;

public class JedisPoolUtils {
    private static JedisPool jedisPool;

    static {
        JedisPoolConfig config=new JedisPoolConfig();
        config.setMaxTotal(Integer.parseInt(ResourceBundle.getBundle("jedis").getString("maxTotal")));
        config.setMaxIdle(Integer.parseInt(ResourceBundle.getBundle("jedis").getString("maxIdle")));
        jedisPool=new JedisPool(config,
                ResourceBundle.getBundle("jedis").getString("host"),
                Integer.parseInt(ResourceBundle.getBundle("jedis").getString("port")));

    }

    public static Jedis getJedis(){
        return jedisPool.getResource();
    }
}
