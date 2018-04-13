'use strict';

// 引入文件


// 2、使用
require(['config'], function () {

    require(['jquery', 'header', 'common'], function ($) {

        // 通过Ajax向后端获取数据初始化界面
        $.ajax({
            url: '../api/goodslist.php',
            data: {
                type: 'init'
            }
        })
        // 界面初始化
        .then(function (data) {

            var res = JSON.parse(data);
            // 初始化热销界面
            hotFloor(res.h, 1, 0, 10);

            // 初始化猜你喜欢界面
            loveContent(res.cd, 'love');

            // 初始化商品界面
            initGoods(res.g);
        });

        // 封一个商品界面函数
        function initGoods(res) {
            var $list = $('.list');
            var $mainL = $('#main-l');
            // 创建商品容器ul
            var $goods = $('<ul></ul>');
            $goods.addClass('goods');
            var $res = res.data.map(function (item) {
                return '<li id=' + item.id + '>\n                            <a >\n                                <img src=' + item.imgurl + '  />\n                                <b>' + item.des + '</b>\n                                <p>\n                                    <i>\uFFE5' + item.saleprice + '</i>\n                                    \uFFE5' + item.ourprice + '\n                                </p>\n                                <font>\n                                    \u6708\u9500' + item.salecount + '\u4EF6\n                                </font>\n                            </a>\n                        </li>';
            });

            // 添加到界面
            $goods.html('');
            $goods.append($res);
            $list.html('');
            $list.append($goods);

            // 创建分页界面
            var $page = $('.page');
            var $span = $('<span></span>');
            $span.addClass('page-num');
            // 创建分页：用总数除以数量
            var pageLen = Math.ceil(res.total / res.qty);
            for (var i = 0; i < pageLen; i++) {
                var $a = $('<a></a>');
                $a.html(i + 1);
                if (i === res.page - 1) {
                    $a.addClass('curr');
                }
                $span.append($a);
            }

            $page.html('');
            $page.append($span);

            // 搜索数量
            var $span2 = $('<span></span>');
            $span2.addClass('page-set');
            var em = '<em>\n                        \u5171<i id="page-total">' + pageLen + '</i>\u9875\n                        <input type="text" value="1" id="page-count"/>\n                    </em>\n                    <a href="javasript:void(0);" id="btn-set">\u786E\u5B9A</a>';
            $span2.append(em);
            $page.append($span2);
        }

        // 封一个热销界面函数
        function hotFloor(h, num, star, end) {
            var hLen = h.slice(star, end);
            var $h = '#hot-floor' + num;
            var $hotSale = $($h);
            var html_h = $('<div class="hot-title">\n                            <h2>\u672C\u6708\u70ED\u9500\u699C</h2>\n                        </div>');
            $hotSale.append(html_h);

            // 商品
            var $hotContent = $('<ul></ul>');
            $hotContent.addClass('hot-content');
            var idx = 'hot-content' + num;
            $hotContent.attr('id', idx);
            var $res = hLen.map(function (item) {
                return '<li id=' + item.id + '>\n                            <a >\n                                <i></i>\n                                <img src=' + item.imgurl + ' />\n                                <b>' + item.des + '</b>\n                                <em>\uFFE5' + item.ourprice + '</em>\n                            </a>\n                        </li> ';
            });
            $hotContent.append($res);
            $hotSale.append($hotContent);
            var e = '#' + idx;
            var $is = $(e).find('i');
            $is.eq(0).addClass('i1').text('1');
            $is.eq(1).addClass('i2').text('2');
            $is.eq(2).addClass('i3').text('3');
        }

        // 封一个猜你喜欢title函数
        function loveTitle(type) {
            if (type == 'love') {
                var $loveTitle = $('#love-title');
                // 生成title
                var h2 = $('<h2 class="title">猜你喜欢</h2>');
                $loveTitle.append(h2);
            }
        }
        loveTitle('love');
        // 封一个猜你喜欢content函数
        function loveContent(res, type) {
            var $type = '#' + type;
            var $content = '#' + type + '-content';
            var $countDown = $($type);
            var $countContent = $($content);
            // 生成数据
            var gid = 'goods-box-' + type;
            var $goodsBox = $('<ul ></ul>');
            $goodsBox.attr('id', gid);
            $goodsBox.addClass('goods-box');

            // 生成左右箭头
            var pid = 'goods-prev-' + type;
            var nid = 'goods-next-' + type;
            var $goodsPrev = $('<a class="goods-prev" ></a>');
            var $goodsNext = $('<a class="goods-next" ></a>');
            $goodsPrev.attr('id', pid);
            $goodsNext.attr('id', nid);

            // 获取数据生成html结构
            var $html = res.map(function (item) {
                return '<li id=' + item.id + '>\n                            <a >\n                                <img src=' + item.imgurl + ' />\n                                <span>' + item.off + '\u6298</span>\n                                <b>' + item.des + '</b>\n                                <font>\uFFE5' + item.ourprice + '<i>\uFFE5' + item.saleprice + '</i></font>\n                                <strong>\u7ACB\u5373\u62A2\u8D2D</strong>\n                            </a>\n                        </li>';
            });
            $countContent.append($goodsBox.append($html));
            $countDown.append($goodsPrev);
            $countDown.append($goodsNext);

            // 封一个左右滚动的函数
            scroll(gid, pid, nid);
            function scroll() {
                var index = 0;
                var g = '#' + gid;
                var p = '#' + pid;
                var n = '#' + nid;

                var $prev_g = $(p);
                var $next_g = $(n);
                var $goodsBox = $(g);
                var $imgLen = $goodsBox.children('li').length;
                var $len = $goodsBox.children('li').outerWidth(true) * 5;
                var $num = $imgLen / 5;
                $goodsBox.css({ width: $imgLen * $len });
                var bos = $goodsBox.width();
                $next_g.on('click', function () {
                    index++;
                    run();
                });
                $prev_g.on('click', function () {
                    index--;
                    run();
                });
                function run() {
                    if (index >= $num) {
                        index = $num - 1;
                    } else if (index <= 0) {
                        index = 0;
                    }
                    $goodsBox.stop().animate({ left: -$len * index });
                }
            }
        }

        // 封一个发送分页的函数
        function send(pageNo) {
            $.ajax({
                url: '../api/goodslist.php',
                data: {
                    page: pageNo
                }
            }).then(function (data) {
                var res = JSON.parse(data);
                initGoods(res.g);
            });
        }
        // 操作分页
        var $page = $('#main-l');
        $page.on('click', '.page-num a', function () {
            var pageNo = this.innerText;
            send(pageNo);
        })
        // 操作数量搜索
        .on('click', '.page-set a', function () {
            // 获取输入的值
            var $num = $('#page-count').val();
            // 获取总数量
            var $total = $('#page-total').text();
            if ($num * 1 >= $total * 1 || $num * 1 < 1) {
                // alert('输入有误');
                return;
            }
            send($num);
        });

        // 商品排序
        // let $filter = $('#filter');
        var $last = $('.on');
        var $filter = $last.siblings();
        $filter.on('click', function () {
            // 排他
            $(this).addClass('curr');
            $(this).siblings().removeClass('curr');
            console.log();
            var $type = $(this).text();
            $.ajax({
                url: '../api/goodslist.php',
                data: {
                    type: $type
                }
            }).then(function (data) {
                var res = JSON.parse(data);
                initGoods(res.g);
            });
        });
        // 封一个价格搜索的函数
        function searchPrice() {
            var $btnSearch = $('#btn-price-search');
            // 获取输入的值

            $btnSearch.on('click', function () {
                var _min = $('#min-price').val();
                var _max = $('#max-price').val();
                if (_min == 0 || _max == 0) {
                    return;
                }
                console.log($btnSearch, _min, _max);
                $.ajax({
                    url: '../api/goodslist.php',
                    data: {
                        type: '搜索',
                        min: _min,
                        max: _max
                    }
                }).then(function (data) {
                    console.log(data);
                    var res = JSON.parse(data);
                    initGoods(res.g);
                });
            });
        }
        searchPrice();

        // 商品选择
        var $term = $('#term');
        $term.on('click', 'a', function () {
            console.log($(this).text());
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var $name = $(this).text();
            $.ajax({
                url: '../api/goodslist.php',
                data: {
                    type: '选择',
                    name: $name
                }
            }).then(function (data) {
                var res = JSON.parse(data);
                console.log(res.g);
                initGoods(res.g);
            });
        });

        // 封一个更多操作函数
        function showMore(name) {
            var type = '#btn-' + name;
            var $btn = $(type);
            var $par = $btn.closest('.term-top');
            $par.css({ height: 58 });
            $btn.on('click', function () {
                if ($par.height() == 58) {
                    $par.animate({ height: 116 });
                    $(this).addClass('curr');
                    $(this).text('收起');
                } else {
                    $par.animate({ height: 58 });
                    $(this).removeClass('curr');
                    $(this).text('更多');
                }
            });
        }
        showMore('up');
        showMore('down');

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

        // 封一个跳转到商品详情函数
        function toDetails() {
            // 主要商品数据
            var $list = $('.list');
            $list.on('click', 'li', function () {
                console.log($(this).attr('id'));
                var $id = $(this).attr('id');
                var $type = 'goodslist';
                console.log($id);
                location.href = '../html/details.html?id=' + $id + '&type=' + $type;
            });

            // 热销商品数据
            var $hots = $('.hot-sale');
            $hots.on('click', 'li', function () {
                var $id = $(this).attr('id');
                var $type = 'index_hot';
                console.log($id);
                location.href = '../html/details.html?id=' + $id + '&type=' + $type;
            });

            // 猜你喜欢数据
            var $loveContent = $('#love-content');
            $loveContent.on('click', 'li', function () {
                var $id = $(this).attr('id');
                var $type = 'index_countdown';
                console.log($id);
                location.href = '../html/details.html?id=' + $id + '&type=' + $type;
            });
        }
        toDetails();
    });
});