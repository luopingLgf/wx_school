<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>店铺页面</title>
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">

<script src="./../js/zepto.js"></script>
<script src="./../js/template-native.js"></script>
<script src="./../js/iscroll.js"></script>
<script src="./../js/common.js"></script>
<script src="./../js/index.js"></script>

<link rel="stylesheet" type="text/css" href="./../css/common.css">
<link rel="stylesheet" type="text/css" href="./../css/index.css">
</head>

<body>
	<script>
		var workstatus = "normal";
		//弹出不在营业提示
		var isAttention = parseInt(0);
		var attentionContent = '店铺关闭了~！';
		//分享时需要的
		var isFollowNotice = parseInt(1);
		var followDesc = '享买科技，微信订餐程序。';

		var followTitle = '微信公众号：xcpdsz';
		var followLink = 'http://mp.weixin.qq.com/s?__biz=MjM5MDM5MjEwNw==&amp;mid=204389639&amp;idx=1&amp;sn=761b27aee811c4a20d8376113139c16d#rd';
		var isFromShare = parseInt(0);

		var open_addservice = parseInt(0);
		var addserviceJson = [];

		var lewaimai_customer_id = parseInt(1176);
		var admin_id = parseInt(1);
		var shop_id = parseInt(63);
		var wxusername = 'oQdbEtw0fJAB1cKW61c7paV5WyeU';
		//通过php初始化一些基本的json变量

		var addresslist = [];
		var selectTypeId = parseInt(4);

		var foodtypelistJson = {
			"4" : [
					{
						"typeid" : "4",
						"second_type_id" : 0,
						"id" : "10",
						"name" : "\u871c\u6843\u7eff\u8336",
						"unit" : "\u676f",
						"label" : "\u9999\u8fa3",
						"price" : "25.00",
						"img" : "\/Public\/Uploads\/Images\/temp\/2014-08-25\/53fab018b8eb1.jpg",
						"point" : "25",
						"stockvalid" : "0",
						"stock" : 0,
						"des" : "\u9999\u8fa3\u53ef\u53e3",
						"ordernum" : 0,
						"ordered_count" : "644",
						"is_limitfood" : 0,
						"memberlimit" : 0,
						"member_price_used" : 0,
						"member_price" : "25",
						"is_nature" : 0,
						"nature" : [],
						"natureArray" : []
					}, {
						"typeid" : "4",
						"second_type_id" : 0,
						"id" : "16",
						"name" : "\u5728\u7ebf\u652f\u4ed8\u6d4b\u8bd5",
						"unit" : "\u89d2",
						"label" : "\u6d4b\u8bd5",
						"price" : "0.10",
						"img" : "",
						"point" : "0",
						"stockvalid" : "0",
						"stock" : 0,
						"des" : "0",
						"ordernum" : 0,
						"ordered_count" : "605",
						"is_limitfood" : 0,
						"memberlimit" : 0,
						"member_price_used" : 0,
						"member_price" : "0",
						"is_nature" : 0,
						"nature" : [],
						"natureArray" : []
					}, {
						"typeid" : "4",
						"second_type_id" : 0,
						"id" : "116",
						"name" : "\u7279\u6b8a\u5546\u54c1",
						"unit" : "\u6b21",
						"label" : "\u6d4b\u8bd5",
						"price" : "1.00",
						"img" : "",
						"point" : "1",
						"stockvalid" : "0",
						"stock" : 0,
						"des" : "\u8fd9\u662f\u8f66\u5e02\u5546\u54c1",
						"ordernum" : 0,
						"ordered_count" : "226",
						"is_limitfood" : 0,
						"memberlimit" : 0,
						"member_price_used" : 0,
						"member_price" : "1",
						"is_nature" : 0,
						"nature" : [],
						"natureArray" : []
					} ],
			"12" : [ {
				"typeid" : "12",
				"second_type_id" : 0,
				"id" : "15",
				"name" : "\u8292\u679c\u7eff\u8336",
				"unit" : "\u676f",
				"label" : "",
				"price" : "1.00",
				"img" : "\/Public\/Uploads\/Images\/temp\/2014-08-25\/53faafe135dea.jpg",
				"point" : "199",
				"stockvalid" : "0",
				"stock" : 0,
				"des" : "1",
				"ordernum" : 0,
				"ordered_count" : "336",
				"is_limitfood" : 0,
				"memberlimit" : 0,
				"member_price_used" : 0,
				"member_price" : "199",
				"is_nature" : 0,
				"nature" : [],
				"natureArray" : []
			} ]
		};
		var foodsecondtypelistJson = {
			"4" : [],
			"12" : []
		};

		var unitshow = parseInt(1);
		//显示销售数量
		var showsales = parseInt(1);
		var openpoint = parseInt(0);

		//js全局变量的初始化
		if (!window.localStorage) {
			alert("您的浏览器版本过低，不支持本系统，请更新浏览器后重试！");
		}
		var storage = window.localStorage;

		var shopcartname = "shopcart_" + shop_id;
		if (!storage.getItem(shopcartname)) {
			storage.setItem(shopcartname, "{}");
		}

		var foodtypeOrdernumJson = JSON.parse("{}"); //用来记录每个分类被点的次数
		for ( var typeid in foodtypelistJson) {
			foodtypeOrdernumJson[typeid] = 0;
		}

		var pagehash = 'index';

		//index用到
		var coordinate_x = parseFloat(123.439618);
		var coordinate_y = parseFloat(41.797984);
		var shopname = '享买科技第一分店';

		//order用到
		var showtype = parseInt(2);

		//cart页面相关的js全局变量
		var ordervalid = parseInt(1);
		var orderphone = '13066656961';

		var IsShopMember = parseInt(0);
		var IsShopDiscount = parseInt(0);
		var ShopDiscount = parseFloat(10);
		var discountlimitmember = parseInt(0);
		var memberBalance = parseFloat(0);
		var memberFreeze = parseInt(0);
		var ismember = parseInt(1);
		var basicprice = parseFloat(20);
		var delivery_fee = parseFloat(3);
		var member_delivery_fee = 'no';
		var delivery_fee_valid = parseInt(1);
		var reach_delivery_fee_type = parseInt(0);
		var no_delivery_fee_value = parseFloat(0.0);

		//pay用到
		var init_time = 180;
		var IsMergeOpen = parseInt();
		var selftake = 0;

		/*分享朋友圈回调处理*/

		//分享朋友圈相关
		var shareimg = './../img/53fab033f191d.jpg';
		var shareshopname = '享买科技，微信订餐程序。';
	</script>

	<div class="pages">
		<div id="footer" class="footer">
			<div id="home" class="row-item active">
				<div class="icon-home"></div>
				<p>首页</p>
			</div>
			<div id="order" class="row-item">
				<div class="icon-order"></div>
				<p>选购</p>
			</div>
			<div id="cart" class="row-item">
				<div class="icon-cart"></div>
				<p>购物车</p>
			</div>
			<div id="usercenter" class="row-item">
				<div class="icon-user"></div>
				<p>个人中心</p>
			</div>
		</div>

		<section style="display: block;" id="page-index" class="__page__">
			<div class="page-header">
				<div style="display: none;" class="header-back"></div>
				<p>一号店铺</p>
				<div id="cancelcollect" class="collectshop" style="display: none;" collect_id="0"></div>
			</div>
			<div id="page-index-content">
				<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 200ms; transform: translate(0px, 0px) translateZ(0px);" id="scroller1">
					<div class="shoplogo">
						<img src="./../img/53fab033f191d.jpg">
					</div>

					<div class="module-layout" style="height: 93px;">
						<div class="module module-row-last module-row-1 module-col-1">
							<div class="module-icon module-icon-order"></div>
							<table class="module-name">
								<tbody>
									<tr>
										<td>进入店铺</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="module module-row-last module-row-1 module-col-2">
							<div class="module-icon module-icon-orderhistory"></div>
							<table class="module-name">
								<tbody>
									<tr>
										<td>订单状态</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="module module-row-last module-row-1 module-col-3">
							<div class="module-icon module-icon-giftcenter"></div>
							<table class="module-name">
								<tbody>
									<tr>
										<td>我的优惠券</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="module module-row-last module-row-1 module-col-4">
							<div class="module-icon module-icon-message"></div>
							<table class="module-name">
								<tbody>
									<tr>
										<td>我的信箱</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div style="height: 15px;"></div>

					<div class="commoninfo-layout">
						<div class="commoninfo-title notice-title">
							<div class="notice-icon"></div>
							<p>公告</p>
						</div>
						<div class="commoninfo-content" style="padding-top: 10px;">
							<p>你好欢迎光临xxxx店铺</p>
						</div>
					</div>

					<div style="height: 15px;"></div>

					<div class="commoninfo-layout">
						<div class="commoninfo-title">
							<p>店铺信息</p>
						</div>
						<div class="commoninfo-content shopinfo-content">
							<div class="shopinfo-layout">
								<div class="shopinfo-item">
									<p class="shopinfo-name">店铺分类：</p>
									<p class="shopinfo-value">欢迎</p>
								</div>
								<div class="shopinfo-item">
									<p class="shopinfo-name">营业时间：</p>
									<p class="shopinfo-value">08:00:00 - 23:59:00</p>
								</div>
								<div id="gogooglemap" class="shopinfo-item shopinfo-address-item">
									<p class="shopinfo-name">店铺地址：</p>
									<p class="shopinfo-value">辽宁身沈阳市苏家屯区玫瑰街123-4</p>
									<div class="shopinfo-address"></div>
								</div>
								<div class="shopinfo-item">
									<p class="shopinfo-name">电话：</p>
									<p id="shopphonevalue" class="shopinfo-value">13066656961</p>
									<div id="call_btn" class="shopinfo-phone"></div>
								</div>
								<div class="shopinfo-item">
									<p class="shopinfo-name">起送价格：</p>
									<p class="shopinfo-value">￥10（满10元免外送费）</p>
								</div>
								<div class="shopinfo-item">
									<p class="shopinfo-name">服务半径：</p>
									<p class="shopinfo-value">10公里</p>
								</div>
								<div id="area" class="shopinfo-item">
									<p class="shopinfo-name">配送区域：</p>
									<p class="shopinfo-value">全部区域</p>
								</div>
								<!-- 自定义显示项 -->
							</div>
						</div>
					</div>
					<div style="height: 15px;"></div>

					<div class="commoninfo-layout">
						<div class="commoninfo-title">
							<p>最新评论</p>
							<p class="more-comment">更多 &gt;</p>
						</div>
						<div class="commoninfo-content commentinfo-content">
							<div class="commentlist-item ">
								<p class="commentlist-item-customername">顾客的评价：</p>
								<div class="commentlist-item-xingxing-bkg">
									<div class="commentlist-item-xingxing-front" style="width: 75px;"></div>
								</div>
								<p class="commentlist-item-content">湖北</p>
								<div class="commentlist-item-zan zan" tage="zc" canzan="no" commentid="49568">
									<div class="commentlist-item-time">2014-12-30 17:25:12</div>
								</div>
							</div>

							<div class="commentlist-item commentlist-item-last">
								<p class="commentlist-item-customername">顾客的评价：</p>
								<div class="commentlist-item-xingxing-bkg">
									<div class="commentlist-item-xingxing-front" style="width: 75px;"></div>
								</div>
								<p class="commentlist-item-content">挺好的</p>
								<div class="commentlist-item-zan zan" tage="zc" canzan="no" commentid="48678">
									<div class="commentlist-item-time">2014-11-11 16:15:11</div>
								</div>
							</div>
						</div>
					</div>
					
					<div style="height: 15px;"></div>
					<div class="copyright">
						<p>
							© 2015 <span id="copyright-text">合智汇天公司</span>提供技术支持
						</p>
					</div>
					<div style="height: 15px;"></div>
				</div>
			</div>
		</section>

		<section style="display: none;" id="page-order" class="__page__">
			<div class="shop-marquee" id="shop_notices">
				<div class="notice-icon"></div>
				<div class="marquee-content">
					<marquee scrollamount="2" behavior="alternate" style="">欢迎体验，各种功能欢迎定制!</marquee>
				</div>
				<div class="ordernotice-close-icon"></div>
			</div>
			<div id="order-content" class="content" style="top: 34px;">
				<div id="typelist">
					<div id="typelist-layout" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 200ms; transform: translate(0px, 0px) translateZ(0px);">
						<div class="search-btn-layout">
							<div class="search-btn" id="search-btn"></div>
						</div>

						<div class="typelist-item-layout">
							<div class="typelist-item active" id="foodtype_4">
								<span>川菜</span>
								<div class="foodtype-ordernumposition">
									<div class="foodtype-ordernumlayout" id="foodtype-ordernumlayout-4" style="display: none;">
										<p id="foodtypeordernum_4">0</p>
									</div>
								</div>
							</div>

							<div class="typelist-item" id="foodtype_12">
								<span>锦州烤串</span>
								<div class="foodtype-ordernumposition">
									<div class="foodtype-ordernumlayout" id="foodtype-ordernumlayout-12" style="display: none;">
										<p id="foodtypeordernum_12">0</p>
									</div>
								</div>
							</div>
							<div style="height: 55px;"></div>
						</div>
					</div>
				</div>

				<div id="foodsecondtype-layout" style="display: none;">
					<div id="foodsecondtype-scroller" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 200ms; transform: translate(0px, 0px) translateZ(0px);">
						<div class="foodsecondtype-item-layout"></div>
					</div>
				</div>

				<div id="foodlist" class="">
					<div id="foodlist-layout" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 200ms; transform: translate(0px, 0px) translateZ(0px);">
						<div class="model_2" id="model_2_foodlist">
							<div typeid="4" class="fooditem second_type_id_0" id="fooditem_10">
								<table width="100%">
									<tbody>
										<tr>
											<td class="foodimage"><img src="http://test.xiangmai.org/Public/Uploads/Images/temp/2014-08-25/53fab018b8eb1.jpg" id="foodimage_10">
												<div class="foodimage_label">
													<p class="foodlabel_name">香辣</p>
												</div></td>
											<td>
												<table class="foodtitle">
													<tbody>
														<tr>
															<td class="foodcontent">
																<p style="display: block;" class="foodname" id="foodname_10">蜜桃绿茶</p>
															</td>
														</tr>
													</tbody>
												</table>
												<table class="foodselect">
													<tbody>
														<tr>
															<td>
																<div class="food_count">已售644份</div>
																<div class="foodprice" id="foodprice_layout_10">
																	￥<span id="foodprice_10">25</span> <span class="foodunit">/杯</span>
																</div>
															</td>
															<td class="foodnumop" id="foodnumop_10">
																<div class="big-plus icon-plus" id="big_plus_10"></div>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<div is_nature="0" class="foodnature" id="foodnature_10"></div>
							</div>

							<div typeid="4" class="fooditem second_type_id_0" id="fooditem_16">
								<table width="100%">
									<tbody>
										<tr>
											<td class="foodimage">

												<div class="foodimage-default" src="nofoodimage" id="foodimage_16"></div>
												<div class="foodimage_label">
													<p class="foodlabel_name">测试</p>
												</div>

											</td>
											<td>
												<table class="foodtitle">
													<tbody>
														<tr>
															<td class="foodcontent">
																<p style="display: block;" class="foodname" id="foodname_16">在线支付测试</p>
															</td>
														</tr>
													</tbody>
												</table>
												<table class="foodselect">
													<tbody>
														<tr>
															<td>

																<div class="food_count">已售605份</div>

																<div class="foodprice" id="foodprice_layout_16">

																	￥<span id="foodprice_16">0.1</span> <span class="foodunit">/角</span>

																</div>
															</td>
															<td class="foodnumop" id="foodnumop_16">

																<div class="big-plus icon-plus" id="big_plus_16"></div>

															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<div is_nature="0" class="foodnature" id="foodnature_16"></div>
							</div>

							<div typeid="4" class="fooditem second_type_id_0" id="fooditem_116">
								<table width="100%">
									<tbody>
										<tr>
											<td class="foodimage">
												<div class="foodimage-default" src="nofoodimage" id="foodimage_116"></div>
												<div class="foodimage_label">
													<p class="foodlabel_name">测试</p>
												</div>
											</td>
											<td>
												<table class="foodtitle">
													<tbody>
														<tr>
															<td class="foodcontent">
																<p style="display: block;" class="foodname" id="foodname_116">特殊商品</p>
															</td>
														</tr>
													</tbody>
												</table>
												<table class="foodselect">
													<tbody>
														<tr>
															<td>
																<div class="food_count">已售226份</div>
																<div class="foodprice" id="foodprice_layout_116">
																	￥<span id="foodprice_116">1</span> <span class="foodunit">/次</span>
																</div>
															</td>
															<td class="foodnumop" id="foodnumop_116">
																<div class="big-plus icon-plus" id="big_plus_116"></div>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>

								<div is_nature="0" class="foodnature" id="foodnature_116"></div>
							</div>
						</div>
						<div style="height: 55px;"></div>
					</div>
				</div>

				<div id="order-content-mask"></div>
			</div>

			<div class="shopcart-info">
				<p class="shopcart-select-info">
					<span id="totalordernum">0</span>
				</p>
				<p class="shopcart-select-price-info">
					总价：￥<span id="totalprice">0</span>
				</p>

				<div id="goshopcart" class="goshopcart-btn">
					<p id="goshopcart-text">选好了</p>
				</div>
			</div>

			<div id="search-result">
				<div id="search-result-content" class="model_2"></div>
			</div>

			<div class="search-layout">
				<input id="search-input" placeholder="请输入商品名">
				<div id="search-btn">
					<p>搜索</p>
				</div>
				<div id="complete-btn">
					<p>完成</p>
				</div>
			</div>
		</section>

		<section style="display: none;" id="page-cart" class="__page__">
			<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="scroller3">
				<div class="cartfoodinfo">
					<div id="cartlayout"></div>
					<div class="pricechangeinfo">
						<p class="cartprice-text">
							总价：￥<span id="cart-totalprice">0</span>
						</p>
						<div id="memberinfo"></div>
						<div id="discountinfo"></div>
						<p id="deliveryinfo"></p>
						<div id="addserviceinfo"></div>
					</div>
				</div>

				<p class="cart-payprice">
					应付金额：<span class="shouldpayprice">￥<span id="shouldpayprice-value">0</span></span>
				</p>

				<div class="orderinfo-setting">
					<form id="options"></form>
					<div class="order-info-item">
						<p>订单备注</p>
						<div class="item-value">
							<input class="item-input" id="note" name="note" placeholder="如：不要辣、12点前送到">
						</div>
					</div>

				</div>
				<div style="height: 15px;"></div>

				<div id="gopay" class="gopay active">
					<p>去结算</p>
				</div>

				<div style="height: 15px;"></div>
			</div>
		</section>

		<section style="display: none;" id="page-cartempty" class="__page__">
			<div class="cartempty-icon"></div>
			<div class="cartempty-text">
				<p>购物车为空哦，快去选购吧</p>
			</div>
		</section>

		<section style="display: none;" id="page-shopclose" class="__page__">
			<div class="noshopclose-text">
				<p></p>
			</div>
		</section>
		<section style="display: none;" id="page-noweixinorder" class="__page__">
			<div class="noweixinorder-text">
				<p>该店铺关闭了微信下单，您暂时无法在该店铺下单</p>
			</div>
		</section>
		<section style="display: none;" id="page-noworktime" class="__page__">
			<div class="noworktime-text">
				<p>该店铺不在营业时间，您暂时无法在该店铺下单</p>
			</div>
		</section>
		<section style="display: none;" id="page-ordersuccess" class="__page__">
			<div class="ordersuccess-icon"></div>
			<div class="ordersuccess-text">
				<p></p>
			</div>
			<div class="ordersuccess-continuepay">
				<p>继续选购</p>
			</div>
			<div class="ordersuccess-showdetail">
				<p>查看详情</p>
			</div>
		</section>

		<section style="display: none;" id="page-pay" class="__page__">
			<div class="page-header">
				<div class="header-back"></div>
				<p>结算</p>
			</div>
			<div id="page-pay-content">
				<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="scroller4">
					<div style="height: 15px;"></div>
					<div class="pay-info">
						<div class="paytype">
							<p class="paytype-info">支付方式：</p>
							<div id="pay-offline" class="paytype-text paytype-text-1 active">
								<p>货到付款</p>
							</div>
							<div id="pay-balance" class="paytype-text paytype-text-2">
								<p>余额付款</p>
							</div>
							<div id="pay-online" class="paytype-text paytype-text-3 ">
								<p>在线支付</p>
							</div>
						</div>

						<div id="paypassword-layout" class="order-info" style="display: none;"></div>
						<div id="online-info" class="order-info" style="display: none;">
							<div id="online-info-content" class="order-info-item pay-onlinetype">
								<p>支付类型</p>
								<div class="item-value">
									<div class="select-outer item-value-selectposition">
										<div class="select-arrow"></div>
										<select class="item-select" id="online_pay_type" name="online_pay_type">
											<option selected="selected" value="zhifubao">支付宝</option>
											<option value="weixinzhifu">微信支付</option>
										</select>
									</div>
								</div>
							</div>
						</div>

					</div>
					<p class="lastpayprice-layout">
						支付金额：<span class="lastpayprice">￥<span id="LastPayPrice"></span></span>
					</p>

					<div id="chooseaddress" class="contact-layout">
						<p>
							联系人：<span id="name"></span>
						</p>
						<p>
							联系电话：<span id="phone"></span>
						</p>
						<p class="contact-address">
							联系地址：<span id="address"></span>
						</p>
						<div class="shopinfo-address"></div>
					</div>

					<div style="height: 15px;"></div>

					<div id="submitorder" class="gopay active">
						<p>提交订单</p>
					</div>

					<div style="height: 15px;"></div>
				</div>
			</div>
		</section>

		<section style="display: none;" id="page-chooseaddress" class="__page__">
			<div class="page-header">
				<div class="header-back"></div>
				<p>选择地址</p>
				<div class="edit-btn">编辑</div>
				<div class="finish-btn">完成</div>
			</div>
			<div id="chooseaddress-iscroll">
				<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="chooseaddress-iscroll-layout">
					<div class="add-address">
						新建地址
						<div class="goto"></div>
					</div>
					<div id="chooseaddress-addresslist-layout" class="chooseaddress-addresslist-layout"></div>
				</div>
			</div>
		</section>

		<section style="display: none;" id="page-addaddress" class="__page__">
			<div class="page-header">
				<div class="header-back"></div>
				<p>新建地址</p>
			</div>

			<div id="addaddress-iscroll">
				<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="addaddress-iscroll-layout">
					<div style="height: 15px;"></div>
					<form id="addaddress_form">
						<div class="orderinfo-setting">
							<div class="order-info-item">
								<p>联系人</p>
								<div class="item-value">
									<input class="item-input" id="addaddress_name" name="addaddress_name" placeholder="如：张先生、王小姐">
								</div>
							</div>
							<div class="order-info-item">
								<p>电话</p>
								<div class="item-value">
									<input class="item-input" id="addaddress_phone" name="addaddress_phone" placeholder="如：18200000000" type="tel">
								</div>
							</div>
							<div class="order-info-item">
								<p>地址</p>
								<div class="item-value">
									<input class="item-input" id="addaddress_address" name="addaddress_address" placeholder="如：XX小区5号楼318">
								</div>
							</div>
						</div>
					</form>
					<div style="height: 15px;"></div>
					<div class="submit-add-address gopay active">保存</div>
				</div>
			</div>
		</section>
		<section style="display: none;" id="page-usercenter" class="__page__">
			<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="scroller5">
				<div class="usercenter-top">
					<div class="usercenter-top-userinfo">
						<div class="usercenter-top-userinfo-layout">
							<div style="position: absolute; left: 10px; top: 10px;">
								<img src="./../img/u-default.png" style="width: 40px; height: 40px; border-radius: 20px; -moz-border-radius: 20px; -webkit-border-radius: 20px;">
							</div>
							<div class="usercenter-username" style="left: 60px;">未设置</div>
							<div class="usercenter-customerid" style="left: 60px;">顾客ID：1177</div>
						</div>

						<div class="usercenter-top-arrow"></div>
					</div>

					<div class="usercenter-top-basicinfo">
						<div class="usercenter-top-member" id="member1">
							<p class="usercenter-top-num">0.0</p>
							<p>会员余额</p>
						</div>
						<div class="usercenter-top-verticalline-1"></div>

						<div class="usercenter-top-point" id="point1">
							<p class="usercenter-top-num">0</p>
							<p>积分</p>
						</div>
						<div class="usercenter-top-verticalline-2"></div>

						<div class="usercenter-top-coupon" id="usercenter-coupon1">
							<p class="usercenter-top-num">0</p>
							<p>优惠券</p>
						</div>
						<div class="usercenter-top-verticalline-3"></div>

						<div class="usercenter-top-unreadboxnum" id="mymail1">
							<p class="usercenter-top-num">0</p>
							<p>未读邮件</p>
						</div>
					</div>
				</div>

				<div style="height: 15px;"></div>

				<div class="commonlist-layout usercenter-list-layout">
					<div id="myorder" class="commonlist-item">
						<div class="usercenter-icon-myorder"></div>
						<p class="commonlist-itemname">我的订单</p>
						<div class="commonlist-arrow"></div>
					</div>
					<div id="mymail" class="commonlist-item usercenter-listitem-last">
						<div class="usercenter-icon-mybox"></div>
						<p class="commonlist-itemname">我的邮箱</p>
						<div class="commonlist-arrow"></div>
					</div>
				</div>

				<div style="height: 15px;"></div>

				<div class="commonlist-layout usercenter-list-layout">
					<div id="member" class="commonlist-item">
						<div class="usercenter-icon-member"></div>
						<p class="commonlist-itemname">会员中心</p>
						<div class="commonlist-arrow"></div>
					</div>

					<div id="point" class="commonlist-item">
						<div class="usercenter-icon-point"></div>
						<p class="commonlist-itemname">我的积分</p>
						<div class="commonlist-arrow"></div>
					</div>

					<div id="usercenter-coupon" class="commonlist-item">
						<div class="usercenter-icon-coupon"></div>
						<p class="commonlist-itemname">优惠券</p>
						<div class="commonlist-arrow"></div>
					</div>
					<!--
				<div id="usercenter-gift" class="commonlist-item usercenter-listitem-last">
					<div class="usercenter-icon-gift"></div>
					<p class="commonlist-itemname">我的奖品</p>
					<div class="commonlist-arrow"></div>
				</div>-->
				</div>

				<div style="height: 15px;"></div>
			</div>
		</section>

		<!-- 下面是各种弹窗 -->
		<div class="ui-mask"></div>
		<div id="showremind"></div>
		<div id="foodinfo" class="ui-dialog"></div>
		<div id="delete-dialog" class="ui-dialog"></div>
		<div id="getlocation-dialog" class="ui-dialog"></div>
		<div id="attention-dialog" class="attention-layout"></div>
		<div id="loader-dialog" class="loader-dialog"></div>
		<div id="phonecode-dialog" class="ui-dialog">
			<div class="phonecode-title-layout">
				<p class="phonecodename">手机号码验证</p>
			</div>
			<div class="closephonecode"></div>
			<div class="phonecodecontent">
				<p class="phonecode-attention">第一次下单需要验证您的手机号码</p>
				<div class="phonecode-layout">
					<input id="captcha" name="captcha" placeholder="请输入验证码" type="number">
					<div id="getcaptcha" class="active">发送验证码</div>
				</div>

				<div id="phonecode-submit" class="gopay active">提交订单</div>
			</div>
		</div>
	</div>
	
	<script id="secondtype" type="text/html">
