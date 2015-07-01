package cn.wx.control;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("shop")
public class ShopController {
    /**
     * 跳转到店铺列表页面
     * @param model
     * @return
     */
    @RequestMapping("/list/{openid}")
    public String toIndex(@PathVariable String openid, Model model){
        model.addAttribute(openid);
        return "shoplist";
    }
    
    /**
     * 跳转到某个店铺首页
     * @param openid
     * @param model
     * @return
     */
    @RequestMapping("/index")
    public String index(Model model){
        return "shop";
    }
}
