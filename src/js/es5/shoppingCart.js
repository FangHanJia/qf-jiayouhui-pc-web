'use strict';

require(['config'], function () {
    require(['jquery', 'header', 'common'], function () {

        // 获取页面元素
        var $showCart = $('.cart');
        // 默认隐藏
        $showCart.hide();

        // 获取用户登陆状态
        // 用户登陆状态
        var loginStatus = true;
        if (loginStatus) {
            var goodsCookie = function goodsCookie() {
                goodslist = Cookie.get('goodslist') || [];
                if (typeof goodslist == 'string') {
                    goodslist = JSON.parse(goodslist);
                }

                // 写进界面

                var $g_ul = $('<ul></ul>');
                var subTatol = 0;
                var tatolPrice = 0;
                var tatolNum = 0;
                var $res = goodslist.map(function (item, idx) {
                    // 总价
                    tatolPrice += item.qty * Number(item.ourprice);

                    // 总数量
                    tatolNum += item.qty;
                    // 小计
                    subTatol = item.qty * item.ourprice;

                    return '<li id=' + item.guid + '>\n                                <label for="">\n                                    <input type="checkbox" checked/>\n                                </label>\n                                <div>\n                                    <img src=' + item.img + ' />\n                                    <p class="text">' + item.des + '</p>\n                                    <p class="style"><i>\u989C\u8272\uFF1A\u5171\u540C</i><br /><i>\u6B3E\u5F0F\uFF1A\u5171\u540C</i></p>\n                                    <p class="ourprice"><i>' + item.ourprice + '</i></p>\n                                    <p class="num">\n                                        <label for="">\n                                            <i class="btn-reduce">-</i>\n                                            <input type="text" value=' + item.qty + '\n                                             class="goods-num"/>\n                                            <i class="btn-add">+</i>\n                                        </label>\n                                    </p>\n                                    <p class="xiaoji">\uFFE5' + subTatol + '</p>\n                                    <span class="btnDel">\u5220\u9664</span>\n                                </div>\n                            </li>';
                });

                $g_ul.append($res);
                $goodsList.html('');
                $goodsList.append($g_ul);

                $tatolPrice.text('￥' + tatolPrice);
                // 总数量
                $tatolNums.text(tatolNum);

                // 将总价和总数量传出去
                getNum(tatolPrice, tatolNum);
            };
            // 封一个接收商品总价和总数量函数


            var getNum = function getNum(tatolPrice, tatolNum) {
                // $tatolPrice.text(tatolPrice);
                // 全选操作
                $btnAll.on('click', function () {

                    $checkboxs.prop('checked', this.checked);
                    // 高亮全选行
                    $lis[this.checked ? 'addClass' : 'removeClass']('bg');

                    if (this.checked) {
                        // 总价
                        $tatolPrice.text('￥' + tatolPrice);
                        // 总数量
                        $tatolNums.text(tatolNum);
                    } else {
                        // 清空数据
                        // 总价
                        $tatolPrice.text('');
                        // 总数量
                        $tatolNums.text('');
                    }
                });
            };

            // 按钮事件委托
            //  1 删除按钮事件


            // 封一个遮罩窗居中函数
            var autoCenter = function autoCenter() {
                var x = (window.innerWidth - $center.outerWidth()) / 2;
                var y = (window.innerHeight - $center.outerHeight()) / 2;
                $center.css({
                    left: x,
                    top: y
                });
            };

            // 封一个全选按钮状态按钮函数
            var checkAll = function checkAll() {

                // 获取选中的复选框
                var $checkeds = $checkboxs.filter(':checked');

                // 判断复选框数量和选中的数量
                $btnAll.prop('checked', $checkeds.length == $checkboxs.length);
            };

            // 显示登陆界面
            $showCart.show();
            // 获取页面元素
            var $goodsList = $('.goodsList');
            var $tatolPrice = $('.tatol-price');
            var $tatolNums = $('.tatol-nums');
            // 全选按钮
            var $btnAll = $('#btnAll');

            var $checkboxs = void 0;

            // 全局cookie
            var goodslist = void 0;

            // 封一个读取商品cookie函数
            // 初始化
            goodsCookie();
            $goodsList.on('click', '.btnDel', function () {
                // 获取当前行
                var $currentLi = $(this).parents('li');
                // 当前行id
                var $id = $currentLi.attr('id');

                // 遍历拿到事件源的id
                for (var i = 0; i < goodslist.length; i++) {
                    if (goodslist[i].guid == $id) {
                        // 删除当前行id的cookie
                        goodslist.splice(i, 1);
                        break;
                    }
                }

                // 重新写入cookie
                Cookie.set('goodslist', JSON.stringify(goodslist) + ';path=/');

                // 刷新界面
                goodsCookie();

                // 读取全局cookie
                readCookie();

                return false;
            })
            // 2 减少按钮事件
            .on('click', '.btn-reduce', function () {
                // 获取当前行
                var $currentLi = $(this).parents('li');
                // 当前行id
                var $id = $currentLi.attr('id');

                // 遍历拿到事件源的id
                for (var i = 0; i < goodslist.length; i++) {
                    if (goodslist[i].guid == $id) {
                        // 对应商品cookie的qty减一
                        var count = goodslist[i].qty--;
                        if (count <= 1) {
                            // 小于1则删除该cookie
                            goodslist.splice(i, 1);
                        }
                        break;
                    }
                }

                // 重新写入cookie
                Cookie.set('goodslist', JSON.stringify(goodslist) + ';path=/');

                // 刷新界面
                goodsCookie();

                // 读取全局cookie
                readCookie();
                return false;
            })
            // 3 增加按钮事件
            .on('click', '.btn-add', function () {
                // 获取当前行
                var $currentLi = $(this).parents('li');
                // 当前行id
                var $id = $currentLi.attr('id');

                // 遍历拿到事件源的id
                for (var i = 0; i < goodslist.length; i++) {
                    if (goodslist[i].guid == $id) {
                        // 对应商品cookie的qty减一
                        var count = goodslist[i].qty++;
                        // 无限量
                        break;
                    }
                }

                // 重新写入cookie
                Cookie.set('goodslist', JSON.stringify(goodslist) + ';path=/');

                // 刷新界面
                goodsCookie();

                // 读取全局cookie
                readCookie();
                return false;
            });

            // 删除全部商品
            var $btnDelAll = $('#btnDelAll');
            var $mask = $('.mask');
            var $center = $mask.children('.center');
            var $btnYes = $center.children('.yes');
            var $btnNo = $center.children('.no');
            autoCenter();

            // 封一个自动适应界面的函数
            window.onresize = function () {
                autoCenter();
            };

            // 删除所有商品cookie事件
            $btnDelAll.on('click', function (e) {
                // 获取全选状态
                var isCheck = $btnAll.prop('checked');
                if (isCheck) {
                    // 弹出遮罩窗
                    $mask.show(function () {
                        $center.on('click', function (e) {
                            var target = e.target || e.srcElement;
                            if (target.className == 'yes') {
                                // 当用户点击确定时即可删除cookie
                                Cookie.remove('goodslist', '/');
                                // 刷新界面
                                goodsCookie();
                                // 读取全局cookie
                                readCookie();

                                // 隐藏弹窗
                                $mask.hide();
                                return false;
                            } else if (target.className == 'no') {
                                $mask.hide();
                            }
                        });
                    });
                } else {
                    return;
                }
            });
            $btnDelAll.on('mousemove', function (e) {
                // 阻止浏览器默认行为
                e.preventDefault ? e.preventDefault() : returnValue = false;
            });

            // 选中按钮操作
            // 获取元素
            var $lis = $goodsList.find('li');
            var $btnFx = $('#btnFx');
            $checkboxs = $(':checkbox').not('#btnAll');

            // 任意行高亮+勾选
            $goodsList.on('click', 'li', function () {
                // 高亮当前行
                $(this).toggleClass('bg')
                // 勾选复选框
                .find(':checkbox').prop('checked', $(this).hasClass('bg'));
                checkAll();
            });
        }

        // 封一个导航条显示隐藏函数
        this.timer = setInterval(function () {
            var $nav1 = $('#nav1');
            var $nav2 = $('#nav2');
            $nav1.addClass('cur');

            $nav2.css({ display: 'none' });
            $nav1.on('mouseover', function () {
                $nav2.show();
                $(this).removeClass('cur');
            }).on('mouseleave', function () {
                $nav2.hide();
                $nav1.addClass('cur');
            });
            if ($('#nav1')) {
                clearInterval(this.timer);
            }
        }, 500);
    });
});