<div class="foodsecondtype-item-layout">
<% for (var i = 0; i < data.length; i ++) { %>	
	<% if (i == 0) { %>
		<div id="foodsecondtype_<%= data[i].second_type_id %>" class="foodsecondtype selected"><%= data[i].name %></div>
	<% }else if (i == data.length - 1){ %>
		<div id="foodsecondtype_<%= data[i].second_type_id %>" class="foodsecondtype" style="margin-right: 6px;"><%= data[i].name %></div>
	<% }else{%>
		<div id="foodsecondtype_<%= data[i].second_type_id %>" class="foodsecondtype"><%= data[i].name %></div>
	<% } %>	
<% } %>
</div>
	</script>
	
	<script id="model_1_template" type="text/html">
<% for (var i = 0; i < data.length; i ++) { %>
<div id="fooditem_<%= data[i].id %>" class="fooditem second_type_id_<%= data[i].second_type_id %>" typeid="<%= data[i].typeid %>">
	<table class="foodtitle">
		<td class="foodcontent">
			<div id="foodname_<%= data[i].id %>" class="foodname"><%= data[i].name %>
				<span class="foodname_fix">
					<% if (data[i].label) { %>
						<div class="foodimage_label">
							<p class="foodlabel_name"><%= data[i].label %></p>
						</div>
					<% } %>
				</span>
			</div>
		</td>
	</table>
	<table class="foodselect">
		<td>
			<% if (data[i].stockvalid == 1 && data[i].stock == 0) { %>
				<div class="food_memo">已售完</div>
			<% }else if (showsales){ %>
				<div class="food_count">已售<%= data[i].ordered_count %>份</div>
			<% } %>
			
			<% if (data[i].is_nature == "1" && data[i].natureArray.length > 0){ %>
				<div id="foodprice_layout_<%= data[i].id %>" class="foodprice" style="display: none;">
			<% }else{ %>
				<div id="foodprice_layout_<%= data[i].id %>" class="foodprice">
			<% } %>
			<% if(data[i].is_nature == "1"){ %>
				￥<span id="foodprice_<%= data[i].id %>"><%= data[i].natureprice*1 %></span>
			<% }else{ %>
				￥<span id="foodprice_<%= data[i].id %>"><%= data[i].price*1 %></span>
			<% } %>
			<% if (unitshow) { %>
				<span class="foodunit">/<%= data[i].unit %></span>
			<% } %>
			<% if (data[i].has_formerprice == "1") { %>
				&nbsp;<span class="formerprice">￥<%= data[i].formerprice %></span>
			<% } %>
			</div>
		</td>
		<td id="foodnumop_<%= data[i].id %>" class="foodnumop">
			<% if (data[i].ordernum == 0) { %>
				<div id="big_plus_<%= data[i].id %>" class="big-plus icon-plus">
				</div>
			<% }else { %>
				<div id="small_delete_<%= data[i].id %>" class="op-small-delete icon-delete"></div>				
				<div id="op_foodnum_<%= data[i].id %>" class="op-foodnum"><%= data[i].ordernum %></div>
				<div id="small_plus_<%= data[i].id %>" class="op-small-plus icon-plus"></div>							
			<% } %>
		</td>
	</table>

	<div id="foodnature_<%= data[i].id %>" class="foodnature" is_nature="<%= data[i].is_nature %>" >
		<% for (var j = 0; j < data[i].natureArray.length; j  ++) { %>
			<% if(j > 0){ %>
				<div style="height: 5px;"></div>
			<% } %>
			<div id="foodnature_<%= data[i].id %>_<%= j %>" foodid="<%= data[i].id %>" naturenum="<%= j %>" class="foodnature-layout">
				<p class="foodnature-layout-text">第<%= j+1 %>份，价格：<span class="foodnature-layout-text-price">￥<span id="foodnature_layout_text_price_<%= data[i].id %>_<%= j %>"><%= data[i].natureArray[j].selectedNaturePrice %></span></span></p>
				<% var nature = data[i].nature; if (data[i].is_nature == "1"){var naturenum = 0;for(var naturename in nature){%>		
					<div class="foodnature-name <% if(naturenum == 0){%> foodnature-name-first <% } %>">
						<p><%= naturename %></p>
					</div>
					<div class="foodnature-value-layout naturenum_<%= naturenum %>">
						<% var naturevalue = nature[naturename]; for(var naturevalueitem in naturevalue){%>
							<% if(naturevalueitem != "defaultnaturevalue"){ %>
								<% if(naturevalueitem == data[i].natureArray[j][naturename].naturevaluename){%>
								<div class="foodnature-value active">
								<% }else{ %>
								<div class="foodnature-value">
								<% } %>
									<p price="<%= naturevalue[naturevalueitem] %>"><%= naturevalueitem %></p>
								</div>
							<% } %>
						<% } %>
					</div>
				<% naturenum++;}} %>
			</div>
		<% } %>
	</div>
</div>
<% } %>
	</script>
	
	<script id="model_2_template" type="text/html">
