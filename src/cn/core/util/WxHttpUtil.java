package cn.core.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import cn.core.model.Menu;

public class WxHttpUtil {
    private static Logger logger = Logger.getLogger(WxHttpUtil.class);

    private static String access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
    private static String jsaip_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=";
    private static String menu_flush_url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";
    public static String oauth2_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
    
    /**
     * 获取access_token
     * @param appid
     * @param appsecret
     * @return
     */
    public static Map<String, String> getAccessToken(String appid, String appsecret) {
        Map<String, String> map = new HashMap<String, String>();
        String requestUrl = access_token_url.replace("APPID", appid).replace("APPSECRET", appsecret);
        JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);
        if(jsonObject != null){
            logger.info("获取access_token成功.:" + jsonObject.getString("access_token"));
            map.put("access_token", jsonObject.getString("access_token"));
            map.put("expires_in", String.valueOf(jsonObject.getInt("expires_in")));
        }
        return map;
    }
    
    /**
     * 获取jsaip_ticket
     * @param access_token
     * @return
     */
    public static Map<String, String> getJsapiTicket(String access_token) {
        Map<String, String> map = new HashMap<String, String>();
        String requestUrl = jsaip_ticket_url + access_token;
        JSONObject jsonObject = httpsRequest(requestUrl, "GET", null);
        if(jsonObject != null){
            logger.info("获取jsaip_ticket成功.:" + jsonObject.getString("ticket"));
            map.put("ticket", jsonObject.getString("ticket"));
            map.put("expires_in", String.valueOf(jsonObject.getInt("expires_in")));
        }
        return map;
    }
    
    /**
     * 渲染菜单
     * @param m
     * @param access_token
     */
    public static void flushMenu(Menu m, String access_token) {
        String requestUrl = menu_flush_url.replace("ACCESS_TOKEN", access_token);
        JSONObject jsonObject = new JSONObject(m);
        String json_menu = jsonObject.toString();
        JSONObject json_result = httpsRequest(requestUrl, "POST", json_menu);
        if(json_result != null){
            int errcode = json_result.getInt("errcode");
            if(errcode != 0){
                logger.info("渲染菜单失败，errcode： " + errcode);
            }else{
                logger.info("渲染菜单成功，errcode： " + errcode);
            }
        }
        
    }
    
    /**
     * 获取网页授权信息
     * @param appid
     * @param token
     * @param code
     * @return
     */
    public static JSONObject getOautho2(String appid, String appsecret, String code) {
        String requestUrl = oauth2_url.replace("APPID", appid).replace("SECRET", appsecret).replace("CODE", code);
        return httpsRequest(requestUrl, "GET", null);
    }

    /**
     * 发送请求，处理返回结果
     * @param requestUrl
     * @param method
     * @param outputStr
     * @return
     */
    private static JSONObject httpsRequest(String requestUrl, String method, String outputStr) {
        JSONObject jsonObject = null;
        StringBuffer buffer = new StringBuffer();
        
        // 创建SSLcontext管理器对像，使用我们指定的信任管理器初始化
        TrustManager[] tm = { new MyX509TrustManager() };
        SSLContext sslContext;
        try {
            sslContext = SSLContext.getInstance("SSL", "SunJSSE");
            sslContext.init(null, tm, new java.security.SecureRandom());
            SSLSocketFactory ssf = sslContext.getSocketFactory();

            URL url = new URL(requestUrl);
            HttpsURLConnection httpsUrlConn = (HttpsURLConnection) url.openConnection();
            httpsUrlConn.setSSLSocketFactory(ssf);
            httpsUrlConn.setDoInput(true);
            httpsUrlConn.setDoOutput(true);
            httpsUrlConn.setUseCaches(false);
            // 设置请求方式（GET/POST）
            httpsUrlConn.setRequestMethod(method);
            if ("GET".equalsIgnoreCase(method)) {
                httpsUrlConn.connect();
            }

            // 当有数据需要提交时
            if (outputStr != null) {
                OutputStream outputStream = httpsUrlConn.getOutputStream();
                // 防止中文乱码
                outputStream.write(outputStr.getBytes("UTF-8"));
                outputStream.close();
                outputStream = null;
            }

            // 将返回的输入流转换成字符串
            InputStream inputStream = httpsUrlConn.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

            String str = null;
            while ((str = bufferedReader.readLine()) != null) {
                buffer.append(str);
            }

            bufferedReader.close();
            inputStreamReader.close();

            inputStream.close();
            inputStream = null;

            httpsUrlConn.disconnect();
            jsonObject = new JSONObject(buffer.toString());
        } catch (NoSuchAlgorithmException | NoSuchProviderException | KeyManagementException | IOException e) {
            e.printStackTrace();
            new LoggerUtil(WxHttpUtil.class).loggerInfo(e.getMessage());
        }

        return jsonObject;
    }

}
