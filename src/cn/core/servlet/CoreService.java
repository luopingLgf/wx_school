package cn.core.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.DocumentException;
import org.springframework.stereotype.Service;

import cn.core.util.WxMsgUtil;

@Service
public class CoreService {
    private static Logger logger = Logger.getLogger(CoreService.class);

    /**
     * 处理微信信息
     * 
     * @param req
     * @param resp
     * @return
     */
    public String processMsg(HttpServletRequest req, HttpServletResponse resp) {
        logger.info("处理微信请求...");
        Map<String, String> map = null;
        try {
            map = WxMsgUtil.parseReqXml(req);
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
        }

        String msg = "欢迎你：" + map.get("FromUserName");
        String msgType = map.get("MsgType");
        if ("event".equals(msgType)) { // 事件消息
            String eventType = map.get("Event");
            if ("subscribe".equals(eventType)) { // 关注事件
                String eventKey = map.get("EventKey");
                logger.info(map.get("FromUserName") + " 关注了微信... 参数=" + eventKey);
                
                if (eventKey != null && !"".equals(eventKey)) { // 带参数的二维码
                    //String scenceId = eventKey.substring(eventKey.indexOf("qrscene_"));
                } else {
                    
                }

            } else if ("unsubscribe".equals(eventType)) { // 取消关注事件

            } else if ("CLICK".equals(eventType)) { // 点击菜单拉取消息时的事件推送

            } else if ("VIEW".equals(eventType)) { // 点击菜单跳转链接时的事件推送

            } else if ("SCAN".equals(eventType)) { // 用户已关注时的事件推送

            } else if ("LOCATION".equals(eventType)) { // 上报地理位置事件

            }
        } else { // 普通消息
            
        }

        return msg;
    }

}
