'use strict';

// 商品cookie
var readCookie = void 0;

//用户cookie
var userCookie = void 0;

// 用户登陆状态
// let loginStatus;

var type = 'index';
// 封一个点击回到顶部效果函数
function toTop() {
    var $toTop = $('#toTop');
    var $win = $(window);
    $win.on('scroll', function () {
        var $sc = $win.scrollTop();
        var $rwidth = $win.width();
        if ($sc > 500) {
            $toTop.css({ display: 'block' });
        } else {
            $toTop.css({ display: 'none' });
        }
    });
    $toTop.on('click', function () {
        var $sc = $win.scrollTop();
        $('body,html').animate({ scrollTop: 0 }, 500);
    });
}

// 封一个顶部导航条鼠标移入事件
function showNav() {
    var $show_phone = $('.show_phone');
    $('#phone').on('mouseover', function () {
        $show_phone.show();
    }).on('mouseout', function () {
        $show_phone.hide();
    });
    var $show_weixin = $('.show_weixin');
    $('#weixin').on('mouseover', function () {
        $show_weixin.show();
    }).on('mouseout', function () {
        $show_weixin.hide();
    });
}

// 封一个购物车显示隐藏函数
function showCart() {
    var $goods_list = $('.goods-list');
    $('.shopping-cart').on('mouseover', function () {
        $goods_list.show();
        // console.log(this);
    }).on('mouseout', function () {
        $goods_list.hide();
    });
}

// 封一个商品分类函数
function showGoods() {
    var $nav2 = $('#nav2');

    // 处于首页时，直接显示
    if (type = 'index') {
        return;
    } else {
        $('#nav1').on('mouseover', function () {
            $nav2.show();
        }).on('mouseout', function () {
            $nav2.hide();
        });
    }
}
// 引进首页footer
$('#footer').load('../html/footer.html');
// 引进首页header
$('#header').load('../html/header.html', function () {
    toTop();
    showNav();
    showCart();
    showGoods();
    // userCookie();
});

// 封一个读取商品cookie函数
readCookie = function readCookie() {
    //获取cookie
    var goodslist = Cookie.get('goodslist') || [];
    if (typeof goodslist === 'string') {
        goodslist = JSON.parse(goodslist);
    }
    // 获取购物车的元素
    var $topCount = $('#top-count');
    var $shopCart = $('.shopping-cart');
    var $goosList = $shopCart.find('.goods-list');
    var $goodsNums = $shopCart.find('.goods-nums');
    var $ul = $('<ul></ul>');
    var $toCart = $('<a href="../html/shoppingCart.html"></a>');
    $toCart.addClass('toCart');
    $toCart.text('去购物车');
    $ul.addClass('ul-box');
    var topQty = 0;
    var $res = goodslist.map(function (goods) {
        topQty += Number(goods.qty);
        return '<li>\n                    <img src="../' + goods.img + '"/>\n                    <p class="des"> ' + goods.des + '</p >\n                    <p>' + goods.ourprice + '&times;' + goods.qty + '</p>\n                </li>';
    });
    $goodsNums.text(topQty);
    $topCount.text(topQty);
    $ul.append($res);
    $goosList.html('');
    $goosList.append($ul);
    $goosList.append($toCart);
};

var timer = setInterval(function () {
    var $signIn = $('.sign-in');
    if ($signIn) {
        clearInterval(timer);
        userCookie($signIn);
    }
}, 500);
// 封一个读取用户cookie函数
userCookie = function userCookie(s) {
    if (s) {
        // 获取顶部元素
        var $topName = $('#top-name');
        var $signOut = $('#sign-out');
        // 读取cookie
        var userInfo = Cookie.get('userInfo') || [];
        if (typeof userInfo == 'string') {
            userInfo = JSON.parse(userInfo);
        }
        // 判断cookie是否存在
        if (userInfo.length > 0) {
            // 用户名
            var userName = userInfo[0].phone;
            if (userName) {
                $topName.hide();
                var $a = $('<a></a>');
                var $i = $('<i></i>');
                $a.html('你好！' + userName);
                $i.html('退出');
                $i.addClass('btnOut');
                $signOut.append($a);
                $signOut.append($i);

                // 显示购物车cookie
                readCookie();
                var $p = $('<p></p>');
                $p.addClass('name');
                $p.text('你好！' + userName);
                s.append($p);
                s.show();
                s.next('div').hide();
            }
        }
        // 退出登陆:
        var $btnOut = $signOut.find('i');
        $btnOut.on('click', function () {
            $signOut.hide();
            $topName.show();

            s.next('div').show();
            s.hide();
            // 删除cookie
            // Cookie.remove('userInfo');
        });
    }
};