<% for (var i = 0; i < data.length; i ++) { %>
<div id="fooditem_<%= data[i].id %>" class="fooditem second_type_id_<%= data[i].second_type_id %>" typeid="<%= data[i].typeid %>">										
	<table width="100%">
		<td class="foodimage">
			<% if (!data[i].img) { %>
				<div id="foodimage_<%= data[i].id %>" src="nofoodimage" class="foodimage-default"></div>
			<% }else { %>
			<% var foodimage = data[i].img; var foodimageArray = foodimage.split(";"); %>	
				<img id="foodimage_<%= data[i].id %>" src="http://test.xiangmai.org<%= foodimageArray[0] %>">
			<% } %>

			<% if (data[i].label) { %>
				<div class="foodimage_label">
					<p class="foodlabel_name"><%= data[i].label %></p>
				</div>
			<% } %>
		</td>
		<td>
			<table class="foodtitle">
				<td class="foodcontent">
					<p id="foodname_<%= data[i].id %>" class="foodname" style="display: block;"><%= data[i].name %></p>
				</td>
			</table>
			<table class="foodselect">
				<td>
					<% if (data[i].stockvalid == 1 && data[i].stock == 0) { %>
						<div class="food_memo">已售完</div>
					<% }else if (showsales){ %>
						<div class="food_count">已售<%= data[i].ordered_count %>份</div>
					<% } %>
					
					<% if (data[i].is_nature == "1" && data[i].natureArray.length > 0){ %>
						<div id="foodprice_layout_<%= data[i].id %>" class="foodprice" style="display: none;">
					<% }else{ %>
						<div id="foodprice_layout_<%= data[i].id %>" class="foodprice">
					<% } %> 
					<% if(data[i].is_nature == "1"){ %>
						￥<span id="foodprice_<%= data[i].id %>"><%= data[i].natureprice*1 %></span>
					<% }else{ %>
						￥<span id="foodprice_<%= data[i].id %>"><%= data[i].price*1 %></span>
					<% } %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[i].unit %></span>
					<% } %>
					<% if (data[i].has_formerprice == "1") { %>
						&nbsp;<span class="formerprice">￥<%= data[i].formerprice %></span>
					<% } %>
					</div>
				</td>
				<td id="foodnumop_<%= data[i].id %>" class="foodnumop">
					<% if (data[i].ordernum == 0) { %>
						<div id="big_plus_<%= data[i].id %>" class="big-plus icon-plus">
						</div>
					<% }else { %>
						<div id="small_delete_<%= data[i].id %>" class="op-small-delete icon-delete"></div>				
						<div id="op_foodnum_<%= data[i].id %>" class="op-foodnum"><%= data[i].ordernum %></div>
						<div id="small_plus_<%= data[i].id %>" class="op-small-plus icon-plus"></div>							
					<% } %>
				</td>
			</table>
		</td>
	</table>

	<div id="foodnature_<%= data[i].id %>" class="foodnature" is_nature="<%= data[i].is_nature %>" >
		<% for (var j = 0; j < data[i].natureArray.length; j  ++) { %>
			<% if(j > 0){ %>
				<div style="height: 5px;"></div>
			<% } %>
			<div id="foodnature_<%= data[i].id %>_<%= j %>" foodid="<%= data[i].id %>" naturenum="<%= j %>" class="foodnature-layout">
				<p class="foodnature-layout-text">第<%= j+1 %>份，价格：<span class="foodnature-layout-text-price">￥<span id="foodnature_layout_text_price_<%= data[i].id %>_<%= j %>"><%= data[i].natureArray[j].selectedNaturePrice %></span></span></p>
				<% var nature = data[i].nature; if (data[i].is_nature == "1"){var naturenum = 0;for(var naturename in nature){%>		
					<div class="foodnature-name <% if(naturenum == 0){%> foodnature-name-first <% } %>">
						<p><%= naturename %></p>
					</div>
					<div class="foodnature-value-layout naturenum_<%= naturenum %>">
						<% var naturevalue = nature[naturename]; for(var naturevalueitem in naturevalue){%>
							<% if(naturevalueitem != "defaultnaturevalue"){ %>
								<% if(naturevalueitem == data[i].natureArray[j][naturename].naturevaluename){%>
								<div class="foodnature-value active">
								<% }else{ %>
								<div class="foodnature-value">
								<% } %>
									<p price="<%= naturevalue[naturevalueitem] %>"><%= naturevalueitem %></p>
								</div>
							<% } %>
						<% } %>
					</div>
				<% naturenum++;}} %>
			</div>
		<% } %>
	</div>
