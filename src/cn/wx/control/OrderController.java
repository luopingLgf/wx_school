package cn.wx.control;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("order")
public class OrderController {
    /**
     * 跳转到订单首页
     * @param openid
     * @param model
     * @return
     */
    @RequestMapping("/index/{openid}")
    public String index(@PathVariable String openid, Model model){
        model.addAttribute(openid);
        return "shop";
    }
}
