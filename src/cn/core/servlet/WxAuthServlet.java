package cn.core.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import cn.core.util.SignUtil;

/**
 * 微信接入认证
 * @author lp
 * 2015年6月26日
 */
public class WxAuthServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static Logger logger = Logger.getLogger(WxAuthServlet.class);
    private CoreService coreService;

    /**
     * 验证信息是否来自微信
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*
        signature    微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        timestamp    时间戳   nonce    随机数     echostr  随机字符串
        */
        logger.info("开始微信验证申请...");
        String signature = req.getParameter("signature");
        String timestamp = req.getParameter("timestamp");
        String nonce = req.getParameter("nonce");
        String echostr = req.getParameter("echostr");
        
        PrintWriter out = resp.getWriter();
        if(signature == null || timestamp == null || nonce == null || echostr == null){
            out.write("验证申请失败！");
        }else if(SignUtil.checkSignature(signature, timestamp, nonce)){
            out.write(echostr);
        }else{
            out.write("验证申请失败！");
        }
        
        out.close();
        out = null;
    }

    /**
     * 处理微信请求
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        //微信信息处理
        String msg = coreService.processMsg(req, resp);
        out.write(msg);
        out.close();
        out = null;
    }

    @Override
    public void init() throws ServletException {
        super.init();
        ServletContext servletContext = this.getServletContext();   
        WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(servletContext);   
        coreService = (CoreService)ctx.getBean("coreService"); 
    }
    
}