</div>
<% } %>
	</script>
	
	<script id="food_nature_template" type="text/html">
	<% for (var j = 0; j < data.natureArray.length; j  ++) { %>
		<% if(j > 0){ %>
			<div style="height: 5px;"></div>
		<% } %>
		<div id="foodnature_<%= data.id %>_<%= j %>" foodid="<%= data.id %>" naturenum="<%= j %>" class="foodnature-layout">
			<p class="foodnature-layout-text">第<%= j+1 %>份，价格：<span class="foodnature-layout-text-price">￥<span id="foodnature_layout_text_price_<%= data.id %>_<%= j %>"><%= data.natureArray[j].selectedNaturePrice %></span></span></p>
			<% var nature = data.nature; if (data.is_nature == "1"){var naturenum = 0;for(var naturename in nature){%>			
				<div class="foodnature-name <% if(naturenum == 0){%> foodnature-name-first <% } %>">
					<p><%= naturename %></p>
				</div>
				<div class="foodnature-value-layout naturenum_<%= naturenum %>">
					<% var naturevalue = nature[naturename]; for(var naturevalueitem in naturevalue){%>
						<% if(naturevalueitem != "defaultnaturevalue"){ %>
							<% if(naturevalueitem == data.natureArray[j][naturename].naturevaluename){%>
							<div class="foodnature-value active">
							<% }else{ %>
							<div class="foodnature-value">
							<% } %>
								<p price="<%= naturevalue[naturevalueitem] %>"><%= naturevalueitem %></p>
							</div>
						<% } %>
					<% } %>
				</div>
			<% naturenum++;}} %>
		</div>
	<% } %>
	</script>
	
	<script id="big_plus_template" type="text/html">
	<div id="big_plus_<%= foodid %>" class="big-plus icon-plus">
	</div>
	</script>
	
	<script id="foodnumop_layout_template" type="text/html">
	<div id="small_delete_<%= foodid %>" class="op-small-delete icon-delete"></div>				
	<div id="op_foodnum_<%= foodid %>" class="op-foodnum"><%= ordernum %></div>
	<div id="small_plus_<%= foodid %>" class="op-small-plus icon-plus"></div>
	</script>
	
	<script id="search_result_1" type="text/html">
