package cn.core.servlet;

import cn.core.model.Button;
import cn.core.model.ComplexButton;
import cn.core.model.Menu;
import cn.core.model.ViewButton;
import cn.core.util.Constant;
import cn.core.util.WxHttpUtil;

public class MenuManager {
    /**
     * 创建菜单
     * 
     * @param access_token
     */
    public static void createMenu(String access_token) {
        Menu m = getMenu();
        WxHttpUtil.flushMenu(m, access_token);
    }

    private static Menu getMenu() {
        ViewButton btn11 = new ViewButton();
        btn11.setUrl(Constant.SERVER_NAME + "/index");
        btn11.setName("产品介绍");
        btn11.setType("view");
        ViewButton btn12 = new ViewButton();
        btn12.setUrl(Constant.SERVER_NAME + "/index");
        btn12.setName("联系方式");
        btn12.setType("view");

        ComplexButton mainBtn1 = new ComplexButton();
        mainBtn1.setName("关于我们");
        mainBtn1.setSub_button(new ViewButton[] { btn11, btn12 });

        ViewButton mainBtn2 = new ViewButton();
        mainBtn2.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=11"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        mainBtn2.setName("点单请进");
        mainBtn2.setType("view");

        ViewButton btn31 = new ViewButton();
        btn31.setUrl(Constant.SERVER_NAME + "/index");
        btn31.setName("留言");
        btn31.setType("view");
        ViewButton btn32 = new ViewButton();
        btn32.setUrl(Constant.SERVER_NAME + "/index");
        btn32.setName("评价");
        btn32.setType("view");
        ComplexButton mainBtn3 = new ComplexButton();
        mainBtn3.setName("评价留言");
        mainBtn3.setSub_button(new ViewButton[] { btn31, btn32 });

        Menu menu = new Menu();
        menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });

        return menu;
    }
}
