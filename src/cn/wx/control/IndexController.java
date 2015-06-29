package cn.wx.control;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 主页
 * @author lp
 * 2015年6月26日
 */
@Controller
@RequestMapping("index")
public class IndexController {

    /**
     * 跳转到主页
     * @param model
     * @return
     */
    @RequestMapping("")
    public String toIndex(Model model){
        return "index";
    }
}
