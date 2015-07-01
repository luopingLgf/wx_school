function pageIndexBeforeShow() {
    $("#footer").show()
}
function pageIndexAfterShow() {
    $("#logoslider").swipeSlide({
        autoPlay: 2
    }),
    setTimeout(function() {
        indexIScroll.scrollTo(0, 0, 200, 0),
        indexIScroll.refresh()
    },
    200)
}
function pageOrderBeforeShow() {
    InitFoodOrdernum(),
    InitFoodtypeOrdernum(),
    UpdateTotalOrderInfo(),
    RefreshFoodlist(),
    $("#order-content-mask").hide(),
    $(".search-layout").hide(),
    $("#search-result").hide(),
    $("#order-content").show(),
    $("#footer").show()
}
function pageOrderAfterShow() {
    orderTypeIScroll.scrollTo(0, 0, 200, 0),
    orderTypeIScroll.refresh(),
    foodsecondtypescroll.scrollTo(0, 0, 200, 0),
    foodsecondtypescroll.refresh(),
    orderFoodIScroll.scrollTo(0, 0, 200, 0),
    orderFoodIScroll.refresh()
}
function pageCartBeforeShow() {
    UpdateCartlist(),
    UpdateCartPriceShow(),
    $("#footer").show()
}
function pageCartAfterShow() {
    cartIScroll.scrollTo(0, 0, 200, 0),
    cartIScroll.refresh()
}
function pagePayBeforeShow() {
    var a, b, c, d;
    UpdateBalanceInfo(),
    UpdateCartPriceShow(),
    document.getElementById("coupon") ? (a = $("#coupon option").not(function() {
        return ! this.selected
    }).attr("couponvalue"), b = ShouldPayPrice - parseFloat(a)) : b = ShouldPayPrice,
    b = Math.round(10 * parseFloat(b)) / 10,
    $("#LastPayPrice").html(b),
    mergeorder_id && (c = mergeorderlist[mergeorder_id].name, d = mergeorderlist[mergeorder_id].limittime, $(".mergeorder-name").html("拼单名称：" + c), $(".mergeorder-deadtime").html("截止时间：" + d), $(".mergeorder-attention").show(), $(".mergeorder-nomerge").hide()),
    $("#footer").hide()
}
function pagePayAfterShow() {
    payIScroll.scrollTo(0, 0, 200, 0),
    payIScroll.refresh()
}
function pageUsercenterBeforeShow() {
    $("#footer").show()
}
function pageUsercenterAfterShow() {
    usercenterIScroll.refresh()
}
function showIndex() {
    pageIndexBeforeShow(),
    $(".__page__").hide(),
    $("#page-index").show(),
    pageIndexAfterShow(),
    $(".row-item").removeClass("active"),
    $("#home").addClass("active")
}
function showOrder() {
    pageOrderBeforeShow(),
    $(".__page__").hide(),
    $("#page-order").show(),
    pageOrderAfterShow(),
    $(".row-item").removeClass("active"),
    $("#order").addClass("active")
}
function showCart() {
    pageCartBeforeShow(),
    $(".__page__").hide(),
    $("#page-cart").show(),
    pageCartAfterShow(),
    $(".row-item").removeClass("active"),
    $("#cart").addClass("active")
}
function showPay() {
    pagePayBeforeShow(),
    $(".__page__").hide(),
    $("#page-pay").show(),
    pagePayAfterShow()
}
function showUsercenter() {
    pageUsercenterBeforeShow(),
    $(".__page__").hide(),
    $("#page-usercenter").show(),
    pageUsercenterAfterShow(),
    $(".row-item").removeClass("active"),
    $("#usercenter").addClass("active")
}
function showMergepage() {
    $(".__page__").hide(),
    $("#page-mergelist").show(),
    mergeIScroll.refresh(),
    $("#footer").hide()
}
function showAddresspage() {
    $(".__page__").hide(),
    $("#page-chooseaddress").show(),
    addressIScroll.refresh(),
    $("#footer").hide()
}
function showCartEmpty() {
    $(".__page__").hide(),
    $("#page-cartempty").show(),
    $(".row-item").removeClass("active"),
    $("#cart").addClass("active"),
    $("#footer").show()
}
function showOrderSuccess() {
    $(".__page__").hide(),
    $("#page-ordersuccess").show(),
    $("#footer").hide()
}
function showNoWeixinOrder() {
    $(".__page__").hide(),
    $("#page-noweixinorder").show(),
    $(".row-item").removeClass("active"),
    $("#cart").addClass("active"),
    $("#footer").show()
}
function showShopClose() {
    $(".__page__").hide(),
    $("#page-shopclose").show(),
    $(".row-item").removeClass("active"),
    $("#cart").addClass("active"),
    $("#footer").show()
}
function showNoWorktime() {
    $(".__page__").hide(),
    $("#page-noworktime").show(),
    $(".row-item").removeClass("active"),
    $("#cart").addClass("active"),
    $("#footer").show()
}
function showMergelist() {
    showLoader("正在获取该店铺拼单信息..."),
    $.ajax({
        type: "POST",
        url: "/index.php?r=lewaimaimergeorder/getmergelist&adminId=" + admin_id + "&shopId=" + shop_id,
        dataType: "json",
        cache: !1,
        success: function(a) {
            var b, c;
            hideLoader(),
            mergeorderlist = a,
            b = JSON.parse("{}"),
            b.data = mergeorderlist,
            c = template("mergeorder_items", b),
            $("#mergeorder-mergelist-layout").html(c),
            location.hash = "merge"
        },
        error: function() {
            hideLoader(),
            ShowAttention("获取店铺拼单信息失败！")
        }
    })
}
function showChooseaddress() {
    var b, a = JSON.parse("{}");
    a.data = addresslist,
    b = template("addresslist_items", a),
    $("#chooseaddress-addresslist-layout").html(b),
    $("#page-chooseaddress .finish-btn").hide(),
    $("#page-chooseaddress .edit-btn").show(),
    showAddresspage()
}
function showAddmerge() {
    $(".__page__").hide(),
    $("#page-addmerge").show(),
    addmergeIScroll.refresh()
}
function showAddaddress() {
    $(".__page__").hide(),
    $("#page-addaddress").show(),
    addmergeIScroll.refresh()
}
function updatePage() {
    var b, a = location.hash.replace("#", "");
    if ("" === a || "index" == a) showIndex();
    else if ("order" == a) showOrder();
    else if ("cart" == a) {
        if ("closeshop" == workstatus) return showShopClose(),
        void 0;
        if ("noordervalid" == workstatus) return showNoWeixinOrder(),
        void 0;
        if ("noworktime" == workstatus) return showNoWorktime(),
        void 0;
        if (b = JSON.parse(storage.getItem(shopcartname)), 0 == getJsonLength(b)) return showCartEmpty(),
        void 0;
        showCart()
    } else if ("pay" == a) {
        if (b = JSON.parse(storage.getItem(shopcartname)), 0 == getJsonLength(b)) return showCartEmpty(),
        void 0;
        showPay()
    } else "merge" == a ? showMergepage() : "usercenter" == a ? showUsercenter() : showIndex()
}
function zancomment(a, b) {
    var e, c = $(b).parent(".zan").attr("tage"),
    d = $(b).parent(".zan").attr("canzan");
    return "yes" != d ? (ShowAttention("要在该店铺有成功的订单，才能赞或踩"), !1) : (e = $(b).parent(".zan").attr("commentid"), "zc" == c && ($(b).parent(".zan").attr("tage", "jxz"), $.ajax({
        type: "GET",
        url: "index.php?r=lewaimaicomment/zan",
        dataType: "html",
        data: "adminId=" + admin_id + "&shopId=" + shop_id + "&commentid=" + e + "&type=" + a,
        cache: !1,
        error: function(a, b, c) {
            return ShowAttention(c),
            !1
        },
        success: function(c) {
            if ("success" == c) {
                "zan" == a ? ($(b).addClass("yizan"), $(b).removeClass("weizan")) : "cai" == a && ($(b).addClass("yicai"), $(b).removeClass("weicai"));
                var d = $(b).children("span").html();
                $(b).children("span").html(parseInt(d) + 1)
            } else ShowAttention("提交错误");
            return ! 1
        }
    })), void 0)
}
function UpdateStorageFoodInfo() {
    var typeid, i, is_nature, nature, natureprice, naturename, naturevalue, shopcartJson, foodidString, isFound, foodimage, foodimageArray, shopcartNatureArray, foodtypelistNature, defaultNature, natureplus, k, j, shopcartNature, selectedNaturePrice;
    for (typeid in foodtypelistJson) for (i = 0; i < foodtypelistJson[typeid].length; i++) if (is_nature = foodtypelistJson[typeid][i].is_nature, nature = foodtypelistJson[typeid][i].nature, "0" != is_nature) {
        natureprice = 0;
        for (naturename in nature) for (naturevalue in nature[naturename]) {
            nature[naturename].defaultnaturevalue = naturevalue,
            natureprice += parseFloat(nature[naturename][naturevalue]);
            break
        }
        foodtypelistJson[typeid][i].nature = nature,
        foodtypelistJson[typeid][i].natureprice = (10 * parseFloat(foodtypelistJson[typeid][i].price) + 10 * natureprice) / 10
    }
    shopcartJson = JSON.parse(storage.getItem(shopcartname));
    for (foodidString in shopcartJson) if (foodid = shopcartJson[foodidString].foodid, typeid = shopcartJson[foodidString].typeid, isFound = !1, foodtypelistJson.hasOwnProperty(typeid)) {
        for (i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
            if (isFound = !0, shopcartJson[foodidString].foodname = foodtypelistJson[typeid][i].name, shopcartJson[foodidString].unit = foodtypelistJson[typeid][i].unit, shopcartJson[foodidString].member_price_used = foodtypelistJson[typeid][i].member_price_used, shopcartJson[foodidString].member_price = foodtypelistJson[typeid][i].member_price, null != foodtypelistJson[typeid][i].img && "" != foodtypelistJson[typeid][i].img ? (foodimage = foodtypelistJson[typeid][i].img, foodimageArray = foodimage.split(";"), shopcartJson[foodidString].foodimage = "http://test.xiangmai.org" + foodimageArray[0]) : shopcartJson[foodidString].foodimage = "nofoodimage", shopcartJson[foodidString].foodprice = parseFloat(foodtypelistJson[typeid][i].price), shopcartJson[foodidString].is_nature = foodtypelistJson[typeid][i].is_nature, 0 == shopcartJson[foodidString].is_nature) shopcartJson[foodidString].natureArray = JSON.parse("[]");
            else {
                if (shopcartJson[foodidString].hasOwnProperty("natureArray") || (shopcartJson[foodidString].natureArray = JSON.parse("[]")), shopcartNatureArray = shopcartJson[foodidString].natureArray, foodtypelistNature = foodtypelistJson[typeid][i].nature, shopcartNatureArray.length < shopcartJson[foodidString].foodnum) {
                    defaultNature = JSON.parse("{}");
                    for (naturename in foodtypelistNature) for (naturevalue in foodtypelistNature[naturename]) {
                        defaultNature[naturename] = JSON.parse("{}"),
                        defaultNature[naturename].naturevaluename = naturevalue,
                        defaultNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][naturevalue]);
                        break
                    }
                    for (defaultNature.selectedNaturePrice = foodtypelistJson[typeid][i].natureprice, natureplus = shopcartJson[foodidString].foodnum - shopcartNatureArray.length, k = 0; natureplus > k; k++) shopcartNatureArray.push(defaultNature)
                }
                for (j = 0; j < shopcartNatureArray.length; j++) {
                    shopcartNature = shopcartNatureArray[j],
                    selectedNaturePrice = 0;
                    for (naturename in foodtypelistNature) {
                        if (shopcartNature.hasOwnProperty(naturename)) if (foodtypelistNature[naturename].hasOwnProperty(shopcartNature[naturename].naturevaluename)) shopcartNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][shopcartNature[naturename].naturevaluename]);
                        else for (naturevalue in foodtypelistNature[naturename]) {
                            shopcartNature[naturename].naturevaluename = naturevalue,
                            shopcartNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][naturevalue]);
                            break
                        } else for (naturevalue in foodtypelistNature[naturename]) {
                            shopcartNature[naturename] = JSON.parse("{}"),
                            shopcartNature[naturename].naturevaluename = naturevalue,
                            shopcartNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][naturevalue]);
                            break
                        }
                        selectedNaturePrice += shopcartNature[naturename].naturevalueprice
                    }
                    for (naturename in shopcartNature) foodtypelistNature.hasOwnProperty(naturename) || eval("delete shopcartNature." + naturename);
                    shopcartNature.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[typeid][i].price) + 10 * selectedNaturePrice) / 10,
                    shopcartNatureArray[j] = shopcartNature
                }
                shopcartJson[foodidString].natureArray = shopcartNatureArray,
                foodtypelistJson[typeid][i].natureArray = shopcartNatureArray
            }
            break
        }
        if (0 == isFound) {
            for (typeid in foodtypelistJson) {
                for (i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
                    if (isFound = !0, shopcartJson[foodidString].foodname = foodtypelistJson[typeid][i].name, shopcartJson[foodidString].unit = foodtypelistJson[typeid][i].unit, shopcartJson[foodidString].member_price_used = foodtypelistJson[typeid][i].member_price_used, shopcartJson[foodidString].member_price = foodtypelistJson[typeid][i].member_price, null != foodtypelistJson[typeid][i].img && "" != foodtypelistJson[typeid][i].img ? (foodimage = foodtypelistJson[typeid][i].img, foodimageArray = foodimage.split(";"), shopcartJson[foodidString].foodimage = "http://test.xiangmai.org" + foodimageArray[0]) : shopcartJson[foodidString].foodimage = "nofoodimage", shopcartJson[foodidString].foodprice = parseFloat(foodtypelistJson[typeid][i].price), shopcartJson[foodidString].typeid = typeid, shopcartJson[foodidString].is_nature = foodtypelistJson[typeid][i].is_nature, 0 == shopcartJson[foodidString].is_nature) shopcartJson[foodidString].natureArray = JSON.parse("[]");
                    else {
                        if (shopcartJson[foodidString].hasOwnProperty("natureArray") || (shopcartJson[foodidString].natureArray = JSON.parse("[]")), shopcartNatureArray = shopcartJson[foodidString].natureArray, foodtypelistNature = foodtypelistJson[typeid][i].nature, shopcartNatureArray.length < shopcartJson[foodidString].foodnum) {
                            defaultNature = JSON.parse("{}");
                            for (naturename in foodtypelistNature) for (naturevalue in foodtypelistNature[naturename]) {
                                defaultNature[naturename] = JSON.parse("{}"),
                                defaultNature[naturename].naturevaluename = naturevalue,
                                defaultNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][naturevalue]);
                                break
                            }
                            for (defaultNature.selectedNaturePrice = foodtypelistJson[typeid][i].natureprice, natureplus = shopcartJson[foodidString].foodnum - shopcartNatureArray.length, k = 0; natureplus > k; k++) shopcartNatureArray.push(defaultNature)
                        }
                        for (j = 0; j < shopcartNatureArray.length; j++) {
                            shopcartNature = shopcartNatureArray[j],
                            selectedNaturePrice = 0;
                            for (naturename in foodtypelistNature) {
                                if (shopcartNature.hasOwnProperty(naturename)) if (foodtypelistNature[naturename].hasOwnProperty(shopcartNature[naturename].naturevaluename)) shopcartNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][shopcartNature[naturename].naturevaluename]);
                                else for (naturevalue in foodtypelistNature[naturename]) {
                                    shopcartNature[naturename].naturevaluename = naturevalue,
                                    shopcartNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][naturevalue]);
                                    break
                                } else for (naturevalue in foodtypelistNature[naturename]) {
                                    shopcartNature[naturename] = JSON.parse("{}"),
                                    shopcartNature[naturename].naturevaluename = naturevalue,
                                    shopcartNature[naturename].naturevalueprice = parseFloat(foodtypelistNature[naturename][naturevalue]);
                                    break
                                }
                                selectedNaturePrice += shopcartNature[naturename].naturevalueprice
                            }
                            for (naturename in shopcartNature) foodtypelistNature.hasOwnProperty(naturename) || eval("delete shopcartNature." + naturename);
                            shopcartNature.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[typeid][i].price) + 10 * selectedNaturePrice) / 10,
                            shopcartNatureArray[j] = shopcartNature
                        }
                        shopcartJson[foodidString].natureArray = shopcartNatureArray,
                        foodtypelistJson[typeid][i].natureArray = shopcartNatureArray
                    }
                    break
                }
                if (1 == isFound) break
            }
            0 == isFound && eval("delete shopcartJson." + foodidString)
        }
    } else eval("delete shopcartJson." + foodidString);
    storage.setItem(shopcartname, JSON.stringify(shopcartJson))
}
function InitFoodOrdernum() {
    var b, c, a = JSON.parse(storage.getItem(shopcartname));
    for (b in a) for (foodid = a[b].foodid, foodnum = a[b].foodnum, typeid = a[b].typeid, c = 0; c < foodtypelistJson[typeid].length; c++) if (foodtypelistJson[typeid][c].id == foodid) {
        foodtypelistJson[typeid][c].ordernum = foodnum;
        break
    }
}
function InitFoodtypeOrdernum() {
    var b, c, a = JSON.parse(storage.getItem(shopcartname));
    for (b in foodtypeOrdernumJson) foodtypeOrdernumJson[b] = 0;
    for (c in a) foodid = a[c].foodid,
    foodnum = a[c].foodnum,
    b = a[c].typeid,
    foodtypeOrdernumJson[b] = parseInt(foodtypeOrdernumJson[b]) + foodnum;
    RefreshFoodtypeOrdernum()
}
function RefreshFoodtypeOrdernum() {
    var a, b;
    for (a in foodtypeOrdernumJson) b = document.getElementById("foodtype-ordernumlayout-" + a),
    b && (foodtypeOrdernumJson[a] > 0 ? (b.style.display = "block", $("#foodtypeordernum_" + a).html(foodtypeOrdernumJson[a])) : (b.style.display = "none", $("#foodtypeordernum_" + a).html(0)))
}
function UpdateTotalOrderInfo() {
    var d, e, f, a = 0,
    b = 0,
    c = JSON.parse(storage.getItem(shopcartname));
    for (d in c) if (foodprice = parseFloat(c[d].foodprice), foodnum = c[d].foodnum, a += parseInt(foodnum), "1" == c[d].is_nature) for (e = c[d].natureArray, f = 0; f < e.length; f++) b += e[f].selectedNaturePrice;
    else b += foodprice * foodnum;
    b = Math.round(10 * parseFloat(b)) / 10,
    $("#totalordernum").html(a),
    $("#totalprice").html(b)
}
function RefreshFoodlist_() {
    var a, b, c, d; - 1 != selectTypeId && (0 == foodsecondtypelistJson[selectTypeId].length ? ($("#foodlist").removeClass("secondtype"), $("#foodsecondtype-layout").hide()) : ($("#foodlist").addClass("secondtype"), $("#foodsecondtype-layout").show()), a = JSON.parse("{}"), a.data = foodsecondtypelistJson[selectTypeId], b = template("secondtype", a), $("#foodsecondtype-scroller").html(b), foodsecondtypescroll.scrollTo(0, 0, 200, IScroll.utils.ease.elastic), foodsecondtypescroll.refresh(), c = JSON.parse("{}"), c.data = foodtypelistJson[selectTypeId], c.unitshow = unitshow, c.showsales = showsales, 1 == showtype ? (d = template("model_1_template", c), document.getElementById("model_1_foodlist").innerHTML = d) : (d = template("model_2_template", c), document.getElementById("model_2_foodlist").innerHTML = d), foodsecondtypelistJson[selectTypeId].length > 0 && ($(".fooditem").hide(), $(".fooditem.second_type_id_" + foodsecondtypelistJson[selectTypeId][0].second_type_id).show()), orderFoodIScroll.scrollTo(0, 0, 500, IScroll.utils.ease.elastic), orderFoodIScroll.refresh())
}

