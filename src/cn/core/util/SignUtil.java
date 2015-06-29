package cn.core.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * 验证工具类
 * 
 * @author lp 2015年6月26日
 */
public class SignUtil {

    public static boolean checkSignature(String signature, String timestamp, String nonce) {
        String signature_ = "";
        String[] arr = new String[] {Constant.TOKEN, timestamp, nonce };
        // 按字典序排序
        Arrays.sort(arr);

        StringBuffer sb = new StringBuffer();
        for (String str : arr) {
            sb.append(str);
        }

        try {
            byte[] b = MessageDigest.getInstance("SHA-1").digest(sb.toString().getBytes());
            signature_ = StringUtil.byteToHexStr(b);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        // 将sha1加密后的字符串可与signature对比，标识该请求来源于微信
        if (!"".equals(signature_) && signature_.equals(signature.toUpperCase())) {
            return true;
        }

        return false;
    }

}
