package cn.core.util;

/**
 * 字符串工具类
 * 
 * @author lp 2015年6月26日
 */
public class StringUtil {

    /**
     * 字节数组转换为十六进制字符串
     * @param bytes
     * @return
     */
    public static String byteToHexStr(byte[] bytes) {
        if (bytes == null || bytes.length <= 0) {
            return null;
        }
        StringBuffer hexStr = new StringBuffer();
        for (byte b : bytes) {
            int v = b & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                hexStr.append(0);
            }
            hexStr.append(hv);
        }
        return hexStr.toString();
    }

}