<% for (var i = 0; i < data.length; i ++) { %>
<div id="searchresult_<%= data[i].id %>" class="fooditem" typeid="<%= data[i].typeid %>">										
	<table width="100%">
		<td>
			<table class="foodtitle">
				<td class="foodcontent">
					<p id="searchresult_foodname_<%= data[i].id %>" style="display: none;"><%= data[i].name %></p>
					<% var foodname = data[i].name; foodname = foodname.replace(keyword, '<span style="color: #e92516 ;">'+keyword+'</span>'); %>
					
					<div id="searchresult_foodname_show_<%= data[i].id %>" class="foodname"><%=#foodname%>
						<span class="foodname_fix">
							<% if (data[i].label) { %>
								<div class="foodimage_label">
									<p class="foodlabel_name"><%= data[i].label %></p>
								</div>
							<% } %>
						</span>
					</div>
				</td>
			</table>
			<table class="foodselect">
				<td>
					<% if (data[i].stockvalid == 1 && data[i].stock == 0) { %>
						<div class="food_memo">已售完</div>
					<% }else if (showsales){ %>
						<div class="food_count">已售<%= data[i].ordered_count %>份</div>
					<% } %>
					<div class="foodprice">
					<% if(data[i].is_nature == "1"){ %>
						￥<span id="searchresult_foodprice_<%= data[i].id %>"><%= data[i].natureprice*1 %></span>
					<% }else{ %>
						￥<span id="searchresult_foodprice_<%= data[i].id %>"><%= data[i].price*1 %></span>
					<% } %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[i].unit %></span>
					<% } %>
					<% if (data[i].has_formerprice == "1") { %>
						&nbsp;<span class="formerprice">￥<%= data[i].formerprice %></span>
					<% } %>
					</div>
				</td>
				<td id="searchresult_op_layout_<%= data[i].id %>" class="foodnumop">
					<% if (data[i].ordernum == 0) { %>
						<div id="searchresult_big_plus_<%= data[i].id %>" class="searchresult-bigplus big-plus icon-plus">
						</div>
					<% }else { %>
						<div id="searchresult_delete_<%= data[i].id %>" class="searchresult-delete op-small-delete icon-delete"></div>				
						<div id="searchresult_foodnum_<%= data[i].id %>" class="searchresult-foodnum op-foodnum"><%= data[i].ordernum %></div>
						<div id="searchresult_plus_<%= data[i].id %>" class="searchresult-plus op-small-plus icon-plus"></div>
					<% } %>
				</td>
				<td width="4px"></td>
			</table>
		</td>
	</table>

	<div id="searchresult_foodnature_<%= data[i].id %>" class="foodnature" is_nature="<%= data[i].is_nature %>" >
		<% for (var j = 0; j < data[i].natureArray.length; j  ++) { %>
			<% if(j > 0){ %>
				<div style="height: 5px;"></div>
			<% } %>
			<div id="searchresult_foodnature_<%= data[i].id %>_<%= j %>" foodid="<%= data[i].id %>" naturenum="<%= j %>" class="foodnature-layout">
				<p class="foodnature-layout-text">第<%= j+1 %>份，价格：<span class="foodnature-layout-text-price">￥<span id="searchresult_foodnature_layout_text_price_<%= data[i].id %>_<%= j %>"><%= data[i].natureArray[j].selectedNaturePrice %></span></span></p>
				<% var nature = data[i].nature; if (data[i].is_nature == "1"){var naturenum = 0;for(var naturename in nature){%>		
					<div class="foodnature-name <% if(naturenum == 0){%> foodnature-name-first <% } %>">
						<p><%= naturename %></p>
					</div>
					<div class="foodnature-value-layout naturenum_<%= naturenum %>">
						<% var naturevalue = nature[naturename]; for(var naturevalueitem in naturevalue){%>
							<% if(naturevalueitem != "defaultnaturevalue"){ %>
								<% if(naturevalueitem == data[i].natureArray[j][naturename].naturevaluename){%>
								<div class="foodnature-value active">
								<% }else{ %>
								<div class="foodnature-value">
								<% } %>
									<p price="<%= naturevalue[naturevalueitem] %>"><%= naturevalueitem %></p>
								</div>
							<% } %>
						<% } %>
					</div>
				<% naturenum++;}} %>
			</div>
		<% } %>
	</div>
