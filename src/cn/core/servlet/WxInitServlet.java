package cn.core.servlet;

import java.util.Map;

import javax.servlet.ServletConfig;

import org.springframework.web.context.ServletConfigAware;

import cn.core.util.ConfigUtil;
import cn.core.util.Constant;
import cn.core.util.WxHttpUtil;

public class WxInitServlet implements ServletConfigAware {
    @Override
    public void setServletConfig(ServletConfig servletContext) {
    }
    
    public void init(){
        String reload = ConfigUtil.getValue("reload");
        String token = ConfigUtil.getValue("token");
        String appid = ConfigUtil.getValue("appid");
        String appsecret = ConfigUtil.getValue("appsecret");
        Constant.TOKEN = token;
        Constant.APPID = appid;
        Constant.APPSECRET = appsecret;
        
        if("0".equals(reload)){
            System.out.println("不加载...");
            return;
        }
        
        Map<String, String> map_token = WxHttpUtil.getAccessToken(appid, appsecret);
        Map<String, String> map_jsapi = WxHttpUtil.getJsapiTicket(map_token.get("access_token"));
        Constant.JSAPI_TIKECT = map_jsapi.get("ticket");
        MenuManager.createMenu(map_token.get("access_token"));
    }

}
