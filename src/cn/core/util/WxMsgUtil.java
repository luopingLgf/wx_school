package cn.core.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class WxMsgUtil {

    /**
     * 解析请求内容
     * @param req
     * @return
     * @throws IOException
     * @throws DocumentException
     */
    public static Map<String, String> parseReqXml(HttpServletRequest req) throws IOException, DocumentException {
        Map<String, String> map = new HashMap<String, String>();
        InputStream in = req.getInputStream();
        // dom4j解析xml
        SAXReader sr = new SAXReader();
        Document doc = sr.read(in);
        Element root = doc.getRootElement();
        
        @SuppressWarnings("unchecked")
        List<Element> el = root.elements();
        for (Element e : el) {
            map.put(e.getName(), e.getText());
        }
        return map;
    }
}
