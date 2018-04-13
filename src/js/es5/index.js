'use strict';

// 引入文件
require(['config'], function () {
    require(['jquery', 'fcarousel', 'header', 'common'], function ($) {
        // 主体轮播图函数
        function mainBanner() {
            var banner_focus = $('#banner-focus');
            banner_focus.fCarousel({
                imgs: ['../img/banner_img1.jpg', '../img/banner_img2.jpg', '../img/banner_img3.jpg', '../img/banner_img4.jpg'],
                type: 'fade',
                width: 715,
                height: 380,
                duration: 5000
            });
        }
        mainBanner();

        /**
         *  通过ajax向后端获取数据初始化界面
         */
        $.ajax({
            url: '../api/index.php'
        }).then(function (data) {
            // 转化
            var res = JSON.parse(data);

            // 处理限时抢购商品数据
            countContent(res.cd, 'count');
            countContent(res.cd, 'love');

            // 处理轮播图商品数据：
            bannerFloor(res.f, 1, '1F 品质家居');
            bannerFloor(res.f, 2, '2F 美装个护');
            bannerFloor(res.f, 3, '3F 服饰美饰');
            bannerFloor(res.f, 4, '4F 食品保健');
            bannerFloor(res.f, 5, '5F 生活电器');

            // 处理今日热销商品数据:第一楼
            hotFloor(res.h, 1, 0, 5);
            hotFloor(res.h, 2, 5, 10);
            hotFloor(res.h, 3, 10);
            hotFloor(res.h, 4, 10);
            hotFloor(res.h, 5, 10);
        });

        // 封一个倒计时title界面函数
        function countTitle(type) {
            if (type == 'love') {
                var $loveTitle = $('#love-title');
                // 生成结构
                var h2 = $('<h2 class="title">猜你喜欢</h2>');
                $loveTitle.append(h2);
            } else if (type == 'time') {
                var showTime = function showTime() {
                    // let offset = Date.parse(endTime) - Date.now();
                    var offset = endTime2 - Date.now();

                    offset = Math.floor(offset / 1000);

                    if (offset <= 0) {
                        clearInterval(timer);
                    }

                    var sec = offset % 60;
                    var min = Math.floor(offset / 60) % 60;
                    var hour = Math.floor(offset / 60 / 60) % 24;

                    // 补零
                    sec = sec < 0 ? '0' + sec : sec;
                    min = min < 0 ? '0' + min : min;
                    hour = hour < 0 ? '0' + hour : hour;

                    // 写入界面
                    $h.text(hour);
                    $m.text(min);
                    $s.text(sec);
                };

                var $countTitle = $('#count-title');
                // 生成结构
                var _h = $('<h2 class="title">限时抢购</h2>');
                var temp = '<span class="run-time" id="run-time">\u8DDD\u79BB\u672C\u573A\u7ED3\u675F\u8FD8\u6709\uFF1A\n                                <i class="h">9</i> \u65F6\n                                <i class="m">9</i> \u5206\n                                <i class="s">9</i> \u79D2\n                            </span>';
                var runTime = $(temp);
                _h.append(runTime);
                $countTitle.append(_h);

                var $h = $('#run-time').children('.h');
                var $m = $('#run-time').children('.m');
                var $s = $('#run-time').children('.s');

                // 指定结束时间
                var endTime = '2018-4-7 10:10:10';
                // 默认10个小时
                var endTime2 = Date.now() + 10 * 60 * 60 * 1000;
                // 显示倒计时
                showTime();
                var timer = setInterval(showTime, 1000);
            }
        }
        countTitle('time');
        countTitle('love');
        // 封一个倒计时content界面函数
        function countContent(res, type) {
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

        // 封一个轮播图商品函数
        function bannerFloor(res, num, title) {
            var selector = '#floor' + num;
            var $floor1 = $(selector);
            var r = res.slice(num - 1, num);
            var addTitle = '<div class="floor-title">\n                            <h2>' + title + '</h2>\n                        </div>';
            var $f = $(addTitle);
            $floor1.append($f);

            // 插入内容
            var $floorContent = $('<div></div>');
            $floorContent.addClass('floor-content');

            var $r = r.map(function (item) {
                return '<div class="left fl">\n                            <b><a ><img src=' + item.bigimg + ' /></a></b>\n                            <p>\n                                <a >\n                                    <img src=' + item.icon1 + ' />\n                                </a>\n                                <a >\n                                    <img src=' + item.icon2 + ' />\n                                </a>\n                                <a >\n                                    <img src=' + item.icon3 + ' />\n                                </a>\n                                <a >\n                                    <img src=' + item.icon4 + ' />\n                                </a>\n                                <a >\n                                    <img src=' + item.icon5 + ' />\n                                </a>\n                                <a >\n                                    <img src=' + item.icon6 + ' />\n                                </a>\n                            </p>\n                        </div>\n                        <div class="right fr">\n                                <div class="floor-1-banner" id="floor-' + num + '-banner"></div>\n                                <ul class="floor-1-ad">\n                                    <li>\n                                        <a >\n                                            <img src=' + item.ad1 + ' />\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a >\n                                            <img src=' + item.ad2 + ' />\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a >\n                                            <img src=' + item.ad3 + ' />\n                                        </a>\n                                    </li>\n                                </ul>\n                            </div>';
            });
            $floorContent.append($r);
            $floor1.append($floorContent);

            // 封一个轮播图函数：
            function loop(num) {
                var ele = '#floor-' + num + '-banner';
                var $loop = $(ele);
                var imgarr = [];
                imgarr.push(r[0].banner1);
                imgarr.push(r[0].banner2);
                $loop.fCarousel({
                    imgs: imgarr,
                    type: 'fade',
                    width: 580,
                    height: 310,
                    duration: 4000
                });
            }
            loop(num);
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

        // 封一个跳转到详情页函数
        function toDetals() {
            // 倒计时数据
            var $countContent = $('#count-content');
            $countContent.on('click', 'li', function () {
                var $id = $(this).attr('id');
                var $type = 'index_countdown';
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

            // 热销商品数据
            var $hots = $('.hot-sale');
            $hots.on('click', 'li', function () {
                var $id = $(this).attr('id');
                var $type = 'index_hot';
                console.log($id);
                location.href = '../html/details.html?id=' + $id + '&type=' + $type;
            });
        }
        toDetals();

        // 封一个跳转到商品列表页函数
        function toList() {
            var $floor = $('.floor-l');
            $floor.on('click', function () {
                location.href = '../html/goodslist.html';
            });
            var $imgLinks = $('#banner-focus').find('img');
            $imgLinks.on('click', function () {
                location.href = '../html/goodslist.html';
            });
        }
        toList();
    });
});