</div>
<% } %>
	</script>
	
	<script id="search_result_2" type="text/html">
<% for (var i = 0; i < data.length; i ++) { %>
<div id="searchresult_<%= data[i].id %>" class="fooditem" typeid="<%= data[i].typeid %>">										
	<table width="100%">
		<td class="foodimage">
			<% if (!data[i].img) { %>
				<img id="searchresult_foodimage_<%= data[i].id %>" src="" class="foodimage-default">
			<% }else { %>
			<% var foodimage = data[i].img; var foodimageArray = foodimage.split(";"); %>	
				<img id="searchresult_foodimage_<%= data[i].id %>" src="http://test.xiangmai.org<%= foodimageArray[0] %>">
			<% } %>

			<% if (data[i].label) { %>
				<div class="foodimage_label">
					<p class="foodlabel_name"><%= data[i].label %></p>
				</div>
			<% } %>
		</td>
		<td>
			<table class="foodtitle">
				<td class="foodcontent">
					<p id="searchresult_foodname_<%= data[i].id %>" style="display: none;"><%= data[i].name %></p>
					<% var foodname = data[i].name; foodname = foodname.replace(keyword, '<span style="color: #e92516 ;">'+keyword+'</span>'); %>
					<p id="searchresult_foodname_show_<%= data[i].id %>" class="foodname"><%=#foodname%></p>
				</td>
			</table>
			<table class="foodselect">
				<td>
					<% if (data[i].stockvalid == 1 && data[i].stock == 0) { %>
						<div class="food_memo">已售完</div>
					<% }else if (showsales){ %>
						<div class="food_count">已售<%= data[i].ordered_count %>份</div>
					<% } %>
					<div class="foodprice">
					<% if(data[i].is_nature == "1"){ %>
						￥<span id="searchresult_foodprice_<%= data[i].id %>"><%= data[i].natureprice*1 %></span>
					<% }else{ %>
						￥<span id="searchresult_foodprice_<%= data[i].id %>"><%= data[i].price*1 %></span>
					<% } %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[i].unit %></span>
					<% } %>
					<% if (data[i].has_formerprice == "1") { %>
						&nbsp;<span class="formerprice">￥<%= data[i].formerprice %></span>
					<% } %>
					</div>
				</td>
				<td id="searchresult_op_layout_<%= data[i].id %>" class="foodnumop">
					<% if (data[i].ordernum == 0) { %>
						<div id="searchresult_big_plus_<%= data[i].id %>" class="searchresult-bigplus big-plus icon-plus">
						</div>
					<% }else { %>
						<div id="searchresult_delete_<%= data[i].id %>" class="searchresult-delete op-small-delete icon-delete"></div>				
						<div id="searchresult_foodnum_<%= data[i].id %>" class="searchresult-foodnum op-foodnum"><%= data[i].ordernum %></div>
						<div id="searchresult_plus_<%= data[i].id %>" class="searchresult-plus op-small-plus icon-plus"></div>
					<% } %>
				</td>
			</table>
		</td>
	</table>

	<div id="searchresult_foodnature_<%= data[i].id %>" class="foodnature" is_nature="<%= data[i].is_nature %>" >
		<% for (var j = 0; j < data[i].natureArray.length; j  ++) { %>
			<% if(j > 0){ %>
				<div style="height: 5px;"></div>
			<% } %>
			<div id="searchresult_foodnature_<%= data[i].id %>_<%= j %>" foodid="<%= data[i].id %>" naturenum="<%= j %>" class="foodnature-layout">
				<p class="foodnature-layout-text">第<%= j+1 %>份，价格：<span class="foodnature-layout-text-price">￥<span id="searchresult_foodnature_layout_text_price_<%= data[i].id %>_<%= j %>"><%= data[i].natureArray[j].selectedNaturePrice %></span></span></p>
				<% var nature = data[i].nature; if (data[i].is_nature == "1"){var naturenum = 0;for(var naturename in nature){%>		
					<div class="foodnature-name <% if(naturenum == 0){%> foodnature-name-first <% } %>">
						<p><%= naturename %></p>
					</div>
					<div class="foodnature-value-layout naturenum_<%= naturenum %>">
						<% var naturevalue = nature[naturename]; for(var naturevalueitem in naturevalue){%>
							<% if(naturevalueitem != "defaultnaturevalue"){ %>
								<% if(naturevalueitem == data[i].natureArray[j][naturename].naturevaluename){%>
								<div class="foodnature-value active">
								<% }else{ %>
								<div class="foodnature-value">
								<% } %>
									<p price="<%= naturevalue[naturevalueitem] %>"><%= naturevalueitem %></p>
								</div>
							<% } %>
						<% } %>
					</div>
				<% naturenum++;}} %>
			</div>
		<% } %>
	</div>
