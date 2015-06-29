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
        btn11.setUrl(Constant.SERVER_NAME + "/kinder/index");
        btn11.setName("校园介绍");
        btn11.setType("view");
        ViewButton btn12 = new ViewButton();
        btn12.setUrl(Constant.SERVER_NAME + "/food/index");
        btn12.setName("食谱");
        btn12.setType("view");
        ViewButton btn13 = new ViewButton();
        btn13.setUrl(Constant.SERVER_NAME + "/register/reg");
        btn13.setName("报名");
        btn13.setType("view");

        ComplexButton mainBtn1 = new ComplexButton();
        mainBtn1.setName("校园生活");
        mainBtn1.setSub_button(new ViewButton[] { btn11, btn12, btn13 });

        ViewButton btn21 = new ViewButton();
        btn21.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=11"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn21.setName("班级通知");
        btn21.setType("view");
        ViewButton btn22 = new ViewButton();
        btn22.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=12"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn22.setName("班级圈");
        btn22.setType("view");
        ViewButton btn23 = new ViewButton();
        btn23.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=13"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn23.setName("小孩评语");
        btn23.setType("view");
        ViewButton btn24 = new ViewButton();
        btn24.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=21"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn24.setName("成长档案");
        btn24.setType("view");
        ComplexButton mainBtn2 = new ComplexButton();
        mainBtn2.setName("班级生活");
        mainBtn2.setSub_button(new ViewButton[] { btn21, btn22, btn23, btn24 });

        ViewButton btn31 = new ViewButton();
        btn31.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=22"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn31.setName("上学打卡");
        btn31.setType("view");
        ViewButton btn32 = new ViewButton();
        btn32.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=23"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn32.setName("放学打卡");
        btn32.setType("view");
        ViewButton btn33 = new ViewButton();
        btn33.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + Constant.APPID + "&redirect_uri=" + Constant.SERVER_NAME + "/servlet/Oauth2Servlet?type=24"
                + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
        btn33.setName("考勤记录");
        btn33.setType("view");
        ComplexButton mainBtn3 = new ComplexButton();
        mainBtn3.setName("考勤打卡");
        mainBtn3.setSub_button(new ViewButton[] { btn31, btn32, btn33 });

        Menu menu = new Menu();
        menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });

        return menu;
    }
}
