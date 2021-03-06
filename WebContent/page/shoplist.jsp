<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>店铺列表</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">

<!-- 开发库 -->
<script src="./../../js/zepto.js"></script>
<script src="./../../js/template.js"></script>
<script src="./../../js/iscroll.js"></script>
<script src="./../../js/common.js"></script>

<link rel="stylesheet" type="text/css" href="./../../css/common.css">
<link rel="stylesheet" type="text/css" href="./../../css/list.css">
<style type="text/css">
	#wrapperbody {
		border-bottom: 1px solid #cacaca;
		height: auto;
		overflow: auto;
	}
	
	#allshop0_layout #wrapper {
		position: fixed;
		z-index: 1;
		top: 10px;
		height: 40px;
		left: 0px;
		right: 0px;
		overflow: hidden;
	}
	
	#shop-wrapper {
		position: absolute;
		z-index: 1;
		top: 53px;
		bottom: 0;
		left: 0px;
		right: 0px;
		overflow: hidden;
	}
</style>
</head>
<body>
	<script type="text/javascript">
		if (window.navigator.geolocation) {
			var options = {
				enableHighAccuracy : true,
			};
			window.navigator.geolocation.getCurrentPosition(handleSuccess,
					handleError, options);
		} else {
			alert("浏览器不支持html5来获取地理位置信息");
		}

		function handleSuccess(position) {
			// 获取到当前位置经纬度  本例中是chrome浏览器取到的是google地图中的经纬度
			var lng = position.coords.longitude;
			var lat = position.coords.latitude;

			window.location.href = "/app.php?c=show&a=allshop&customer_id=1177&wxusername=oQdbEtxriWh8315d38WAGXJvzJM4&admin_id=1&Location_X="
					+ lat + "&Location_Y=" + lng;

		}

		function handleError(error) {

		}
	</script>
	<script type="text/javascript">
		var lewaimai_customer_id = parseInt(1177);
		var admin_id = parseInt(1);
		var wxusername = 'oQdbEtxriWh8315d38WAGXJvzJM4';
		var myscroll;
		var shopscroll;
		$(function() {
			$("#shop_type").change(function() {
				if ($('#shop_type').val() == -1) {
					$(".lewaimai-layout").each(function() {
						$(this).show();
					});
				} else {
					$(".lewaimai-layout").each(function(i, val) {
						if ($(this).attr('typeid') == $('#shop_type').val()) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}

				shopscroll.scrollTo(0, 0, 200, 0);
				shopscroll.refresh();
			});
			$('.shoptype').on('tap', function() {
				var value = $(this).attr('value');
				if (value == -1) {
					$(".lewaimai-layout").each(function() {
						$(this).show();
					});
				} else {
					$(".lewaimai-layout").each(function(i, val) {
						if ($(this).attr('typeid') == value) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}
				$('.selected').removeClass('selected');
				$(this).addClass('selected');

				shopscroll.scrollTo(0, 0, 200, 0);
				shopscroll.refresh();
			});

			$('.lewaimai-layout')
					.on(
							'tap',
							function() {
								var shop_id = $(this).attr('id');
								window.location.href = '../index?c=show&a=god&admin_id='
										+ admin_id
										+ '&shop_id='
										+ shop_id
										+ '&wxusername='
										+ wxusername
										+ '&customerid='
										+ lewaimai_customer_id
										+ '&backallshopurltype=allshop#index';
							});

			$('#shopsearch').keyup(function() {
				var searchword = $('#shopsearch').val();
				if (searchword != '') {
					$('.search-delete').show();
				} else {
					$('.search-delete').hide();
				}
			});

			$('#search-btn').on('tap', function() {
				var searchword = $('#shopsearch').val();
				if (searchword != '') {
					$('.shopname').each(function(i, val) {
						var name = $(this).html();
						if (name.indexOf(searchword) != -1) {
							$(this).parents('.lewaimai-layout').show();
						} else {
							$(this).parents('.lewaimai-layout').hide();
						}
					});
				} else {
					$('.lewaimai-layout').show();
				}

				shopscroll.scrollTo(0, 0, 200, 0);
				shopscroll.refresh();
			});

			$('.search-delete').on('click', function() {
				$('#shopsearch').val('');

				$('.lewaimai-layout').show();

				$('.search-delete').hide();

				shopscroll.scrollTo(0, 0, 200, 0);
				shopscroll.refresh();
			});

			myscroll = new IScroll('#wrapper', {
				scrollX : true,
				scrollY : false,
				mouseWheel : true,
				disableMouse : true,
				disablePointer : true
			});
			shopscroll = new IScroll('#shop-wrapper', {
				disableMouse : true,
				disablePointer : true
			});

			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);
		});
	</script>
	
	<div id="allshop0_layout">
		<div id="wrapperbody">
			<div id="wrapper">
				<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="scroller">
					<div class="shoptype selected" style="margin-left: 0;" value="-1">全部</div>
					<div class="shoptype" value="9">海鲜</div>
					<div class="shoptype" value="10">欢迎</div>
					<div class="shoptype" value="12">测试</div>
					<div class="shoptype-last">&nbsp;</div>
				</div>
			</div>
			<div style="height: 50px;"></div>
			<div class="clear"></div>
		</div>

		<div>
			<div id="shop-wrapper">
				<div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);" id="shop-layout">
					<div style="height: 2px;"></div>

					<div id="63" class="lewaimai-layout allshop-layout shopbox" typeid="9" style="display: block">
						<table style="width: 100%;">
							<tbody>
								<tr>
									<td class="allshop-shopimg"><img src="./../../img/53fab033f191d.jpg" style="width: 100%;"></td>
									<td class="allshop-shopdetail">
										<h3 class="shopname">享买科技第一分店</h3>
										<p class="shopprice">起送价格：￥3（20元免外送费）</p>
										<p class="shopaddress">店铺描述：你好这里是测试店铺1</p>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="shopstatus">
							<p class="allshop-worktime" style="color: green;">
								<strong>营业中</strong>
							</p>
						</div>
					</div>

					<div id="64" class="lewaimai-layout allshop-layout shopbox" typeid="10" style="display: block">
						<table style="width: 100%;">
							<tbody>
								<tr>
									<td class="allshop-shopimg"><img src="./../../img/53fab033f191d.jpg" style="width: 100%;"></td>
									<td class="allshop-shopdetail">
										<h3 class="shopname">享买科技第二店铺</h3>
										<p class="shopprice">起送价格：￥10（10元免外送费）</p>
										<p class="shopaddress">店铺描述：本店铺开启首次下单短信验证。</p>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="shopstatus">
							<p class="allshop-worktime" style="color: green;">
								<strong>营业中</strong>
							</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
	<!-- 下面是各种弹窗 -->
	<div class="ui-mask"></div>
	<div id="attention-dialog" class="attention-layout"></div>
	<div id="loader-dialog" class="loader-dialog"></div>
	<div id="dialog" class="ui-dialog"></div>
</body>
</html>