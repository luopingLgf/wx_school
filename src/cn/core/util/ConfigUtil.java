package cn.core.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigUtil {

    /**
     * 获取配置文件weixin.properties内容
     * @param key
     * @return
     */
    public static String getValue(String key) {
        String value = null;
        Properties p = new Properties();
        InputStream in = ConfigUtil.class.getResourceAsStream("/weixin.properties");
        try {
            p.load(in);
            value = p.getProperty(key);
        } catch (IOException e) {
            e.printStackTrace();
            new LoggerUtil(ConfigUtil.class).loggerInfo(e.getMessage());
        }
        return value;
    }
}