</div>
<% } %>
	</script>
	
	<script id="searchresult_food_nature_template" type="text/html">
	<% for (var j = 0; j < data.natureArray.length; j  ++) { %>
		<% if(j > 0){ %>
			<div style="height: 5px;"></div>
		<% } %>
		<div id="searchresult_foodnature_<%= data.id %>_<%= j %>" foodid="<%= data.id %>" naturenum="<%= j %>" class="foodnature-layout">
			<p class="foodnature-layout-text">第<%= j+1 %>份，价格：<span class="foodnature-layout-text-price">￥<span id="searchresult_foodnature_layout_text_price_<%= data.id %>_<%= j %>"><%= data.natureArray[j].selectedNaturePrice %></span></span></p>
			<% var nature = data.nature; if (data.is_nature == "1"){var naturenum = 0;for(var naturename in nature){%>			
				<div class="foodnature-name <% if(naturenum == 0){%> foodnature-name-first <% } %>">
					<p><%= naturename %></p>
				</div>
				<div class="foodnature-value-layout naturenum_<%= naturenum %>">
					<% var naturevalue = nature[naturename]; for(var naturevalueitem in naturevalue){%>
						<% if(naturevalueitem != "defaultnaturevalue"){ %>
							<% if(naturevalueitem == data.natureArray[j][naturename].naturevaluename){%>
							<div class="foodnature-value active">
							<% }else{ %>
							<div class="foodnature-value">
							<% } %>
								<p price="<%= naturevalue[naturevalueitem] %>"><%= naturevalueitem %></p>
							</div>
						<% } %>
					<% } %>
				</div>
			<% naturenum++;}} %>
		</div>
	<% } %>
	</script>
	
	<script id="searchresult_op_layout_bigplus_template" type="text/html">
	<div id="searchresult_big_plus_<%= foodid %>" class="searchresult-bigplus big-plus icon-plus">
	</div>
	</script>
	
	<script id="searchresult_op_layout_template" type="text/html">
	<div id="searchresult_delete_<%= foodid %>" class="searchresult-delete op-small-delete icon-delete"></div>				
	<div id="searchresult_foodnum_<%= foodid %>" class="searchresult-foodnum op-foodnum"><%= ordernum %></div>
	<div id="searchresult_plus_<%= foodid %>" class="searchresult-plus op-small-plus icon-plus"></div>
	</script>
	
	<script id="cartinfo_template_1" type="text/html">
	<% for(var foodidString in data) { %>
		<% if(data[foodidString].is_nature == "0") { %>
			<div id="cartitem_<%= data[foodidString].foodid %>" class="cartitem cart_model_1" foodid="<%= data[foodidString].foodid %>" is_nature="0">
		<% }else{ %>
			<div id="cartitem_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cartitem cart_model_1" foodid="<%= data[foodidString].foodid %>" is_nature="1" naturetype="<%= data[foodidString].naturetype %>">
		<% } %>

		<table style="width:100%; height:100%;">
			<td class="foodinfo-layout">
				<% if(data[foodidString].is_nature == "0"){ %>
					<p class="cartfoodname"><%= data[foodidString].foodname %></p>
					<p class="cartfoodprice">￥<%= data[foodidString].foodprice %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[foodidString].unit %></span>
					<% } %>
					</p>
				<% }else{ var nature = data[foodidString].nature; var foodnaturename = data[foodidString].foodname+'（'; var naturelength = 0; for(var naturename in nature){ naturelength++;} naturelength--; var naturenum = 1; for(var naturename in nature){ if(naturename != "selectedNaturePrice"){ foodnaturename += nature[naturename]["naturevaluename"]; if (naturenum < naturelength){foodnaturename += "、";} naturenum++;}} foodnaturename += '）'; %>
					<p class="cartfoodname"><%=# foodnaturename %></p>
					<p class="cartfoodprice">￥<%= data[foodidString].nature.selectedNaturePrice %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[foodidString].unit %></span>
					<% } %>
					</p>
				<% } %>

				<% if(data[foodidString].is_nature == "0") { %>
					<div id="cart_delete_<%= data[foodidString].foodid %>" class="cart-delete icon-delete"></div>				
					<div id="cart_foodnum_<%= data[foodidString].foodid %>" class="cart-foodnum"><%= data[foodidString].foodnum %></div>
					<div id="cart_plus_<%= data[foodidString].foodid %>" class="cart-plus icon-plus"></div>
				<% }else{ %>
					<div id="cart_delete_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cart-delete icon-delete"></div>				
					<div id="cart_foodnum_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cart-foodnum"><%= data[foodidString].foodnum %></div>
					<div id="cart_plus_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cart-plus icon-plus"></div>
				<% } %>
			</td>
		</table>
	</div>
	<% } %>
	</script>
	
	<script id="cartinfo_template_2" type="text/html">
	<% for(var foodidString in data) { %>
		<% if(data[foodidString].is_nature == "0") { %>
			<div id="cartitem_<%= data[foodidString].foodid %>" class="cartitem" foodid="<%= data[foodidString].foodid %>" is_nature="0">
		<% }else{ %>
			<div id="cartitem_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cartitem" foodid="<%= data[foodidString].foodid %>" is_nature="1" naturetype="<%= data[foodidString].naturetype %>">
		<% } %>
		
		<table style="width:100%; height:100%;">
			<td class="foodimage">
				<% if (!data[foodidString].foodimage || data[foodidString].foodimage == "nofoodimage") { %>
					<div class="foodimage-default"></div>
				<% }else { %>			
					<img src="<%= data[foodidString].foodimage %>">
				<% } %>
			</td>
			<td class="foodinfo-layout">
				<% if(data[foodidString].is_nature == "0"){ %>
					<p class="cartfoodname"><%= data[foodidString].foodname %></p>
					<p class="cartfoodprice">￥<%= data[foodidString].foodprice %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[foodidString].unit %></span>
					<% } %>
					</p>
				<% }else{ var nature = data[foodidString].nature; var foodnaturename = data[foodidString].foodname+'（'; var naturelength = 0; for(var naturename in nature){ naturelength++;} naturelength--; var naturenum = 1; for(var naturename in nature){ if(naturename != "selectedNaturePrice"){ foodnaturename += nature[naturename]["naturevaluename"]; if (naturenum < naturelength){foodnaturename += "、";} naturenum++;}} foodnaturename += '）'; %>
					<p class="cartfoodname"><%=# foodnaturename %></p>
					<p class="cartfoodprice">￥<%= data[foodidString].nature.selectedNaturePrice %>
					<% if (unitshow) { %>
						<span class="foodunit">/<%= data[foodidString].unit %></span>
					<% } %>
					</p>
				<% } %>

				<% if(data[foodidString].is_nature == "0") { %>
					<div id="cart_delete_<%= data[foodidString].foodid %>" class="cart-delete icon-delete"></div>				
					<div id="cart_foodnum_<%= data[foodidString].foodid %>" class="cart-foodnum"><%= data[foodidString].foodnum %></div>
					<div id="cart_plus_<%= data[foodidString].foodid %>" class="cart-plus icon-plus"></div>
				<% }else{ %>
					<div id="cart_delete_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cart-delete icon-delete"></div>				
					<div id="cart_foodnum_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cart-foodnum"><%= data[foodidString].foodnum %></div>
					<div id="cart_plus_<%= data[foodidString].foodid %>_<%= data[foodidString].naturetype %>" class="cart-plus icon-plus"></div>
				<% } %>
			</td>
		</table>
	</div>
	<% } %>
	</script>
	
	<script id="foodinfo_template" type="text/html">
	<div class="foodinfo-foodname-layout">
		<p id="foodinfo-foodname" class="foodname"><%= foodname %></p>
	</div>
	<div class="closefoodinfo">
	</div>
	<div id="foodinfocontent">
		<div id="foodinfocontent-layout">
			<% if (!foodimage) { %>
			<% }else { %>
				<% var foodimageArray = foodimage.split(";"); var content = ''; %>
				<% if(foodimageArray.length == 1){ content = '<img class="foodimage" src="http://test.xiangmai.org' + foodimageArray[0] + '">'; }else{content='<div id="foodslider" class="imageslider"><div class="imageslider-content">'; for (var i = 0; i < foodimageArray.length; i++){content = content + '<div class="figure">' + '<img src="http://test.xiangmai.org' + foodimageArray[i] + '">' + '<p class="figcaption"></p></div>'} content = content + '</div></div>';} %>	
				<%=# content %>
			<% } %>
			<p class="foodinfo_basicinfo">价格：<span id="foodinfoprice">￥<%= foodprice %></span>/<%= unit %>
			<% if (has_formerprice == "1") { %>
				&nbsp;<span class="formerprice">￥<%= formerprice %></span>
			<% } %>
			</p>
			<% if(openpoint) { %> 
			<p class="foodinfo_basicinfo">积分：<%= point %></p>
			<% } %>
			<% if (stockvalid == 1) { %>
				<p class="foodinfo_basicinfo">库存：<%= stock %></p>
			<% } %>
			<div class="foodinfo_des_layout">
				<p class="foodinfo_des_title">描述：</p>
				<div class="foodinfo_des">
					<p class="foodinfo_des_body"><%=# des %></p>
				</div>
			</div>
		</div>
	</div>
	</script>
	
	<script id="mergeorder_items" type="text/html">
	<% for(var mergeorder_id in data){ %>
		<div class="mergeorder-mergelist-item">
			<p class="mergeorder-mergeitem-name"><%= data[mergeorder_id].name %></p>
			<div mergeordreid="<%= mergeorder_id %>" class="mergeorder-mergeitem-join">加入</div>
			<p class="mergeorder-mergeitem-memo">拼单说明：<%= data[mergeorder_id].explain %></p>
			<% for (var key in data[mergeorder_id].content) { %>
				<p class="mergeorder-mergeitem-choice"><%= key %>：<%= data[mergeorder_id].content[key] %></p>
			<% } %>
			<p class="mergeorder-mergeitem-num">当前人数：<span class="mergeorder-mergeitem-num-value"><%= data[mergeorder_id].nownum %></span></p>
			<p class="mergeorder-mergeitem-time">截止时间：<%= data[mergeorder_id].limittime %></p>
		</div>
	<% } %>
	<div style="height: 50px;"></div>  
	</script>
	
	<script id="addresslist_items" type="text/html">
	<% for(var address_id in data){ %>
		<div class="address-addresslist-item <% if(data[address_id].isactive==1){ %>active<% } %>" address_id="<%= address_id %>">
			<p class="chooseaddress-addressitem-name">联系人：<span><%= data[address_id].name %></span></p>
			<p class="chooseaddress-addressitem-phone">电话：<span><%= data[address_id].phone %></span></p>
			<p class="chooseaddress-addressitem-choose-address">地址：<span><%= data[address_id].address %></span></p>
			<i></i>
			<em></em>
		</div>
	<% } %>
	</script>
</body>
</html>