function RefreshFoodlist(){
    var a, b, c, d;
    if(selectTypeId != -1){
        0 == foodsecondtypelistJson[selectTypeId].length ?
            ($("#foodlist").removeClass("secondtype"), $("#foodsecondtype-layout").hide()) :
            ($("#foodlist").addClass("secondtype"), $("#foodsecondtype-layout").show());
        a = JSON.parse("{}");
        a.data = foodsecondtypelistJson[selectTypeId];
        b = template("secondtype", a);
        $("#foodsecondtype-scroller").html(b);
        foodsecondtypescroll.scrollTo(0, 0, 200, IScroll.utils.ease.elastic);
        foodsecondtypescroll.refresh();
        c = JSON.parse("{}");
        c.data = foodtypelistJson[selectTypeId];
        c.unitshow = unitshow;
        c.showsales = showsales;
        1 == showtype ? (d = template("model_1_template", c), document.getElementById("model_1_foodlist").innerHTML = d) :
            (d = template("model_2_template", c), document.getElementById("model_2_foodlist").innerHTML = d);
        if(foodsecondtypelistJson[selectTypeId].length > 0){
            $(".fooditem").hide();
            $(".fooditem.second_type_id_" + foodsecondtypelistJson[selectTypeId][0].second_type_id).show();
            orderFoodIScroll.scrollTo(0, 0, 500, IScroll.utils.ease.elastic), orderFoodIScroll.refresh();
        }
    }
}

