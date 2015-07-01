package cn.core.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import cn.core.util.Constant;
import cn.core.util.WxHttpUtil;

public class Oauth2Servlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    private static Logger logger = Logger.getLogger(Oauth2Servlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSONObject oauth2 = WxHttpUtil.getOautho2(Constant.APPID, Constant.APPSECRET, req.getParameter("code"));
        String type = req.getParameter("type");
        if(oauth2 != null && !oauth2.has("errcode")){
            logger.info("type = " + type + "，网页授权成功...");
            String page = "";
            if("11".equals(type)){ //点单请进
                page = Constant.SERVER_NAME + "/shop/list/" + oauth2.getString("openid");
            }
            resp.sendRedirect(page);
        }else{
            logger.info(oauth2 == null ? "oauth2 is null" : "errmsg:" + oauth2.get("errmsg"));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

}