function AddFoodtypeOrdernum(a) {
    foodtypeOrdernumJson[a] || (foodtypeOrdernumJson[a] = 0),
    foodtypeOrdernumJson[a] += 1;
    var b = document.getElementById("foodtype-ordernumlayout-" + a);
    b && (foodtypeOrdernumJson[a] > 0 ? (b.style.display = "block", $("#foodtypeordernum_" + a).html(foodtypeOrdernumJson[a])) : (b.style.display = "none", $("#foodtypeordernum_" + a).html(0)))
}
function DeleteFoodtypeOrdernum(a) {
    if (foodtypeOrdernumJson[a]) {
        foodtypeOrdernumJson[a] -= 1;
        var b = document.getElementById("foodtype-ordernumlayout-" + a);
        b && (foodtypeOrdernumJson[a] > 0 ? (b.style.display = "block", $("#foodtypeordernum_" + a).html(foodtypeOrdernumJson[a])) : (b.style.display = "none", $("#foodtypeordernum_" + a).html(0)))
    }
}
function changeFoodOrdernum(a, b, c) {
    var e, f, d = document.getElementById("foodnumop_" + a);
    d && (e = JSON.parse("{}"), e.foodid = a, e.ordernum = c, 0 == b && c > 0 ? (f = template("foodnumop_layout_template", e), d.innerHTML = f) : b > 0 && c > 0 ? document.getElementById("op_foodnum_" + a).innerHTML = c: b > 0 && 0 == c && (f = template("big_plus_template", e), d.innerHTML = f))
}
function changeSearchresultOrdernum(a, b, c) {
    var e, f, d = document.getElementById("searchresult_op_layout_" + a);
    d && (e = JSON.parse("{}"), e.foodid = a, e.ordernum = c, 0 == b && c > 0 ? (f = template("searchresult_op_layout_template", e), d.innerHTML = f) : b > 0 && c > 0 ? document.getElementById("searchresult_foodnum_" + a).innerHTML = c: b > 0 && 0 == c && (f = template("searchresult_op_layout_bigplus_template", e), d.innerHTML = f))
}
function search_big_plus_click() {
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, a = $(this).attr("id"),
    b = a.substr(22),
    c = document.getElementById("searchresult_" + b);
    if (c && (d = document.getElementById("searchresult_foodnature_" + b))) {
        for (e = parseInt($("#searchresult_" + b).attr("typeid")), f = 0, g = 0; g < foodtypelistJson[e].length; g++) if (foodtypelistJson[e][g].id == b) {
            if (parseInt(foodtypelistJson[e][g].memberlimit) && (!ismember || memberFreeze)) return ShowAttention("该商品只有会员才能选购"),
            void 0;
            if (parseInt(foodtypelistJson[e][g].stockvalid) && foodtypelistJson[e][g].stock < parseInt(foodtypelistJson[e][g].ordernum) + 1) return ShowAttention("该商品库存不足！"),
            void 0;
            if (parseInt(foodtypelistJson[e][g].is_limitfood)) {
                if ("no" == foodtypelistJson[e][g].datetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if ("no" == foodtypelistJson[e][g].timetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if (parseInt(foodtypelistJson[e][g].ordernum) + parseInt(foodtypelistJson[e][g].dianfoodnum) >= parseInt(foodtypelistJson[e][g].limitfoodnum)) return ShowAttention("已达到该商品的购买数量上限！"),
                void 0
            }
            foodtypelistJson[e][g].ordernum = parseInt(foodtypelistJson[e][g].ordernum) + 1,
            f = g;
            break
        }
        if (h = "foodid_" + b, i = JSON.parse(storage.getItem(shopcartname)), i[h] || (i[h] = JSON.parse("{}")), i[h].foodid = b, i[h].foodnum = 1, i[h].typeid = e, i[h].foodname = foodtypelistJson[e][f].name, i[h].foodprice = parseFloat(foodtypelistJson[e][f].price), i[h].unit = foodtypelistJson[e][f].unit, i[h].member_price_used = foodtypelistJson[e][f].member_price_used, i[h].member_price = foodtypelistJson[e][f].member_price, j = JSON.parse("[]"), k = $("#searchresult_foodnature_" + b).attr("is_nature"), "1" == k) {
            l = foodtypelistJson[e][f].nature,
            m = JSON.parse("{}"),
            n = 0;
            for (o in l) p = l[o].defaultnaturevalue,
            q = l[o][p],
            m[o] = JSON.parse("{}"),
            m[o]["naturevaluename"] = p,
            m[o]["naturevalueprice"] = parseFloat(q),
            n += q;
            m.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[e][f].price) + 10 * n) / 10,
            j.push(m),
            foodtypelistJson[e][f].natureArray = j,
            r = JSON.parse("{}"),
            r.data = foodtypelistJson[e][f],
            s = template("searchresult_food_nature_template", r),
            $("#searchresult_foodnature_" + b).html(s),
            $("#searchresult_foodnature_" + b).show(),
            searchresultIScroll.refresh()
        }
        if (i[h].is_nature = k, i[h].natureArray = j, 2 == showtype) {
            if (t = document.getElementById("searchresult_foodimage_" + b), !t) return;
            u = $("#searchresult_foodimage_" + b).attr("src"),
            i[h].foodimage = u
        }
        changeSearchresultOrdernum(b, 0, 1),
        AddFoodtypeOrdernum(e),
        storage.setItem(shopcartname, JSON.stringify(i))
    }
}
function search_small_plus_click() {
    var typeid, foodtypelistnum, i, foodidString, shopcartJson, oldOrdernum, is_nature, nature, curNatureJson, selectedNaturePrice, naturename, defaultNaturevalue, defaultNatureprice, natureShowJson, html, id = $(this).attr("id"),
    foodid = id.substr(18),
    fooditemobj = document.getElementById("searchresult_" + foodid);
    if (fooditemobj) {
        for (typeid = $("#searchresult_" + foodid).attr("typeid"), foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
            if (parseInt(foodtypelistJson[typeid][i].memberlimit) && (!ismember || memberFreeze)) return ShowAttention("该商品只有会员才能选购"),
            void 0;
            if (parseInt(foodtypelistJson[typeid][i].stockvalid) && foodtypelistJson[typeid][i].stock < parseInt(foodtypelistJson[typeid][i].ordernum) + 1) return ShowAttention("该商品库存不足！"),
            void 0;
            if (parseInt(foodtypelistJson[typeid][i].is_limitfood)) {
                if ("no" == foodtypelistJson[typeid][i].datetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if ("no" == foodtypelistJson[typeid][i].timetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if (parseInt(foodtypelistJson[typeid][i].ordernum) + parseInt(foodtypelistJson[typeid][i].dianfoodnum) >= parseInt(foodtypelistJson[typeid][i].limitfoodnum)) return ShowAttention("已达到该商品的购买数量上限！"),
                void 0
            }
            foodtypelistJson[typeid][i].ordernum = parseInt(foodtypelistJson[typeid][i].ordernum) + 1,
            foodtypelistnum = i;
            break
        }
        if (foodidString = "foodid_" + foodid, shopcartJson = JSON.parse(storage.getItem(shopcartname)), !shopcartJson[foodidString]) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeFoodOrdernum(foodid, 1, 0),
        void 0;
        if (!shopcartJson[foodidString].foodnum) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeSearchresultOrdernum(foodid, 1, 0),
        void 0;
        if (! (shopcartJson[foodidString].foodnum >= 99)) {
            if (oldOrdernum = shopcartJson[foodidString].foodnum, shopcartJson[foodidString].foodnum += 1, is_nature = $("#searchresult_foodnature_" + foodid).attr("is_nature"), "1" == is_nature) {
                nature = foodtypelistJson[typeid][foodtypelistnum].nature,
                curNatureJson = JSON.parse("{}"),
                selectedNaturePrice = 0;
                for (naturename in nature) defaultNaturevalue = nature[naturename].defaultnaturevalue,
                defaultNatureprice = nature[naturename][defaultNaturevalue],
                curNatureJson[naturename] = JSON.parse("{}"),
                curNatureJson[naturename]["naturevaluename"] = defaultNaturevalue,
                curNatureJson[naturename]["naturevalueprice"] = parseFloat(defaultNatureprice),
                selectedNaturePrice += defaultNatureprice;
                curNatureJson.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[typeid][foodtypelistnum].price) + 10 * selectedNaturePrice) / 10,
                foodtypelistJson[typeid][foodtypelistnum].natureArray.push(curNatureJson),
                natureShowJson = JSON.parse("{}"),
                natureShowJson.data = foodtypelistJson[typeid][foodtypelistnum],
                html = template("searchresult_food_nature_template", natureShowJson),
                $("#searchresult_foodnature_" + foodid).html(html),
                $("#searchresult_foodnature_" + foodid).show(),
                searchresultIScroll.refresh()
            }
            shopcartJson[foodidString].is_nature = is_nature,
            shopcartJson[foodidString].natureArray = foodtypelistJson[typeid][foodtypelistnum].natureArray,
            changeSearchresultOrdernum(foodid, oldOrdernum, shopcartJson[foodidString].foodnum),
            AddFoodtypeOrdernum(typeid),
            storage.setItem(shopcartname, JSON.stringify(shopcartJson))
        }
    }
}
function search_small_delete_click() {
    var typeid, foodtypelistnum, i, foodidString, shopcartJson, oldOrdernum, is_nature, natureShowJson, html, id = $(this).attr("id"),
    foodid = id.substr(20),
    fooditemobj = document.getElementById("searchresult_" + foodid);
    if (fooditemobj) {
        for (typeid = $("#searchresult_" + foodid).attr("typeid"), foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
            foodtypelistJson[typeid][i].ordernum = parseInt(foodtypelistJson[typeid][i].ordernum) - 1,
            foodtypelistnum = i;
            break
        }
        if (foodidString = "foodid_" + foodid, shopcartJson = JSON.parse(storage.getItem(shopcartname)), !shopcartJson[foodidString]) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeSearchresultOrdernum(foodid, 1, 0),
        void 0;
        if (!shopcartJson[foodidString].foodnum) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeSearchresultOrdernum(foodid, 1, 0),
        void 0;
        oldOrdernum = shopcartJson[foodidString].foodnum,
        shopcartJson[foodidString].foodnum -= 1,
        is_nature = $("#searchresult_foodnature_" + foodid).attr("is_nature"),
        "1" == is_nature && (foodtypelistJson[typeid][foodtypelistnum].natureArray.pop(), natureShowJson = JSON.parse("{}"), natureShowJson.data = foodtypelistJson[typeid][foodtypelistnum], html = template("searchresult_food_nature_template", natureShowJson), $("#searchresult_foodnature_" + foodid).html(html), $("#searchresult_foodnature_" + foodid).show(), searchresultIScroll.refresh()),
        shopcartJson[foodidString].is_nature = is_nature,
        shopcartJson[foodidString].natureArray = foodtypelistJson[typeid][foodtypelistnum].natureArray,
        changeSearchresultOrdernum(foodid, oldOrdernum, shopcartJson[foodidString].foodnum),
        DeleteFoodtypeOrdernum(typeid),
        0 == shopcartJson[foodidString].foodnum && (eval("delete shopcartJson." + foodidString), is_nature = $("#searchresult_foodnature_" + foodid).attr("is_nature"), "1" == is_nature && ($("#searchresult_foodnature_" + foodid).hide(), searchresultIScroll.refresh())),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson))
    }
}
function ChangeFoodSecondType() {
    var a = $(this).attr("id"),
    b = a.substr(15);
    $(".foodsecondtype.selected").removeClass("selected"),
    $(this).addClass("selected"),
    $(".fooditem").hide(),
    $(".fooditem.second_type_id_" + b).show(),
    orderFoodIScroll.refresh()
}
function big_plus_click() {
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, a = $(this).attr("id"),
    b = a.substr(9),
    c = document.getElementById("fooditem_" + b);
    if (c && (d = document.getElementById("foodnature_" + b))) {
        for (e = parseInt($("#fooditem_" + b).attr("typeid")), f = 0, g = 0; g < foodtypelistJson[e].length; g++) if (foodtypelistJson[e][g].id == b) {
            if (parseInt(foodtypelistJson[e][g].memberlimit) && (!ismember || memberFreeze)) return ShowAttention("该商品只有会员才能选购"),
            void 0;
            if (parseInt(foodtypelistJson[e][g].stockvalid) && foodtypelistJson[e][g].stock < parseInt(foodtypelistJson[e][g].ordernum) + 1) return ShowAttention("该商品库存不足！"),
            void 0;
            if (parseInt(foodtypelistJson[e][g].is_limitfood)) {
                if ("no" == foodtypelistJson[e][g].datetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if ("no" == foodtypelistJson[e][g].timetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if (parseInt(foodtypelistJson[e][g].ordernum) + parseInt(foodtypelistJson[e][g].dianfoodnum) >= parseInt(foodtypelistJson[e][g].limitfoodnum)) return ShowAttention("已达到该商品的购买数量上限！"),
                void 0
            }
            foodtypelistJson[e][g].ordernum = parseInt(foodtypelistJson[e][g].ordernum) + 1,
            f = g;
            break
        }
        if (h = "foodid_" + b, i = JSON.parse(storage.getItem(shopcartname)), i[h] || (i[h] = JSON.parse("{}")), i[h].foodid = b, i[h].foodnum = 1, i[h].typeid = e, i[h].foodname = foodtypelistJson[e][f].name, i[h].foodprice = parseFloat(foodtypelistJson[e][f].price), i[h].unit = foodtypelistJson[e][f].unit, i[h].member_price_used = foodtypelistJson[e][f].member_price_used, i[h].member_price = foodtypelistJson[e][f].member_price, j = JSON.parse("[]"), k = $("#foodnature_" + b).attr("is_nature"), "1" == k) {
            l = foodtypelistJson[e][f].nature,
            m = JSON.parse("{}"),
            n = 0;
            for (o in l) p = l[o].defaultnaturevalue,
            q = l[o][p],
            m[o] = JSON.parse("{}"),
            m[o]["naturevaluename"] = p,
            m[o]["naturevalueprice"] = parseFloat(q),
            n += q;
            m.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[e][f].price) + 10 * n) / 10,
            j.push(m),
            foodtypelistJson[e][f].natureArray = j,
            r = JSON.parse("{}"),
            r.data = foodtypelistJson[e][f],
            s = template("food_nature_template", r),
            $("#foodnature_" + b).html(s),
            $("#foodnature_" + b).show(),
            orderFoodIScroll.refresh(),
            $("#foodprice_layout_" + b).hide()
        }
        if (i[h].is_nature = k, i[h].natureArray = j, 2 == showtype) {
            if (t = document.getElementById("foodimage_" + b), !t) return;
            u = $("#foodimage_" + b).attr("src"),
            i[h].foodimage = u
        }
        changeFoodOrdernum(b, 0, 1),
        AddFoodtypeOrdernum(e),
        storage.setItem(shopcartname, JSON.stringify(i)),
        UpdateTotalOrderInfo()
    }
}
function small_plus_click(event) {
    var typeid, foodtypelistnum, i, foodidString, shopcartJson, oldOrdernum, is_nature, nature, curNatureJson, selectedNaturePrice, naturename, defaultNaturevalue, defaultNatureprice, natureShowJson, html, id = $(this).attr("id"),
    foodid = id.substr(11),
    fooditemobj = document.getElementById("fooditem_" + foodid);
    if (fooditemobj) {
        for (typeid = $("#fooditem_" + foodid).attr("typeid"), foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
            if (parseInt(foodtypelistJson[typeid][i].memberlimit) && (!ismember || memberFreeze)) return ShowAttention("该商品只有会员才能选购"),
            void 0;
            if (parseInt(foodtypelistJson[typeid][i].stockvalid) && foodtypelistJson[typeid][i].stock < parseInt(foodtypelistJson[typeid][i].ordernum) + 1) return ShowAttention("该商品库存不足！"),
            void 0;
            if (parseInt(foodtypelistJson[typeid][i].is_limitfood)) {
                if ("no" == foodtypelistJson[typeid][i].datetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if ("no" == foodtypelistJson[typeid][i].timetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
                void 0;
                if (parseInt(foodtypelistJson[typeid][i].ordernum) + parseInt(foodtypelistJson[typeid][i].dianfoodnum) >= parseInt(foodtypelistJson[typeid][i].limitfoodnum)) return ShowAttention("已达到该商品的购买数量上限！"),
                void 0
            }
            foodtypelistJson[typeid][i].ordernum = parseInt(foodtypelistJson[typeid][i].ordernum) + 1,
            foodtypelistnum = i;
            break
        }
        if (foodidString = "foodid_" + foodid, shopcartJson = JSON.parse(storage.getItem(shopcartname)), !shopcartJson[foodidString]) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeFoodOrdernum(foodid, 1, 0),
        void 0;
        if (!shopcartJson[foodidString].foodnum) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeFoodOrdernum(foodid, 1, 0),
        void 0;
        if (! (shopcartJson[foodidString].foodnum >= 99)) {
            if (oldOrdernum = shopcartJson[foodidString].foodnum, shopcartJson[foodidString].foodnum += 1, is_nature = $("#foodnature_" + foodid).attr("is_nature"), "1" == is_nature) {
                nature = foodtypelistJson[typeid][foodtypelistnum].nature,
                curNatureJson = JSON.parse("{}"),
                selectedNaturePrice = 0;
                for (naturename in nature) defaultNaturevalue = nature[naturename].defaultnaturevalue,
                defaultNatureprice = nature[naturename][defaultNaturevalue],
                curNatureJson[naturename] = JSON.parse("{}"),
                curNatureJson[naturename]["naturevaluename"] = defaultNaturevalue,
                curNatureJson[naturename]["naturevalueprice"] = parseFloat(defaultNatureprice),
                selectedNaturePrice += defaultNatureprice;
                curNatureJson.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[typeid][foodtypelistnum].price) + 10 * selectedNaturePrice) / 10,
                foodtypelistJson[typeid][foodtypelistnum].natureArray.push(curNatureJson),
                natureShowJson = JSON.parse("{}"),
                natureShowJson.data = foodtypelistJson[typeid][foodtypelistnum],
                html = template("food_nature_template", natureShowJson),
                $("#foodnature_" + foodid).html(html),
                $("#foodnature_" + foodid).show(),
                orderFoodIScroll.refresh(),
                $("#foodprice_layout_" + foodid).hide()
            }
            shopcartJson[foodidString].is_nature = is_nature,
            shopcartJson[foodidString].natureArray = foodtypelistJson[typeid][foodtypelistnum].natureArray,
            changeFoodOrdernum(foodid, oldOrdernum, shopcartJson[foodidString].foodnum),
            AddFoodtypeOrdernum(typeid),
            storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
            UpdateTotalOrderInfo()
        }
    }
}
function small_delete_click(event) {
    var foodnatureobj, typeid, foodtypelistnum, i, foodidString, shopcartJson, oldOrdernum, is_nature, natureShowJson, html, id = $(this).attr("id"),
    foodid = id.substr(13),
    fooditemobj = document.getElementById("fooditem_" + foodid);
    if (fooditemobj && (foodnatureobj = document.getElementById("foodnature_" + foodid))) {
        for (typeid = $("#fooditem_" + foodid).attr("typeid"), foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
            foodtypelistJson[typeid][i].ordernum = parseInt(foodtypelistJson[typeid][i].ordernum) - 1,
            foodtypelistnum = i;
            break
        }
        if (foodidString = "foodid_" + foodid, shopcartJson = JSON.parse(storage.getItem(shopcartname)), !shopcartJson[foodidString]) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeFoodOrdernum(foodid, 1, 0),
        void 0;
        if (!shopcartJson[foodidString].foodnum) return eval("delete shopcartJson." + foodidString),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        changeFoodOrdernum(foodid, 1, 0),
        void 0;
        oldOrdernum = shopcartJson[foodidString].foodnum,
        shopcartJson[foodidString].foodnum -= 1,
        is_nature = $("#foodnature_" + foodid).attr("is_nature"),
        "1" == is_nature && (foodtypelistJson[typeid][foodtypelistnum].natureArray.pop(), natureShowJson = JSON.parse("{}"), natureShowJson.data = foodtypelistJson[typeid][foodtypelistnum], html = template("food_nature_template", natureShowJson), $("#foodnature_" + foodid).html(html), $("#foodnature_" + foodid).show(), orderFoodIScroll.refresh(), 0 == shopcartJson[foodidString].foodnum && $("#foodprice_layout_" + foodid).show()),
        shopcartJson[foodidString].is_nature = is_nature,
        shopcartJson[foodidString].natureArray = foodtypelistJson[typeid][foodtypelistnum].natureArray,
        changeFoodOrdernum(foodid, oldOrdernum, shopcartJson[foodidString].foodnum),
        DeleteFoodtypeOrdernum(typeid),
        0 == shopcartJson[foodidString].foodnum && (eval("delete shopcartJson." + foodidString), is_nature = $("#foodnature_" + foodid).attr("is_nature"), "1" == is_nature && ($("#foodnature_" + foodid).hide(), orderFoodIScroll.refresh())),
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        UpdateTotalOrderInfo()
    }
}
function ShowFoodinfo() {
    var b, c, d, e, f, g, h, i, j, k, l, a = $(this).attr("id");
    if (0 == a.indexOf("foodimage_")) b = a.substr(10);
    else if (0 == a.indexOf("foodname_")) b = a.substr(9);
    else if (0 == a.indexOf("searchresult_foodimage_")) b = a.substr(23);
    else {
        if (0 != a.indexOf("searchresult_foodname_show_")) return;
        b = a.substr(27)
    }
    if (c = 0, d = document.getElementById("fooditem_" + b), !d) {
        if (d = document.getElementById("searchresult_" + b), !d) return;
        c = 1
    }
    for (e = 0 == c ? $("#fooditem_" + b).attr("typeid") : $("#searchresult_" + b).attr("typeid"), f = JSON.parse("{}"), g = 0; g < foodtypelistJson[e].length; g++) if (foodtypelistJson[e][g].id == b) {
        f.foodname = foodtypelistJson[e][g].name,
        f.foodprice = foodtypelistJson[e][g].price,
        f.foodimage = foodtypelistJson[e][g].img,
        f.point = foodtypelistJson[e][g].point,
        f.des = foodtypelistJson[e][g].des,
        f.stockvalid = foodtypelistJson[e][g].stockvalid,
        f.stock = foodtypelistJson[e][g].stock,
        f.unit = foodtypelistJson[e][g].unit,
        f.member_price_used = foodtypelistJson[e][g].member_price_used,
        f.member_price = foodtypelistJson[e][g].member_price,
        f.openpoint = openpoint,
        f.has_formerprice = foodtypelistJson[e][g].has_formerprice,
        f.formerprice = foodtypelistJson[e][g].formerprice;
        break
    }
    h = template("foodinfo_template", f),
    $("#foodinfo").html(h),
    i = $(window).width() - 50,
    j = $(window).height() - 80,
    $("#foodinfo").css("left", $(window).width() / 2),
    $("#foodinfo").css("margin-left", -i / 2),
    $("#foodinfo").css("width", i),
    $("#foodinfo").css("top", $(window).height() / 2),
    $("#foodinfo").css("margin-top", -j / 2),
    $("#foodinfo").css("height", j),
    $(".ui-mask").show(),
    $("#foodinfo").show(),
    k = $("#foodinfo-foodname").height(),
    l = j - k - 15,
    $("#foodinfocontent").css("height", l),
    $("#foodslider").swipeSlide({
        autoPlay: 2
    }),
    setTimeout(function() {
        foodinfoIScroll = new IScroll("#foodinfocontent", {
            disableMouse: !0,
            disablePointer: !0
        })
    },
    200)
}
function HideFoodinfo() {
    $(".ui-mask").hide(),
    $("#foodinfo").hide(),
    $("#foodinfo").css("top", -1e4)
}
function ShowPhonecode() {
    var a = $(window).width() - 50,
    b = 185;
    $("#phonecode-dialog").css("left", $(window).width() / 2),
    $("#phonecode-dialog").css("margin-left", -a / 2),
    $("#phonecode-dialog").css("width", a),
    $("#phonecode-dialog").css("top", $(window).height() / 2),
    $("#phonecode-dialog").css("margin-top", -b / 2),
    $("#phonecode-dialog").css("height", b),
    $(".ui-mask").show(),
    $("#phonecode-dialog").show()
}
function HidePhonecode() {
    $(".ui-mask").hide(),
    $("#phonecode-dialog").hide(),
    $("#phonecode-dialog").css("top", -1e4)
}
function SearchFood(a) {
    var d, e, f, g, b = JSON.parse("[]"),
    c = 0;
    for (d in foodtypelistJson) for (e = 0; e < foodtypelistJson[d].length; e++) - 1 != foodtypelistJson[d][e].name.indexOf(a) && (b.push(foodtypelistJson[d][e]), c++);
    f = JSON.parse("{}"),
    f.data = b,
    f.keyword = a,
    f.unitshow = unitshow,
    f.showsales = showsales,
    $("#search-result-content").empty(),
    0 == c ? g = '<p class="search_no_result">没有搜索到包含该关键词的商品~</p>': 1 == showtype ? g = template("search_result_1", f) : 2 == showtype && (g = template("search_result_2", f)),
    document.getElementById("search-result-content").innerHTML = g,
    $("#order-content").hide(),
    $("#search-result").show(),
    searchresultIScroll.scrollTo(0, 0, 200, 0),
    searchresultIScroll.refresh()
}
function ChangeFoodNature() {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, a = $(this).parent(".foodnature-value-layout");
    if (a.children(".foodnature-value.active").removeClass("active"), $(this).addClass("active"), b = a.parent(".foodnature-layout"), c = b.attr("naturenum"), d = b.parent(".foodnature"), e = d.attr("id"), 0 == e.indexOf("foodnature_")) {
        if (f = e.substr(11), g = document.getElementById("fooditem_" + f), !g) return;
        h = parseInt($("#fooditem_" + f).attr("typeid"))
    } else if (0 == e.indexOf("searchresult_foodnature_")) {
        if (f = e.substr(24), g = document.getElementById("fooditem_" + f), !g) return;
        h = parseInt($("#fooditem_" + f).attr("typeid"))
    }
    for (i = "foodid_" + f, j = 0, k = 0; k < foodtypelistJson[h].length; k++) if (foodtypelistJson[h][k].id == f) {
        j = k;
        break
    }
    l = foodtypelistJson[h][j].natureArray,
    m = JSON.parse(storage.getItem(shopcartname)),
    k = 0,
    n = m[i].natureArray,
    o = n[c],
    p = 0;
    for (q in o)"selectedNaturePrice" != q && (0 == e.indexOf("foodnature_") ? r = $("#foodnature_" + f + "_" + c).children(".foodnature-value-layout.naturenum_" + k).children(".foodnature-value.active").children("p") : 0 == e.indexOf("searchresult_foodnature_") && (r = $("#searchresult_foodnature_" + f + "_" + c).children(".foodnature-value-layout.naturenum_" + k).children(".foodnature-value.active").children("p")), s = r.html(), t = r.attr("price"), o[q]["naturevaluename"] = s, o[q]["naturevalueprice"] = parseFloat(t), p += parseFloat(t), k++);
    o.selectedNaturePrice = (10 * parseFloat(foodtypelistJson[h][j].price) + 10 * p) / 10,
    m[i].natureArray[c] = o,
    storage.setItem(shopcartname, JSON.stringify(m)),
    0 == e.indexOf("foodnature_") ? $("#foodnature_layout_text_price_" + f + "_" + c).html(o.selectedNaturePrice) : 0 == e.indexOf("searchresult_foodnature_") && $("#searchresult_foodnature_layout_text_price_" + f + "_" + c).html(o.selectedNaturePrice),
    UpdateTotalOrderInfo(),
    l[c] = o,
    foodtypelistJson[h][j].natureArray = l,
    0 == e.indexOf("foodnature_") ? $("#foodprice_" + f).html(1 * foodtypelistJson[h][j].natureprice) : 0 == e.indexOf("searchresult_foodnature_") && $("#searchresult_foodprice_" + f).html(1 * foodtypelistJson[h][j].natureprice)
}
function UpdateCartlist() {
    var shopcartJson, foodidString, cartfoodNatureArray, i, natureString, isNatureExist, j, newNature, CartlistShowJson, html;
    cartNature = JSON.parse("{}"),
    shopcartJson = JSON.parse(storage.getItem(shopcartname));
    for (foodidString in shopcartJson) if (0 != shopcartJson[foodidString].foodnum) if ("1" == shopcartJson[foodidString].is_nature) {
        for (cartfoodNatureArray = JSON.parse("[]"), natureArray = shopcartJson[foodidString].natureArray, i = 0; i < natureArray.length; i++) {
            for (natureString = JSON.stringify(natureArray[i]), isNatureExist = !1, j = 0; j < cartfoodNatureArray.length; j++) if (natureString == JSON.stringify(cartfoodNatureArray[j].nature)) {
                cartfoodNatureArray[j].ordernum += 1,
                isNatureExist = !0;
                break
            }
            0 == isNatureExist && (newNature = JSON.parse("{}"), newNature.nature = JSON.parse(natureString), newNature.ordernum = 1, cartfoodNatureArray.push(newNature))
        }
        for (i = 0; i < cartfoodNatureArray.length; i++) cartNature[foodidString + "_" + i] = JSON.parse(JSON.stringify(shopcartJson[foodidString])),
        cartNature[foodidString + "_" + i].nature = cartfoodNatureArray[i].nature,
        cartNature[foodidString + "_" + i].foodnum = cartfoodNatureArray[i].ordernum,
        cartNature[foodidString + "_" + i].naturetype = i
    } else cartNature[foodidString] = shopcartJson[foodidString];
    else eval("delete shopcartJson." + foodidString),
    storage.setItem(shopcartname, JSON.stringify(shopcartJson));
    CartlistShowJson = JSON.parse("{}"),
    CartlistShowJson.data = cartNature,
    CartlistShowJson.unitshow = unitshow,
    $("#cartlayout").empty(),
    1 == showtype ? html = template("cartinfo_template_1", CartlistShowJson) : 2 == showtype && (html = template("cartinfo_template_2", CartlistShowJson)),
    document.getElementById("cartlayout").innerHTML = html
}
function UpdateCartPriceShow() {
    var d, e, f, g, h, i, j, k, l, m, n, o, a = 0,
    b = 0,
    c = JSON.parse(storage.getItem(shopcartname));
    for (d in c) {
        if (foodprice = parseFloat(c[d].foodprice), foodnum = c[d].foodnum, "1" == c[d].is_nature) for (e = c[d].natureArray, f = 0; f < e.length; f++) a += e[f].selectedNaturePrice;
        else a += foodprice * foodnum;
        member_price_used = parseInt(c[d].member_price_used),
        member_price = parseFloat(c[d].member_price),
        member_price_used && (b += (foodprice - member_price) * foodnum)
    }
    if (a = Math.round(10 * parseFloat(a)) / 10, b = Math.round(10 * parseFloat(b)) / 10, $("#cart-totalprice").html(a), g = a, b > 0 ? IsShopMember && (memberFreeze ? $("#memberinfo").html('<p style="color: #999999;">您的会员已经被冻结，无法享受会员优惠！</p>') : (g = a - b, h = "<p>会员优惠 " + b + " 元</p>" + "<p>会员价：￥" + g + "</p>", $("#memberinfo").html(h)), $("#memberinfo").show()) : $("#memberinfo").hide(), IsShopDiscount && (discountlimitmember ? IsShopMember && (memberFreeze ? (h = "<p>您的会员已经被冻结，无法享受 " + ShopDiscount + " 折优惠活动</p>", $("#discountinfo").html(h)) : (g = parseFloat((g * ShopDiscount / 10).toFixed(1)), h = "<p>本店开启了会员 " + ShopDiscount + " 折优惠活动</p>", $("#discountinfo").html(h))) : (g = parseFloat((g * ShopDiscount / 10).toFixed(1)), h = "<p>本店开启了 " + ShopDiscount + " 折优惠活动</p>", $("#discountinfo").html(h))), i = !1, j = !1, k = !1, 0 == selftake ? basicprice > a ? delivery_fee_valid ? (j = !0, l = "配送费 " + delivery_fee + " 元", "yes" == member_delivery_fee ? l = "配送费 0 元（您是本店会员免配送费）": (i = !0, (0 == reach_delivery_fee_type || 2 == reach_delivery_fee_type) && (m = 0, m = 0 == reach_delivery_fee_type ? basicprice: no_delivery_fee_value, l += "（消费满 " + m + " 元可免配送费）")), $("#deliveryinfo").html("<p>" + l + "</p>")) : (k = !0, $("#deliveryinfo").html("<p>您的订单没有达到起送价格 " + basicprice + " 元</p>")) : "yes" == member_delivery_fee ? (j = !0, l = "配送费 0 元", l += "（您是本店会员免配送费）", $("#deliveryinfo").html("<p>" + l + "</p>")) : 0 == reach_delivery_fee_type ? $("#deliveryinfo").html("免配送费") : 1 == reach_delivery_fee_type ? (i = !0, j = !0, l = "<p>配送费 " + delivery_fee + " 元</p>", $("#deliveryinfo").html(l)) : no_delivery_fee_value > a ? (i = !0, j = !0, l = "配送费 " + delivery_fee + " 元", l += "（消费满 " + no_delivery_fee_value + " 元免配送费）", $("#deliveryinfo").html("<p>" + l + "</p>")) : $("#deliveryinfo").html("免配送费") : $("#deliveryinfo").html("免配送费"), ShouldPayPrice = parseFloat(g), i && (ShouldPayPrice += delivery_fee), open_addservice) {
        n = "";
        for (o in addserviceJson) ShouldPayPrice += addserviceJson[o],
        n += "<p>" + o + " " + addserviceJson[o] + " 元</p>";
        $("#addserviceinfo").html(n)
    }
    ShouldPayPrice.toFixed(1),
    $("#shouldpayprice-value").html(ShouldPayPrice),
    k ? ($("#gopay").removeClass("active"), $("#gopay").addClass("inactive"), $("#gopay p").html("未达到起送价（还差" + (basicprice - a).toFixed(1) + "元）")) : ($("#gopay").removeClass("inactive"), $("#gopay").addClass("active"), $("#gopay p").html("去结算"))
}
function addcartfoodnum(a, b, c) {
    var d, e;
    b ? (d = parseInt($("#cart_foodnum_" + a + "_" + c).html()), e = d + 1, $("#cart_foodnum_" + a + "_" + c).html(e)) : (d = parseInt($("#cart_foodnum_" + a).html()), e = d + 1, $("#cart_foodnum_" + a).html(e)),
    UpdateCartPriceShow()
}
function deletecartfoodnum(a, b, c) {
    var d, e;
    b ? (d = parseInt($("#cart_foodnum_" + a + "_" + c).html()), e = d - 1, $("#cart_foodnum_" + a + "_" + c).html(e)) : (d = parseInt($("#cart_foodnum_" + a).html()), e = d - 1, $("#cart_foodnum_" + a).html(e)),
    UpdateCartPriceShow()
}
function cart_plus_click(event) {
    var foodtypelistnum, i, naturetype, nature, foodid = parseInt($(this).parents(".cartitem").attr("foodid")),
    is_nature = parseInt($(this).parents(".cartitem").attr("is_nature")),
    foodidString = "foodid_" + foodid,
    shopcartJson = JSON.parse(storage.getItem(shopcartname));
    if (!shopcartJson[foodidString]) return eval("delete shopcartJson." + foodidString),
    storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
    changecartfoodnum(foodid, 0),
    void 0;
    if (!shopcartJson[foodidString].foodnum) return eval("delete shopcartJson." + foodidString),
    storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
    changecartfoodnum(foodid, 0),
    void 0;
    if (shopcartJson[foodidString].foodnum >= 99) return ShowAttention("每种商品每次最多选择99份！"),
    void 0;
    for (typeid = shopcartJson[foodidString].typeid, foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
        if (parseInt(foodtypelistJson[typeid][i].memberlimit) && (!ismember || memberFreeze)) return ShowAttention("该商品只有会员才能选购"),
        void 0;
        if (parseInt(foodtypelistJson[typeid][i].stockvalid) && foodtypelistJson[typeid][i].stock < parseInt(shopcartJson[foodidString].foodnum) + 1) return ShowAttention("该商品库存不足！"),
        void 0;
        if (parseInt(foodtypelistJson[typeid][i].is_limitfood)) {
            if ("no" == foodtypelistJson[typeid][i].datetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
            void 0;
            if ("no" == foodtypelistJson[typeid][i].timetage) return ShowAttention("未到该商品的购买时间，暂时无法购买！"),
            void 0;
            if (parseInt(foodtypelistJson[typeid][i].ordernum) + parseInt(foodtypelistJson[typeid][i].dianfoodnum) >= parseInt(foodtypelistJson[typeid][i].limitfoodnum)) return ShowAttention("已达到该商品的购买数量上限！"),
            void 0
        }
        foodtypelistJson[typeid][i].ordernum = parseInt(shopcartJson[foodidString].foodnum) + 1,
        foodtypelistnum = i;
        break
    }
    shopcartJson[foodidString].foodnum += 1,
    is_nature ? (naturetype = parseInt($(this).parents(".cartitem").attr("naturetype")), nature = cartNature[foodidString + "_" + naturetype].nature, shopcartJson[foodidString].natureArray.push(nature), foodtypelistJson[typeid][foodtypelistnum].natureArray.push(nature), storage.setItem(shopcartname, JSON.stringify(shopcartJson)), addcartfoodnum(foodid, 1, naturetype)) : (storage.setItem(shopcartname, JSON.stringify(shopcartJson)), addcartfoodnum(foodid, 0, 0))
}
function cart_delete_click(event) {
    var naturetype, curfoodnum, newfoodnum, foodtypelistnum, i, nature, natureArrayLength, foodid = parseInt($(this).parents(".cartitem").attr("foodid")),
    is_nature = parseInt($(this).parents(".cartitem").attr("is_nature")),
    foodidString = "foodid_" + foodid,
    shopcartJson = JSON.parse(storage.getItem(shopcartname));
    if (!shopcartJson[foodidString]) return eval("delete shopcartJson." + foodidString),
    storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
    changecartfoodnum(foodid, 0),
    void 0;
    if (!shopcartJson[foodidString].foodnum) return eval("delete shopcartJson." + foodidString),
    storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
    changecartfoodnum(foodid, 0),
    void 0;
    if (is_nature) {
        if (naturetype = parseInt($(this).parents(".cartitem").attr("naturetype")), curfoodnum = parseInt($("#cart_foodnum_" + foodid + "_" + naturetype).html()), newfoodnum = curfoodnum - 1, 0 == newfoodnum) return ShowDeleteAttention(foodid, 1, naturetype),
        void 0
    } else if (curfoodnum = parseInt($("#cart_foodnum_" + foodid).html()), newfoodnum = curfoodnum - 1, 0 == newfoodnum) return ShowDeleteAttention(foodid, 0, 0),
    void 0;
    for (typeid = shopcartJson[foodidString].typeid, foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
        foodtypelistJson[typeid][i].ordernum = shopcartJson[foodidString].foodnum - 1,
        foodtypelistnum = i;
        break
    }
    if (shopcartJson[foodidString].foodnum -= 1, is_nature) {
        for (naturetype = parseInt($(this).parents(".cartitem").attr("naturetype")), nature = cartNature[foodidString + "_" + naturetype].nature, natureArrayLength = shopcartJson[foodidString].natureArray.length, i = natureArrayLength - 1; i >= 0; i--) if (JSON.stringify(shopcartJson[foodidString].natureArray[i]) == JSON.stringify(nature)) {
            shopcartJson[foodidString].natureArray.splice(i, 1),
            foodtypelistJson[typeid][foodtypelistnum].natureArray.splice(i, 1);
            break
        }
        storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
        deletecartfoodnum(foodid, 1, naturetype)
    } else storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
    deletecartfoodnum(foodid, 0, 0)
}
function ShowDeleteAttention(a, b, c) {
    var d, e;
    $(".ui-mask").show(),
    $("#delete-dialog").html('<div id="delete-content"><p>您确定要删除该商品吗？</p></div><div class="ui-dialog-btns"><a class="ui-btn" onclick="HideDeleteAttention()">取消</a><a class="ui-btn" onclick="DeleteCartFood(' + a + "," + b + "," + c + ')">确定</a>' + "</div>"),
    $("#delete-dialog").show(),
    d = $("#delete-dialog").height(),
    e = $(window).height() - 50,
    $("#delete-dialog").css("top", e / 2),
    $("#delete-dialog").css("margin-top", -d / 2)
}
function HideDeleteAttention() {
    $(".ui-mask").hide(),
    $("#delete-dialog").hide(),
    $("#delete-dialog").css("top", -1e4)
}
function DeleteCartFood(foodid, is_nature, naturetype) {
    var foodidString, shopcartJson, foodtypelistnum, i, nature, natureArrayLength;
    for (HideDeleteAttention(), foodidString = "foodid_" + foodid, shopcartJson = JSON.parse(storage.getItem(shopcartname)), typeid = shopcartJson[foodidString].typeid, foodtypelistnum = 0, i = 0; i < foodtypelistJson[typeid].length; i++) if (foodtypelistJson[typeid][i].id == foodid) {
        foodtypelistJson[typeid][i].ordernum -= 1,
        foodtypelistnum = i;
        break
    }
    if (shopcartJson[foodidString].foodnum -= 1, 0 == shopcartJson[foodidString].foodnum) eval("delete shopcartJson." + foodidString);
    else for (nature = cartNature[foodidString + "_" + naturetype].nature, natureArrayLength = shopcartJson[foodidString].natureArray.length, i = natureArrayLength - 1; i >= 0; i--) if (JSON.stringify(shopcartJson[foodidString].natureArray[i]) == JSON.stringify(nature)) {
        shopcartJson[foodidString].natureArray.splice(i, 1),
        foodtypelistJson[typeid][foodtypelistnum].natureArray.splice(i, 1);
        break
    }
    return storage.setItem(shopcartname, JSON.stringify(shopcartJson)),
    0 == getJsonLength(shopcartJson) ? (showCartEmpty(), void 0) : (UpdateCartlist(), UpdateCartPriceShow(), cartIScroll.refresh(), void 0)
}
function gopay() {
    var a, b, c, d;
    if (!$(this).hasClass("inactive")) {
        if (a = JSON.parse(storage.getItem(shopcartname)), 0 == getJsonLength(a)) return ShowAttention("您的购物车为空！"),
        void 0;
        if (document.getElementById("delivertime") && 0 == selftake) {
            if (b = $("#delivertime").val(), c = $("#delivertime").attr("delivertimerange"), "" == b) return ShowAttention("本店要求最少提前" + c + "分钟下单，请重新选择配送时间"),
            void 0;
            if (d = $("#delivertime option:selected").attr("tage"), "no" == d) return ShowAttention("本店要求最少提前" + c + "分钟下单，请重新选择配送时间"),
            void 0
        }
        location.hash = "pay"
    }
}
function UpdateBalanceInfo() {
    IsShopMember ? memberFreeze ? $("#paypassword-layout").html('<div class="order-info-item" style="border-bottom: 1px solid #e1e1e1;"><p class="member-attention">您的会员已经被冻结，无法使用余额支付</p></div>') : $("#paypassword-layout").html('<p id="memberBalance">会员余额：<span id="memberBalance-text">￥<span id="memberBalance-value">' + memberBalance + "</span></span></p>") : $("#paypassword-layout").html('<div class="order-info-item" style="border-bottom: 1px solid #e1e1e1;"><p class="member-attention">您不是本店会员，无法使用余额支付</p></div>')
}
function paytypeclick() {
    var a = $(this).attr("id");
    "pay-offline" == a ? ($("#paypassword-layout").hide(), $("#online-info").hide(), $(".paytype-text.active").removeClass("active"), $("#pay-offline").addClass("active")) : "pay-balance" == a ? ($("#paypassword-layout").show(), $("#online-info").hide(), $(".paytype-text.active").removeClass("active"), $("#pay-balance").addClass("active")) : ($("#paypassword-layout").hide(), $("#online-info").show(), $(".paytype-text.active").removeClass("active"), $("#pay-online").addClass("active")),
    payIScroll.refresh()
}
function couponchange() {
    var a = $("#coupon option").not(function() {
        return ! this.selected
    }).attr("couponvalue"),
    b = ShouldPayPrice - parseFloat(a);
    b = Math.round(10 * parseFloat(b)) / 10,
    $("#LastPayPrice").html(b)
}
function valiForm() {
    var b = /^[-0-9]*$/,
    c = jsTrim($("#name").html()),
    d = jsTrim($("#phone").html()),
    e = jsTrim($("#address").html());
    return c.length < 1 ? (ShowAttention("地址信息不完整，请选择正确的地址！"), !0) : d.length < 4 || d.length > 20 ? (ShowAttention("地址信息不完整，请选择正确的地址！"), !0) : b.test(d) ? e.length < 1 ? (ShowAttention("地址信息不完整，请选择正确的地址！"), !0) : !1 : (ShowAttention("地址信息不完整，请选择正确的地址！"), !0)
}
function CaptchaTime() {
    0 == wait ? ($("#getcaptcha").html("重新获取"), $("#getcaptcha").removeClass("inactive"), $("#getcaptcha").addClass("active"), wait = 180) : ($("#getcaptcha").html(wait + "秒后重发"), $("#getcaptcha").removeClass("active"), $("#getcaptcha").addClass("inactive"), wait--, setTimeout(function() {
        CaptchaTime()
    },
    1e3))
}
function sendCaptcha() {
    if (!$(this).hasClass("inactive")) {
        var a = jsTrim($("#phone").html());
        return $.ajax({
            type: "GET",
            url: "app.php?c=sms&a=sendcaptcha&phone=" + a + "&admin_id=" + admin_id + "&shop_id=" + shop_id,
            cache: !1,
            success: function(a) {
                if ("true" == a) ShowAttention("您的验证码已经成功发送，请输入您收到的短信验证码完成手机号码验证。");
                else {
                    if ("false" != a) return ShowAttention("您今天获取验证码次数已超过3次，请明天再试！"),
                    !1;
                    ShowAttention("您的短信验证码发送失败，请稍后重试。")
                }
            }
        }),
        $("#getcaptcha").removeClass("active"),
        $("#getcaptcha").addClass("inactive"),
        CaptchaTime(),
        !0
    }
}
function submitaddmerge() {
    var b, c, d, e, a = $("#addmerge_name").val();
    return a.length < 1 ? (ShowAttention("拼单名称不能为空"), void 0) : (b = /^[0-9]*$/, c = parseInt($("#addmerge_time").val()), d = parseInt($("#addmerge_time").attr("usertime")), b.test(c) ? 5 > c ? (ShowAttention("拼单时间最少为5分钟"), void 0) : c > d ? (ShowAttention("您填写的有效时间超过了商家设置的有效时间上限，请重新填写！"), void 0) : (e = !1, $(".addmerge-writecontent").each(function() {
        return $(this).val().length < 1 ? (ShowAttention($(this).parents(".order-info-item").find("p").html() + "不能为空"), e = !0, void 0) : void 0
    }), 1 != e && (showLoader("正在保存拼单..."), $.ajax({
        type: "GET",
        url: "/index.php?r=lewaimaimergeorder/add&adminId=" + admin_id + "&shopId=" + shop_id,
        dataType: "json",
        data: $("form#addmerge_form").serialize(),
        cache: !1,
        success: function(a) {
            "ok" == a.status ? (hideLoader(), mergeorder_id = a.mergeorder_id, mergeorderlist[mergeorder_id] = JSON.parse("{}"), mergeorderlist[mergeorder_id].name = a.name, mergeorderlist[mergeorder_id].limittime = a.limittime, location.hash = "pay") : (hideLoader(), ShowAttention(a.message))
        },
        error: function() {
            hideLoader(),
            ShowAttention("连接服务器出错，保存拼单失败！")
        }
    })), void 0) : (ShowAttention("有效时间格式错误，只能填写整数值"), void 0))
}
function submitaddaddress() {
    var b = /^[-0-9]*$/,
    c = jsTrim(document.getElementById("addaddress_name").value),
    d = jsTrim(document.getElementById("addaddress_phone").value),
    e = jsTrim(document.getElementById("addaddress_address").value);
    return document.getElementById("addaddress_name").value = c,
    document.getElementById("addaddress_phone").value = d,
    document.getElementById("addaddress_address").value = e,
    c.length < 1 ? (ShowAttention("亲,姓名不能为空哟"), void 0) : d.length < 4 || d.length > 20 ? (ShowAttention("亲，电话长度不对哦！"), void 0) : b.test(d) ? e.length < 1 ? (ShowAttention("亲，地址不能为空的哦！"), void 0) : (showLoader("正在保存地址..."), $.ajax({
        type: "POST",
        url: "app.php?c=cart&a=addaddress&customer_id="+lewaimai_customer_id,
        dataType: "json",
        data: $("form#addaddress_form").serialize(),
        cache: !1,
        success: function(a) {
            if ("ok" == a.status) {
                hideLoader(),
                document.getElementById("addaddress_name").value = "",
                document.getElementById("addaddress_phone").value = "",
                document.getElementById("addaddress_address").value = "";
                for (var b in addresslist) addresslist[b].isactive = !1;
                addresslist[a.id] = JSON.parse("{}"),
                addresslist[a.id].name = a.name,
                addresslist[a.id].address = a.address,
                addresslist[a.id].phone = a.phone,
                addresslist[a.id].isactive = !0,
                $("#name").html(a.name),
                $("#phone").html(a.phone),
                $("#address").html(a.address),
                showChooseaddress()
            } else hideLoader(),
            ShowAttention(a.message)
        },
        error: function() {
            hideLoader(),
            ShowAttention("连接服务器出错,添加地址出错！")
        }
    }), void 0) : (ShowAttention("亲，电话只能包含数字或横线-"), void 0)
}
function phonecodesubmit() {
    return $("#captcha").val().length < 1 ? (ShowAttention("验证码不能为空！"), void 0) : (HidePhonecode(), submit(), void 0)
}
function ShowGetLocationAttention(a) {
    var b, c;
    $(".ui-mask").show(),
    $("#getlocation-dialog").html('<div id="getlocation-content"><p>' + a + "</p>" + "</div>" + '<div class="ui-dialog-btns">' + '<a class="ui-btn" onclick="HideGetLocationAttention()">取消</a>' + '<a class="ui-btn" onclick="getposition();">确定</a>' + "</div>"),
    $("#getlocation-dialog").show(),
    b = $("#getlocation-dialog").height(),
    c = $(window).height() - 50,
    $("#getlocation-dialog").css("top", c / 2),
    $("#getlocation-dialog").css("margin-top", -b / 2)
}
function HideGetLocationAttention() {
    $(".ui-mask").hide(),
    $("#getlocation-dialog").hide(),
    $("#getlocation-dialog").css("top", -1e4)
}
function submit() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
    if (!$("#submitorder").hasClass("inactive")) {
        if (a = JSON.parse(storage.getItem(shopcartname)), 0 == getJsonLength(a)) return ShowAttention("您的购物车为空！"),
        void 0;
        if (1 != valiForm()) {
            if (b = $(".paytype-text.active").attr("id"), "pay-balance" == b) {
                if (!IsShopMember) return ShowAttention("您不是本店会员，无法使用余额支付"),
                void 0;
                if (memberFreeze) return ShowAttention("您的会员已经被冻结，无法使用余额支付"),
                void 0;
                if (c = parseFloat($("#LastPayPrice").html()), c > memberBalance) return ShowAttention("您的余额不足，无法提交订单！"),
                void 0
            }
            if (d = 0, "mergeorder-merge" == $(".mergeorder-directpay.active").attr("id")) {
                if (d = 1, 0 == mergeorder_id) return ShowAttention("和人拼单必须先去拼单列表中选择一个拼单"),
                void 0;
                if ("pay-offline" != b && "pay-balance" != b) return ShowAttention("拼单暂时不支持在线支付"),
                void 0
            }
            showLoader("订单提交中"),
            $("#submitorder").removeClass("active"),
            $("#submitorder").addClass("inactive"),
            e = $(".paytype-text.active").attr("id").substr(4),
            f = $("#online_pay_type option").not(function() {
                return ! this.selected
            }).attr("value"),
            g = -1,
            document.getElementById("coupon") && (g = $("#coupon option").not(function() {
                return ! this.selected
            }).attr("value")),
            h = encodeURIComponent($("#name").html()),
            i = jsTrim($("#phone").html()),
            j = encodeURIComponent($("#address").html()),
            k = encodeURIComponent($("#note").val()),
            l = $("#captcha").val(),
            m = "",
            document.getElementById("options") && (m = "&" + $("#options").serialize()),
            n = "",
            document.getElementById("delivertime") && 0 == selftake && (n = $("#delivertime").val()),
            o = encodeURIComponent(storage.getItem(shopcartname)),
            p = "pay_type=" + e + "&online_pay_type=" + f + "&coupon=" + g + "&name=" + h + "&phone=" + i + "&address=" + j + "&note=" + k + m + "&cart=" + o + "&captcha=" + l + "&delivertime=" + n + "&is_merge=" + d + "&mergeorder_id=" + mergeorder_id + "&selftake=" + selftake,
            $.ajax({
                type: "POST",
                url: "app.php?c=cart&a=sendorder&admin_id=" + admin_id + "&shop_id=" + shop_id+"&wxusername="+wxusername+"&customer_id="+lewaimai_customer_id,
                dataType: "json",
                data: p,
                cache: !1,
                success: function(a) {
                    var b, c, d, e, f, g, h, i, j;
                    if ("error" == a.status) return - 1 == a.errorcode ? (hideLoader(), ShowPhonecode(), $("#submitorder").removeClass("inactive"), $("#submitorder").addClass("active"), void 0) : -2 == a.errorcode ? (hideLoader(), ShowPhonecode(), ShowAttention("您的验证码不正确，请输入正确的验证码进行手机号验证。"), $("#submitorder").removeClass("inactive"), $("#submitorder").addClass("active"), void 0) : -99 == a.errorcode ? (hideLoader(), $("#submitorder").removeClass("inactive"), $("#submitorder").addClass("active"), b = a.message, ShowGetLocationAttention(b), void 0) : (ShowAttention(a.message), hideLoader(), $("#submitorder").removeClass("inactive"), $("#submitorder").addClass("active"), void 0);
                    if ("paying" == a.status) storage.setItem(shopcartname, "{}"),
                    hideLoader(),
                    $("#submitorder").removeClass("inactive"),
                    $("#submitorder").addClass("active"),
                    "weixinzhifu" == a.paytype ? 
                    		(c = a.out_trade_no, d = a.shopname, "old" == a.weixinzhifu_v ? e = "weixinzhifu&orderid=" + c + "&shopname=" + d + "&showwxpaytitle=1": "new" == a.weixinzhifu_v && (e = "/weixinzhifu?orderid=" + c + "&shopname=" + d + "&showwxpaytitle=1"), window.location.href = e) : "zhifubao" == a.paytype ? (f = a.request_token, g = a.req_id, e = "/admin.php/zhifu/zhifubao.html?order_ID="+ a.orderid + "&req_id="  + f + "&req_id=" + g, window.location.href = e) : "caifutong" == a.paytype && (h = a.token_id, e = "https://wap.tenpay.com/cgi-bin/wappayv2.0/wappay_gate.cgi?token_id=" + h, window.location.href = e);
                    else {
                        storage.setItem(shopcartname, "{}");
                        for (i in foodtypelistJson) for (j = 0; j < foodtypelistJson[i].length; j++) foodtypelistJson[i][j].ordernum = 0,
                        foodtypelistJson[i][j].natureArray = JSON.parse("[]");
                        hideLoader(),
                        $("#submitorder").removeClass("inactive"),
                        $("#submitorder").addClass("active"),
                        success_order_id = a.orderid,
                        showOrderSuccess()
                    }
                },
                error: function() {
                    hideLoader(),
                    $("#submitorder").removeClass("inactive"),
                    $("#submitorder").addClass("active")
                }
            })
        }
    }
}
function getposition() {
    return HideGetLocationAttention(),
    navigator.geolocation ? (showLoader("获取位置中..."), navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {}), void 0) : (ShowAttention("浏览器版本太低，不支持获取地理位置！"), void 0)
}
function locationSuccess(a) {
    var b = a.coords,
    c = b.latitude,
    d = b.longitude;
    $.ajax({
        type: "GET",
        url: "index.php?r=lewaimaiuser/savecustomerposition&coordinate_x=" + c + "&coordinate_y=" + d,
        dataType: "json",
        cache: !1,
        error: function() {
            hideLoader(),
            ShowAttention("保存位置失败！")
        },
        success: function(a) {
            return "success" != a.status ? (hideLoader(), ShowAttention("保存位置失败"), void 0) : (coordinate_x = c, coordinate_y = d, hideLoader(), void 0)
        }
    })
}
function locationError(a) {
    switch (a.code) {
    case 0:
        ShowAttention(a.message);
        break;
    case 1:
        ShowAttention("不允许定位可能无法获取当前位置！");
        break;
    case 2:
        ShowAttention("无法获取您的当前位置！");
        break;
    case 3:
        ShowAttention("获取位置信息超时！")
    }
    hideLoader(),
    $(".noshopshow").show()
}
var indexIScroll, orderTypeIScroll, foodsecondtypescroll, orderFoodIScroll, searchresultIScroll, cartIScroll, payIScroll, mergeIScroll, addmergeIScroll, addressIScroll, addaddressIScroll, usercenterIScroll, ShouldPayPrice = 0,
success_order_id = 0,
cartNature = JSON.parse("{}"),
mergeorder_id = 0,
mergeorderlist = JSON.parse("{}"),
wait = 180;
$(function() {
    indexIScroll = new IScroll("#page-index-content", {
        disableMouse: !0,
        disablePointer: !0
    }),
    orderTypeIScroll = new IScroll("#typelist", {
        disableMouse: !0,
        disablePointer: !0
    }),
    foodsecondtypescroll = new IScroll("#foodsecondtype-layout", {
        scrollX: !0,
        scrollY: !1,
        mouseWheel: !0,
        disableMouse: !0,
        disablePointer: !0
    }),
    orderFoodIScroll = new IScroll("#foodlist", {
        disableMouse: !0,
        disablePointer: !0
    }),
    searchresultIScroll = new IScroll("#search-result", {
        disableMouse: !0,
        disablePointer: !0
    }),
    cartIScroll = new IScroll("#page-cart", {
        disableMouse: !0,
        disablePointer: !0
    }),
    payIScroll = new IScroll("#page-pay-content", {
        disableMouse: !0,
        disablePointer: !0
    }),
    IsMergeOpen && (mergeIScroll = new IScroll("#mergelist-iscroll", {
        disableMouse: !0,
        disablePointer: !0
    }), addmergeIScroll = new IScroll("#addmerge-iscroll", {
        disableMouse: !0,
        disablePointer: !0
    })),
    addressIScroll = new IScroll("#chooseaddress-iscroll", {
        disableMouse: !0,
        disablePointer: !0
    }),
    addaddressIScroll = new IScroll("#addaddress-iscroll", {
        disableMouse: !0,
        disablePointer: !0
    }),
    usercenterIScroll = new IScroll("#page-usercenter", {
        disableMouse: !0,
        disablePointer: !0
    }),
    document.addEventListener("touchmove",
    function(a) {
        a.preventDefault()
    },
    !1)
}),
$(function() {
    function a() {
        $.ajax({
            url: "/index.php?r=lewaimaishow/shareaward",
            type: "post",
            dataType: "json",
            data: {
                shopId: shop_id
            },
            success: function() {}
        })
    }
    isAttention ? Showremind("提示", attentionContent, "知道了") : isFollowNotice && isFromShare && (Showremindfollow("关注提示", followTitle, followDesc, followLink, "知道了"), $("#closefollowinfo").on("tap", HideShowremind)),
    $("#footer .row-item").on("tap",
    function() {
        var a = $(this).attr("id");
        "home" == a ? location.hash = "index": "order" == a ? location.hash = "order": "cart" == a ? location.hash = "cart": "usercenter" == a && (location.hash = "usercenter")
    }),
    $("#addcollect").on("tap",
    function() {
        showLoader("收藏店铺...");
        var a = $(this).attr("shop_id");
        $.ajax({
            type: "POST",
            url: "/index.php?r=lewaimaicollect/addshop&shop_id=" + a,
            dataType: "json",
            cache: !1,
            success: function(a) {
                return "error" == a.status ? (ShowAttention(a.message), hideLoader(), void 0) : ("success" == a.status ? (ShowAttention(a.message), hideLoader(), $("#addcollect").hide(), $("#cancelcollect").show(), $("#cancelcollect").attr("collect_id", a.collect_id)) : (ShowAttention("操作失败"), hideLoader()), void 0)
            },
            error: function() {
                ShowAttention("操作失败"),
                hideLoader()
            }
        })
    }),
    $("#cancelcollect").on("tap",
    function() {
        showLoader("取消收藏店铺...");
        var a = $(this).attr("collect_id");
        $.ajax({
            type: "POST",
            url: "/index.php?r=lewaimaicollect/cancel&collect_id=" + a,
            dataType: "json",
            cache: !1,
            success: function(a) {
                return "error" == a.status ? (ShowAttention(a.message), hideLoader(), void 0) : ("success" == a.status ? (ShowAttention(a.message), hideLoader(), $("#addcollect").show(), $("#cancelcollect").hide()) : (ShowAttention("操作失败"), hideLoader()), void 0)
            },
            error: function() {
                ShowAttention("操作失败"),
                hideLoader()
            }
        })
    });
    var b = function() {
        WeixinJSBridge.on("menu:share:timeline",
        function() {
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: shareimg,
                img_width: "120",
                img_height: "120",
                link: window.location.href,
                desc: "",
                title: shareshopname
            },
            function(b) {
                "share_timeline:ok" == b.err_msg && a()
            })
        })
    };
    document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", b, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", b), document.attachEvent("onWeixinJSBridgeReady", b))
}),
$(function() {
    var a = JSON.parse(storage.getItem("shopliststatus_" + admin_id));
    a ? $("#page-index .header-back").on("click",
    function() {
        window.location.href = a.url
    }) : $("#page-index .header-back").hide(),
    $(".module").on("tap",
    function() {
        var a = $(this).attr("href");
        window.location.href = a
    }),
    $("#gogooglemap.shopinfo-item").on("tap",
    function() {
        window.location.href = "/app.php?c=show&a=googlemap&shop_id=" +shop_id
    }),
    $("#call_btn").on("tap",
    function() {
        window.location.href = "tel:" + $("#shopphonevalue").html()
    }),
    $("#call_qq").on("tap",
    function() {
        window.location.href = "http://wpa.qq.com/msgrd?v=3&uin=" + $("#shopqqvalue").html() + "&site=qq&menu=yes"
    }),
    $(".comment-zan").live("tap",
    function() {
        zancomment("zan", this)
    }),
    $(".comment-cai").live("tap",
    function() {
        zancomment("cai", this)
    }),
    $(".more-comment").on("tap",
    function() {
        window.location.href = "app.php?c=comment&a=lists&admin_id=" + admin_id + "&shop_id=" + shop_id+"&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername
    })
}),
$(function() {
    UpdateStorageFoodInfo(),
    $(".search-btn-layout").on("tap",
    function() {
        $("#order-content-mask").show(),
        $(".search-layout").show()
    }),
    $(".search-layout #search-btn").on("tap",
    function() {
        var a = $("#search-input").val();
        "" == a ? ShowAttention("搜索内容不能为空") : SearchFood(a)
    }),
    $("#complete-btn").on("click",
    function() {
        showOrder()
    }),
    $(".typelist-item").on("tap",
    function() {
        var b, a = $(this).attr("id");
        $(".typelist-item.active").removeClass("active"),
        $(this).addClass("active"),
        b = a.substr(9),
        selectTypeId = b,
        RefreshFoodlist()
    }),
    $(".foodsecondtype").live("tap", ChangeFoodSecondType),
    $(".big-plus").live("tap", big_plus_click),
    $(".op-small-plus").live("tap", small_plus_click),
    $(".op-small-delete").live("tap", small_delete_click),
    $(".searchresult-bigplus").live("tap", search_big_plus_click),
    $(".searchresult-plus").live("tap", search_small_plus_click),
    $(".searchresult-delete").live("tap", search_small_delete_click),
    $(".foodimage img").live("tap", ShowFoodinfo),
    $(".foodimage .foodimage-default").live("tap", ShowFoodinfo),
    $(".foodcontent .foodname").live("tap", ShowFoodinfo),
    $(".closefoodinfo").live("tap", HideFoodinfo),
    $("#goshopcart").on("click",
    function() {
        location.hash = "cart"
    }),
    $(".searchresult_foodname").live("tap", ShowFoodinfo),
    $(".foodnature-value").live("tap", ChangeFoodNature),
    $(".ordernotice-close-icon").live("tap",
    function() {
        $("#shop_notices").remove(),
        $("#order-content").css("top", "0")
    })
}),
$(function() {
    $(".cart-plus").live("tap", cart_plus_click),
    $(".cart-delete").live("tap", cart_delete_click),
    $("#gopay").on("tap", gopay),
    $(".selftaketype").live("tap",
    function() {
        $(this).attr("id") != $(".selftaketype.active").attr("id") && ("quhuofangshi-dianjiapeisong" == $(this).attr("id") ? ($("#quhuofangshi-daodianziqu").removeClass("active"), $("#quhuofangshi-dianjiapeisong").addClass("active"), selftake = 0, $("#delivertimebox").show()) : "quhuofangshi-daodianziqu" == $(this).attr("id") && ($("#quhuofangshi-dianjiapeisong").removeClass("active"), $("#quhuofangshi-daodianziqu").addClass("active"), selftake = 1, $("#delivertimebox").hide()), UpdateCartPriceShow(), cartIScroll.refresh())
    })
}),
$(function() {
    $("#page-pay .header-back").on("click",
    function() {
        location.hash = "cart"
    }),
    $(".paytype-text").on("tap", paytypeclick),
    $("#getcaptcha").on("tap", sendCaptcha),
    $(".closephonecode").live("tap", HidePhonecode),
    $("#phonecode-submit").live("tap", phonecodesubmit),
    $("#submitorder").on("tap", submit),
    $(".mergeorder-directpay").on("tap",
    function() {
        $(".mergeorder-directpay.active").removeClass("active"),
        $(this).addClass("active"),
        "mergeorder-directpay" == $(this).attr("id") ? $(".mergeorder-layout").hide() : $(".mergeorder-layout").show(),
        payIScroll.refresh()
    }),
    $(".mergeorder-layout").on("tap", showMergelist),
    $("#chooseaddress").on("tap", showChooseaddress),
    180 > init_time && (wait = 180 - init_time, CaptchaTime())
}),
$(function() {
    $("#myorder").on("tap",
    function() { //app.php?c=user&a=pointcenter&admin_id=1&customer_id=9&wxusername=oQdbEt8Cqr9WJy3CmojjGTaNh_wE&shop_id=63
        window.location.href = "/app.php?c=user&a=orderhistory&admin_id=" + admin_id + "&customer_id=" +lewaimai_customer_id+"&wxusername="+wxusername+"&shop_id="+shop_id;
    }),
    $("#mymail,#mymail1").on("tap",
    function() {
        window.location.href = "app.php?c=box&a=boxlist&admin_id=" + admin_id + "&shop_id=" + shop_id+"&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername;
    }),
    $("#_pert_signin").on("tap",
    function() {
        window.location.href = "/index.php?r=lewaimaisignin/index&adminId=" + admin_id
    }),
    $(".usercenter-top-userinfo-layout").on("tap",
    function() {
        window.location.href = "app.php?c=user&a=userinfo&admin_id=" + admin_id +"&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername+"&shop_id="+shop_id;
    }),
    $(".usercenter-top-arrow").on("tap",
    function() {
        window.location.href = "app.php?c=user&a=userinfo&admin_id=" + admin_id +"&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername+"&shop_id="+shop_id;
    }),
    $("#member,#member1").on("tap",
    function() {
        window.location.href = "/app.php?c=user&a=membercenter&admin_id=" + admin_id +"&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername+"&shop_id="+shop_id;
    }),
    $("#point,#point1").on("tap",
    function() {
        window.location.href = "app.php?c=user&a=pointcenter&admin_id=" + admin_id +"&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername+"&shop_id="+shop_id;
    }),
    $("#usercenter-coupon,#usercenter-coupon1").on("tap",
    function() {
        window.location.href = "/app.php?c=user&a=giftcenter&admin_id="+ admin_id+"&customer_id="+lewaimai_customer_id+"wxusername="+wxusername+"&shop_id"+shop_id;
    }),
    $("#usercenter-gift").on("tap",
    function() {
        window.location.href = "/index.php?r=lewaimaiuser/award&adminId=" + admin_id
    })
}),
$(function() {
    $(".ordersuccess-continuepay").on("tap",
    function() {
        location.hash = "order"
    }),
    $(".ordersuccess-showdetail").on("tap",
    function() {
        window.location.href = "app.php?c=user&a=orderinfo&order_id=" + success_order_id + "&customer_id="+lewaimai_customer_id+"&wxusername="+wxusername+"&shop_id="+shop_id
    })
}),
$(function() {
    $("#page-mergelist .header-back").on("click",
    function() {
        location.hash = "pay"
    }),
    $(".mergeorder-infoselect-mergelist").on("tap",
    function() {
        $(".mergeorder-infoselect-mergelist.active").removeClass("active"),
        $(this).addClass("active"),
        "mergeorder-infoselect-mergelist" == $(this).attr("id") ? ($("#mergeorder-mergelist-layout").show(), $("#mergeorder-mergeinfo-layout").hide(), $(".add-merge").show()) : ($("#mergeorder-mergelist-layout").hide(), $("#mergeorder-mergeinfo-layout").show(), $(".add-merge").hide()),
        mergeIScroll.refresh()
    }),
    $(".mergeorder-mergeitem-join").live("tap",
    function() {
        mergeorder_id = $(this).attr("mergeordreid"),
        setTimeout(function() {
            location.hash = "pay"
        },
        500)
    }),
    $(".add-merge").on("tap",
    function() {
        showAddmerge()
    })
}),
$(function() {
    $("#page-addmerge .header-back").on("click",
    function() {
        showMergepage()
    }),
    $(".submit-add-merge").on("tap", submitaddmerge)
}),
$(function() {
    $("#page-chooseaddress .header-back").on("click",
    function() {
        showPay()
    }),
    $(".add-address").on("tap",
    function() {
        showAddaddress()
    }),
    $("#page-chooseaddress .edit-btn").on("tap",
    function() {
        $(this).hide(),
        $(".address-addresslist-item i").hide(),
        $("#page-chooseaddress .finish-btn").show(),
        $(".address-addresslist-item em").show()
    }),
    $("#page-chooseaddress .finish-btn").on("tap",
    function() {
        $(this).hide(),
        $(".address-addresslist-item em").hide(),
        $("#page-chooseaddress .edit-btn").show(),
        $(".address-addresslist-item i").show()
    }),
    $(".address-addresslist-item").live("tap",
    function() {
        var a, b, c, d;
        if (!$(".address-addresslist-item em").is(":visible")) {
            a = $(this).find(".chooseaddress-addressitem-name").children("span").html(),
            b = $(this).find(".chooseaddress-addressitem-phone").children("span").html(),
            c = $(this).find(".chooseaddress-addressitem-choose-address").children("span").html(),
            $("#name").html(a),
            $("#phone").html(b),
            $("#address").html(c);
            for (d in addresslist) addresslist[d].isactive = !1;
            addresslist[$(this).attr("address_id")].isactive = !0,
            showPay()
        }
    }),
    $(".address-addresslist-item em").live("tap",
    function() {
        var a = $(this),
        b = a.parent().attr("address_id");
        showLoader("正在删除地址..."),
        $.ajax({
            type: "POST",
            url: "app.php?c=cart&a=deleteaddress&id=" + b,
            dataType: "json",
            data: $("form#addaddress_form").serialize(),
            cache: !1,
            success: function(c) {
                var d, e;
                if ("ok" == c.status) {
                    hideLoader(),
                    d = new Array;
                    for (e in addresslist) parseInt(e) != parseInt(b) && (d[e] = addresslist[e]);
                    addresslist = d,
                    a.parent().remove()
                } else hideLoader(),
                ShowAttention(c.message)
            },
            error: function() {
                hideLoader(),
                ShowAttention("连接服务器出错，删除地址失败！")
            }
        })
    })
}),
$(function() {
    $("#page-addaddress .header-back").on("click",
    function() {
        showAddresspage()
    }),
    $(".submit-add-address").on("tap", submitaddaddress)
}),
$(function() {
    "" == location.hash && (location.hash = pagehash),
    "#merge" == location.hash && (location.hash = "pay"),
    window.onhashchange = function() {
        updatePage()
    },
    updatePage()
});