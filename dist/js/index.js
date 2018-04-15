'use strict';

/**
 * [生成任意范围内随机整数的函数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 * @return {Number}     [返回值]
 */
function randomNumber(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
}

/**
 * [生成随机颜色函数]
 * @return {String} [返回rgb格式颜色]
 */
function randomColor() {
    // 16进制：#ddd
    // rgb(255,222,66);

    // var r = parseInt(Math.random()*256);
    // var g = parseInt(Math.random()*256);
    // var b = parseInt(Math.random()*256);

    // 使用其它封装
    var r = randomNumber(0, 255);
    var g = randomNumber(0, 255);
    var b = randomNumber(0, 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')'; //rgb(225,225,88)
}

/**
 * [生成16进制随机颜色函数]
 * @return {String} [返回16进制格式颜色代码]
 */
function rColor() {
    var str = '0123456789abcdefghjklmnopqrstuvwxyz'; //15

    var res = '';

    for (var i = 0; i < 4; i++) {
        res += str[parseInt(Math.random() * str.length)];
    }

    return res;
}

var Element = {
    /*
        获取元素（过滤文本节点）
     */
    get: function get(nodes) {
        var res = [];

        // 遍历所有节点
        for (var i = 0; i < nodes.length; i++) {
            // 找出元素节点并写入res
            if (nodes[i].nodeType === 1) {
                res.push(nodes[i]);
            }
        }

        // 返回元素节点
        return res;
    },

    // 传入一个元素，获取它的子元素
    children: function children(ele) {
        var nodes = ele.childNodes;

        var res = [];

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType === 1) {
                res.push(nodes[i]);
            }
        }

        return res;
    },
    // 获取前一个元素节点
    next: function next(ele) {},

    // 获取后一个元素节点
    prev: function prev(ele) {},

    // 把new 插入old的后面
    insertAfter: function insertAfter(newNode, old) {}

    // Element.get(list.childNodes);//7->3

    /**
     * [获取元素样式，兼容IE8-]
     * @param  {Element} ele [获取样式的元素]
     * @param  {String} key [css属性]
     * @return {String}     [返回key对应的属性值]
     */
};function getCss(ele, key) {
    // 思路：判断浏览器是否支持这个方法
    if (window.getComputedStyle) {
        // 标准浏览器
        return getComputedStyle(ele)[key];
    } else if (ele.currentStyle) {
        // IE8-
        return ele.currentStyle[key];
    } else {
        // 
        return ele.style[key];
    }
}

// getCss(box,'font-size');//16px

/**
 * [绑定事件函数，兼容IE8-]
 * @param  {Element}  ele       [绑定事件的元素]
 * @param  {String}  type      [事件名]
 * @param  {Function}  handler   [事件处理函数]
 * @param  {[Boolean]} isCapture [是否捕获]
 */
function bind(ele, type, handler, isCapture) {
    // 优先使用事件监听器
    if (ele.addEventListerner) {
        // 标准浏览器
        ele.addEventListerner(type, handler, isCapture);
    } else if (ele.attachEvent) {
        // IE8-
        ele.attachEvent('on' + type, handler);
    } else {
        // DOM节点绑定方式
        ele['on' + type] = handler;
    }
}

// bind(ele,'click',function(){},true);


/*
    Cookie操作
    * 增
    * 删
    * 查
    * 改
 */
var Cookie = {
    /**
     * [获取cookie]
     * @param  {String} key [cookie名]
     * @return {String}      [返回cookie自]
     */
    get: function get(key) {
        // 先获取所有cookie
        var cookies = document.cookie;
        if (cookies.length === 0) {
            return '';
        }

        // 拆分每一个cookie
        cookies = cookies.split('; ');

        for (var i = 0; i < cookies.length; i++) {
            // 拆分key,value
            var arr = cookies[i].split('=');

            if (arr[0] === key) {
                return arr[1];
            }
        }
    },

    /**
     * [设置/修改cookie]
     * @param {String} key   [cookie名]
     * @param {String} value [cookie值]
     * @param {[Date]} date  [有效期，必须为Date类型]
     * @param {[String]} path  [cookie保存路径]
     */
    set: function set(key, value, date, path) {
        var str = key + '=' + value;

        // 有效期
        if (date) {
            str += ';expires=' + date.toUTCString();
        }

        // 路径
        if (path) {
            str += ';path=' + path;
        }

        document.cookie = str;
    },

    /**
     * [删除cookie]
     * @param  {String} key [cookie名]
     * @param {[String]} path     [cookie保存的路径]
     */
    remove: function remove(key, path) {
        var d = new Date();
        d.setDate(d.getDate() - 1);

        // document.cookie = key + '=x;expires=' + d.toUTCString();
        this.set(key, 'x', d, path);
    },

    // 清空cookie
    clear: function clear() {}
    /**
     * [动画函数]
     * @param  {Element} ele    [动画元素]
     * @param  {Object} opt   [动画属性集合]
     * @param  {Function} callback   [回调函数]
     */
};function animate(ele, opt, callback) {
    // 记录动画的数量
    var timerLen = 0;

    // 遍历opt，获取所有attr和target
    for (var attr in opt) {
        timerLen++;

        createTimer(attr);
    }

    function createTimer(attr) {
        var target = opt[attr];

        // 设置定时器的名字与attr关联
        var timerName = attr + 'timer'; //widthtimer,heighttimer,toptimer


        // 清除定时器，避免多个定时器用作于一个效果
        clearInterval(ele[timerName]);

        ele[timerName] = setInterval(function () {
            // 获取当前值
            var current = getCss(ele, attr); //100px,45deg,0.5(string)

            // 提取单位
            var unit = current.match(/[a-z]+$/i); //[0:px,index:6,input:current],null

            // 三元运算实现提取单位
            unit = unit ? unit[0] : '';

            // 提取值
            current = parseFloat(current);

            // 计算缓冲速度
            var speed = (target - current) / 10; //0.5=>1,-0.5=>-1


            // 避免速度为小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //1,-1

            // 针对opacity进行操作
            if (attr === 'opacity') {
                speed = speed > 0 ? 0.05 : -0.05;
            }

            // 根据速度改变当前值
            current += speed;

            // 当到达目标指时
            if (current === target || speed === 0) {
                clearInterval(ele[timerName]);

                // 避免超出target的范围
                current = target;

                // 每一个动画完成数量减一
                timerLen--;

                //动画结束后执行回掉函数
                // if(timerLen===0 && typeof callback === 'function'){
                //  callback();
                // }

                if (timerLen === 0) {
                    typeof callback === 'function' && callback();
                }
            }

            ele.style[attr] = current + unit;
        }, 30);
    }
}
'use strict';

// 1、配置文件
require.config({
    // 配置别名
    paths: {
        jquery: '../lib/jquery-3.2.1',
        fcarousel: '../lib/jquery-fcarousel/jquery.fCarousel',
        fzoom: '../lib/jquery-fzoom/jquery.fZoom',
        header: 'header',
        common: 'common'
    },
    // 配置依赖
    shim: {
        fcarousel: ['jquery'],
        header: ['jquery'],
        fzoom: ['jquery']
    }
});
'use strict';

require(['config'], function () {
    require(['jquery', 'header', 'fzoom', 'common'], function () {
        // 获取url
        var url = location.search;
        // 截取数据
        url = url.slice(1);
        url = url.split('&');
        var obj = {};
        for (var i = 0; i < url.length; i++) {
            var arr = url[i].split('=');
            obj[arr[0]] = arr[1];
        }

        // 像后端获取数据
        $.ajax({
            url: '../api/details.php',
            data: {
                type: obj.type,
                id: obj.id
            }
        }).then(function (data) {
            var res = JSON.parse(data);
            // 提取图片

            zoom(res);
            // 商品信息
            showMsg(res);
        });
        // 封一个放大镜的函数
        function zoom(i) {
            // 图片数据
            // let arr = ['../img/count-down-img11.jpg','../img/count-down-img10.jpg']
            var $imgBox = $('.img-box');
            var $ul = $('<ul></ul>');
            var $res = i.map(function (item) {
                return '<li>\n                            <img src=' + item.imgurl + ' />\n                        </li>';
            });
            // 生成图片列表
            $ul.append($res);
            $imgBox.append($ul);
            $('#small').fZoom();
        }

        // 封一个商品信息函数
        function showMsg(res) {
            // 显示标题
            var $des = $('#des');
            $des.text(res[0].des);

            // 显示价格
            var $price = $('.price');
            $price.children('b').text(res[0].ourprice);
            $price.children('em').text(res[0].saleprice);

            // 显示编号
            var $guid = $('.guid');
            $guid.children('span').text(res[0].id);

            // 月销量
            var $saleCount = $('.sale-count');
            $saleCount.children('span').text(res[0].salecount + ' 件');
            // 商品数量
            var $buyCount = $('#buy-count');

            // 封一个商品数量加减函数
            function goodsNum() {
                var $number = $('.number');
                var $jian = $('#jian');
                var $add = $('#add');

                _buyCount = $buyCount.val();
                // 数量加减操作
                $jian.on('click', function () {
                    // 获取输入框的值
                    _buyCount--;
                    if (_buyCount <= 1) {
                        _buyCount = 1;
                    }
                    $buyCount.val(_buyCount);
                    console.log(_buyCount);
                });
                $add.on('click', function () {
                    // 获取输入框的值
                    _buyCount++;
                    $buyCount.val(_buyCount);
                    console.log(_buyCount);
                });
            }
            goodsNum();
            // 获取商品对象写入cookie,添加到购物车
            var $add2car = $('.add2car');
            $add2car.on('click', function (e) {
                this.x = e.pageX;
                this.y = e.pageY;
                var cookieObj = {
                    id: res[0].id,
                    ourprice: res[0].ourprice,
                    saleprice: res[0].saleprice,
                    des: res[0].des,
                    imgurl: res[0].imgurl,
                    value: $buyCount.val()

                };

                var $onImg = $('#small').find('img');
                var $onUrl = $onImg.attr('src');

                // 将图片传给飞入购物车效果函数
                fly2Cart(this, this.x, this.y, $onUrl, cookieObj);
            });
        }
        // 封一个添加到购物车函数:使用cookie
        function add2Cart(obj) {
            // 写入先读取
            var goodslist = Cookie.get('goodslist') || [];
            if (typeof goodslist == 'string') {
                goodslist = JSON.parse(goodslist);
            }

            // 判断商品的数量
            var guid = obj.id;
            var idx = void 0;
            var has = goodslist.some(function (g, i) {
                idx = i;
                return g.guid === guid;
            });
            if (has) {
                //存在相同商品则获取qty
                goodslist[idx].qty = Number(goodslist[idx].qty) + obj.value * 1;
            } else {
                //将数据添加到一个对象中
                var good = {
                    guid: obj.id,
                    imgurl: obj.imgurl,
                    saleprice: obj.saleprice,
                    ourprice: obj.ourprice,
                    des: obj.des,
                    qty: obj.value
                };
                goodslist.push(good);
            }
            // 存储到cookie中
            document.cookie = 'goodslist=' + JSON.stringify(goodslist) + ';path=/';
            readCookie();
        }

        // 封一个飞入购物车效果函数
        function fly2Cart(ele, x, y, imgurl, cookieObj) {
            // 创建图片
            var $flyImg = $('<img/>');
            $flyImg.attr('src', imgurl);
            $flyImg.css({
                width: 150,
                height: 150,
                position: 'absolute',
                left: x,
                top: y - 150,
                borderRadius: 50

            });
            $('body').append($flyImg);
            $flyImg.animate({ top: 60, left: 1100, width: 50, height: 50, opacity: 0.5 }, 1500);
            setTimeout(function () {
                $flyImg.remove();
                // 将数据传给购物车函数
                add2Cart(cookieObj);
            }, 1500);
        }

        // 封一个tab参数切换函数
        function tabToggle() {
            // 获取元素
            var $picBox = $('.pic-box');
            // 生成跟多参数界面
            var $textBox = $('.text-box');
            var $textUl = $('<ul></ul>');
            for (var _i = 0; _i < 6; _i++) {
                var $li = $('<li/>');
                var $p = $('<p/>');
                $p.text('【商品编码】 8016481451');
                $p.appendTo($li);
                $li.appendTo($textUl);
            }
            $textUl.appendTo($textBox);

            var $tabTitle = $('.tab-title');
            $tabTitle.on('click', 'li', function () {
                $(this).addClass('curr');
                $(this).siblings('li').removeClass('curr');

                $textBox.toggle();
                $picBox.toggle();
            });
        }
        tabToggle();

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
'use strict';

// 商品cookie
var readCookie = void 0;

//用户cookie:用于获取用户信息和登陆状态
var userCookie = void 0;

var type = 'index';

var userInfo = void 0;

var goodslist = void 0;

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
        return '<li>\n                    <img src="../' + goods.imgurl + '"/>\n                    <p class="des"> ' + goods.des + '</p >\n                    <p>' + goods.ourprice + '&times;' + goods.qty + '</p>\n                </li>';
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
        // 封一个获取用户登陆状态函数:ajax
        var getLine = function getLine() {
            $.ajax({
                url: '../api/login.php',
                data: {
                    getStatus: 'online'
                }
            }).then(function (data) {
                var res = JSON.parse(data);
                if (res.length != 0) {
                    var _phone = res[0].phone;
                    $topName.hide();
                    var $a = $('<a></a>');
                    var $i = $('<i></i>');
                    $a.html('你好！' + _phone);
                    $i.html('退出');
                    $i.addClass('btnOut');
                    $signOut.append($a);
                    $signOut.append($i);

                    // 显示购物车cookie
                    readCookie();
                    var $p = $('<p></p>');
                    $p.addClass('name');
                    $p.text('你好！' + _phone);
                    s.append($p);
                    s.show();
                    s.next('div').hide();

                    setLine(_phone);
                }
            });
        };

        // 封一个设置用户状态函数
        var setLine = function setLine(_phone) {
            var $btnOut = $signOut.find('i');
            var $a = $signOut.find('a');
            $btnOut.on('click', function () {
                $signOut.hide();
                $topName.show();

                s.next('div').show();
                s.hide();

                // 将注销的状态发送给后端
                $.ajax({
                    url: '../api/login.php',
                    data: {
                        phone: _phone,
                        getStatus: 'offline'
                    }
                }).then(function (data) {});
                // 退出时将cookie存进数据库
                var _text = $a.text().substr(3, 11);
                $.ajax({
                    url: '../api/header.php',
                    data: {
                        phone: _text
                    }
                }).then(function (data) {
                    if (data == 'success') {
                        // console.log(666);
                    }
                });
                Cookie.remove('goodslist');
                readCookie();
            });
        };

        // 获取顶部元素
        var $topName = $('#top-name');
        var $signOut = $('#sign-out');
        // 读取用户cookie
        userInfo = Cookie.get('userInfo') || [];
        if (typeof userInfo == 'string') {
            userInfo = JSON.parse(userInfo);
        }
        getLine();
    }
};
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
'use strict';

require(['config'], function () {
    require(['jquery', 'header', 'common'], function ($) {
        // 登陆标题tab切换
        var $loginTitle = $('.login-title');
        var $user = $('#user');
        var $quick = $('#quick');
        $loginTitle.on('click', 'a', function () {
            $(this).addClass('curr');
            $(this).siblings().removeClass('curr');

            // 内容显示隐藏
            $user.toggle();
            $quick.toggle();
        });

        // 封一个验证用户登陆函数
        function testLogin() {

            // 获取元素
            var $btnLogin = $('#btn-login');
            var $phone = $('#phone');
            var $password = $('#password');
            var $showMsg = $('#show-msg');
            var $autoLogin = $('#auto-login');

            // 验证手机号
            $phone.on('blur', function () {
                var _phone = $phone.val();
                if (!/^1[3-8]\d{9}$/i.test(_phone)) {
                    $showMsg.show();
                    $phone.addClass('curr');
                } else {
                    $showMsg.hide();
                    $phone.removeClass('curr');
                    $phone.next().show();
                }
            });

            // 登陆按钮事件
            $btnLogin.on('click', function () {
                // 获取用户名和密码
                var _phone = $phone.val();
                var _password = $password.val();

                // 调用验证函数
                sendInfo(_phone, _password);
            });
            // 封一个将用户名和密码发送给后端进行验证函数
            function sendInfo(_phone, _password) {
                // 验证登陆
                $.ajax({
                    url: '../api/login.php',
                    data: {
                        phone: _phone,
                        password: _password,
                        // 将登陆状态发送给后端
                        loginstatus: 'online'
                    }
                }).then(function (data) {
                    if (data == 'success') {

                        // 弹窗操作
                        var $mask = $('.mask');
                        var $time = $('#time');
                        var s = 2;
                        $mask.fadeIn(function () {
                            this.timer = setInterval(function () {
                                s--;
                                $time.text(s + '秒');
                                if (s <= 1) {
                                    clearInterval(this.timer);
                                    $mask.fadeOut();
                                    // 跳转到首页
                                    location.href = '../index.html';
                                }
                            }, 1000);
                        });

                        // 获取所有数据，并写进cookie
                        $.ajax({
                            url: '../api/login.php',
                            data: {
                                type: 'getdata',
                                phone: _phone
                            }
                        }).then(function (data) {
                            var res = JSON.parse(data);
                            // 写进cookie
                            document.cookie = 'goodslist=' + JSON.stringify(res) + ';path=/';
                        });

                        // 判断是否下次自动登陆并且用户真实存在
                        // if($autoLogin.prop('checked')){
                        //     // 创建时间对象
                        //     let d = new Date();
                        //     d.setDate(d.getDate()+7);

                        //     // 创建cookie对象
                        //     let user = {
                        //         phone:_phone,
                        //         password:_password,
                        //         // 登陆成功时更换状态
                        //         loginstatus:'online'
                        //     }
                        //     // 添加到user数组
                        //     userInfo.push(user);
                        //     // 将用户名和密码写入cookie
                        //     document.cookie = 'userInfo='+JSON.stringify(userInfo)+';expires='+d.toUTCString()+';path=/';
                        // }
                    } else {
                        $password.addClass('curr');
                    }
                });
            }

            // 自动登陆
            // 1、读取cookie
            // 2、将cookie写进输入框
            // 3、发送Ajax进行用户验证
            // if(userInfo.length>0){
            //     let _phone    = userInfo[userInfo.length-1].phone;
            //     let _password = userInfo[userInfo.length-1].password;
            //     console.log(_phone,_password);
            //     $phone.val(_phone);
            //     $password.val(_password);
            //     // 调用验证函数
            //     sendInfo(_phone,_password);
            // }
        }
        testLogin();

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
'use strict';

require(['config'], function () {
    require(['jquery', 'header', 'common'], function () {

        // 手机号验证
        var $phoneNum = $('#phone-num');
        var $showPhone = $('#show-phone');
        $phoneNum.on('blur', function () {
            // 获取输入的值
            var _phoneNum = $phoneNum.val();

            // 正则
            if (!/^1[3-8]\d{9}$/i.test(_phoneNum)) {
                $showPhone.addClass('error');
                $showPhone.text('手机号码不合法！');
                $showPhone.show();
            } else {
                // 发送ajax请求
                $.ajax({
                    url: '../api/register.php',
                    data: {
                        phone: _phoneNum
                    }
                }).then(function (res) {
                    console.log(res);
                    // alert(_phoneNum);
                    if (res == 'fail') {
                        $showPhone.removeClass('corr');
                        $showPhone.addClass('error');
                        $showPhone.text('该手机号以注册过！');
                        $showPhone.show();
                    } else {
                        $showPhone.text('');
                        $showPhone.removeClass('error');
                        $showPhone.addClass('corr');
                        $showPhone.show();
                    }
                });
            }
        });

        // 图片验证码
        var $vcode = $('.vcode');
        var $code = $('#code');
        var $showCode = $('#show-code');
        // 封一个图片验证码函数
        function createCode() {
            var random = rColor();
            $vcode.html(random);
        }
        createCode();
        // 点击切换验证码
        $vcode.on('click', function () {
            createCode();
            return false;
        });
        // let _code;
        $code.on('blur', function () {
            // 获取验证码
            var _vcode = $vcode.text();
            var _code = $code.val();
            if (_vcode != _code) {
                $showCode.addClass('error');
                $showCode.text('验证码不正确！');
                $showCode.show();
            } else {
                $showCode.text('');
                $showCode.removeClass('error');
                $showCode.addClass('corr');
                $showCode.show();
            }
        });

        // 密码验证
        var $pass1 = $('#pass1');
        var $pass2 = $('#pass2');
        var $showPass1 = $('#show-pass1');
        var $showPass2 = $('#show-pass2');
        // let _pass1 = '';
        // let _pass2 = '';
        $pass1.on('blur', function () {
            // 获取密码
            var _pass1 = $pass1.val();
            // alert(_pass1);
            if (!/^[a-z0-9][\w\-]{5,15}$/i.test(_pass1)) {
                $showPass1.addClass('error');
                $showPass1.text('密码格式错误！');
                $showPass1.show();
            } else {
                $showPass1.text('');
                $showPass1.removeClass('error');
                $showPass1.addClass('corr');
                $showPass1.show();
            }
        });
        $pass2.on('blur', function () {
            // 获取密码
            var _pass1 = $pass1.val();
            var _pass2 = $pass2.val();
            if (_pass2 != _pass1) {
                $showPass2.addClass('error');
                $showPass2.text('两次密码不一致！');
                $showPass2.show();
            } else {
                $showPass2.text('');
                $showPass2.removeClass('error');
                $showPass2.addClass('corr');
                $showPass2.show();
            }
        });

        // 手机验证码的验证
        var $btnGet = $('.btnGet');
        var $yanzhengma = $('#yanzhengma');
        $btnGet.on('click', function () {
            // 生成随机验证码
            var radNum = randomNumber(1000, 9999);
            $yanzhengma.val(radNum);
        });

        // 提交按钮注册
        var $btnReg = $('#btnReg');
        var $btnAgree = $('#btnAgree');

        $btnReg.on('click', function () {
            //获取值
            var _phoneNum = $phoneNum.val();
            var _pass1 = $pass1.val();
            console.log(_phoneNum, _pass1);
            if (_phoneNum == '' || _pass1 == '') {
                return;
            }

            $.ajax({
                url: '../api/register.php',
                data: {
                    type: 'reg',
                    phone: _phoneNum,
                    password: _pass1,
                    // 默认离线状态
                    loginstatus: 'offline'
                }
            }).then(function (data) {
                console.log(data);
                if (data == 'success') {
                    // 弹窗操作
                    var $mask = $('.mask');
                    var $time = $('#time');
                    var s = 2;
                    $mask.fadeIn(function () {
                        this.timer = setInterval(function () {
                            s--;
                            $time.text(s + '秒');
                            if (s == 0) {
                                clearInterval(this.timer);
                                location.href = '../html/login.html';
                            }
                        }, 1000);
                    });
                }
            });
        });

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
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.5 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, _require, define;
(function (global, setTimeout) {
    var req,
        s,
        head,
        baseElement,
        dataMain,
        src,
        interactiveScript,
        currentlyAddingScript,
        mainScript,
        subPath,
        version = '2.3.5',
        commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',

    //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',

    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof _require !== 'undefined' && !isFunction(_require)) {
        //assume it is a config object.
        cfg = _require;
        _require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded,
            Module,
            context,
            handlers,
            checkLoadedTimeoutId,
            _config = {
            //Defaults. Do not set a default for map
            //config to speed up normalize(), which
            //will run faster if there is no default.
            waitSeconds: 7,
            baseUrl: './',
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
            registry = {},

        //registry of just enabled modules, to speed
        //cycle breaking code when lots of modules
        //are registered, but not activated.
        enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            _defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain,
                mapValue,
                nameParts,
                i,
                j,
                nameSegment,
                lastIndex,
                foundMap,
                foundI,
                foundStarMap,
                starI,
                normalizedBaseParts,
                baseParts = baseName && baseName.split('/'),
                map = _config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (_config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(_config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name && scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(_config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url,
                pluginModule,
                suffix,
                nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(_defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (isNormalized) {
                        normalizedName = name;
                    } else if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ? normalize(name, parentName, applyMap) : name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ? '_unnormalized' + (unnormalizedCounter += 1) : '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + '!' + normalizedName : normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(_defined, id) && (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(_defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function (queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function require(mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return mod.require = context.makeRequire(mod.map);
                }
            },
            'exports': function exports(mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return _defined[mod.map.id] = mod.exports;
                    } else {
                        return mod.exports = _defined[mod.map.id] = {};
                    }
                }
            },
            'module': function module(mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function config() {
                            return getOwn(_config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    };
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, _defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err,
                usingPathFallback,
                waitInterval = _config.waitSeconds * 1000,

            //It is possible to disable the wait interval by using waitSeconds of 0.
            expired = waitInterval && context.startTime + waitInterval < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return needCycleCheck = false;
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function Module(map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(_config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function init(depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function defineDep(i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function fetch() {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = new Date().getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function load() {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function check() {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err,
                    cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError(this.error = err);
                            }
                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            _defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }
                }
            },

            callPlugin: function callPlugin() {
                var map = this.map,
                    id = map.id,

                //Map already normalized the prefix.
                pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load,
                        normalizedMap,
                        normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                        enableBuildCallback: true
                    });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name, this.map.parentMap, true);
                        on(normalizedMap, 'defined', bind(this, function (value) {
                            this.map.normalizedMap = normalizedMap;
                            this.init([], function () {
                                return value;
                            }, null, {
                                enabled: true,
                                ignore: true
                            });
                        }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () {
                            return value;
                        }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(_config.config, id)) {
                            _config.config[moduleName] = _config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval', 'fromText eval for ' + id + ' failed: ' + e, e, [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, _config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function enable() {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function (err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function on(name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function emit(name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(_defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: _config,
            contextName: contextName,
            registry: registry,
            defined: _defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function configure(cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function (id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = _config.shim,
                    objs = {
                    paths: true,
                    bundles: true,
                    config: true,
                    map: true
                };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!_config[prop]) {
                            _config[prop] = {};
                        }
                        mixin(_config[prop], value, true, true);
                    } else {
                        _config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    _config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            _config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        _config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function makeShimExports(value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || value.exports && getGlobal(value.exports);
                }
                return fn;
            },

            makeRequire: function makeRequire(relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(_defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? '' : '. Use require([])')));
                        }
                        return _defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function toUrl(moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                    },

                    defined: function defined(id) {
                        return hasProp(_defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function specified(id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(_defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete _defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function (args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function enable(depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function completeLoad(moduleName) {
                var found,
                    args,
                    mod,
                    shim = getOwn(_config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(_defined, moduleName) && mod && !mod.inited) {
                    if (_config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine', 'No define call for ' + moduleName, null, [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, shim.deps || [], shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function nameToUrl(moduleName, ext, skipExt) {
                var paths,
                    syms,
                    i,
                    parentModule,
                    url,
                    parentPath,
                    bundleId,
                    pkgMain = getOwn(_config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = _config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js');
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : _config.baseUrl) + url;
                }

                return _config.urlArgs && !/^blob\:/.test(url) ? url + _config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function load(id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function execCb(name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function onScriptLoad(evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function onScriptError(evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function (value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function (depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id + (parents.length ? '", needed by: ' + parents.join(', ') : '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function requirejs(deps, callback, errback, optional) {

        //Find the right context, use default
        var context,
            config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) {
        fn();
    };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!_require) {
        _require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each(['toUrl', 'undef', 'defined', 'specified'], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = context && context.config || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
            //Check if node.attachEvent is artificially added by custom script or
            //natively supported by browser
            //read https://github.com/requirejs/requirejs/issues/187
            //if we can NOT find [native code] then it must NOT natively supported.
            //in IE8, node.attachEvent does not have toString()
            //Note the test for "[native code" with no closing brace, see:
            //https://github.com/requirejs/requirejs/issues/273
            !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function () {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts', 'importScripts failed for ' + moduleName + ' at ' + url, e, [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return interactiveScript = script;
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/') + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function define(name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (match, dep) {
                    deps.push(dep);
                });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
})(undefined, typeof setTimeout === 'undefined' ? undefined : setTimeout);
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
                    tatolNum += Number(item.qty);
                    // 小计
                    subTatol = item.qty * item.ourprice;

                    return '<li id=' + item.guid + '>\n                                <label for="">\n                                    <input type="checkbox" checked/>\n                                </label>\n                                <div>\n                                    <img src=' + item.imgurl + ' />\n                                    <p class="text">' + item.des + '</p>\n                                    <p class="style"><i>\u989C\u8272\uFF1A\u5171\u540C</i><br /><i>\u6B3E\u5F0F\uFF1A\u5171\u540C</i></p>\n                                    <p class="ourprice"><i>' + item.ourprice + '</i></p>\n                                    <p class="num">\n                                        <label for="">\n                                            <i class="btn-reduce">-</i>\n                                            <input type="text" value=' + item.qty + '\n                                             class="goods-num"/>\n                                            <i class="btn-add">+</i>\n                                        </label>\n                                    </p>\n                                    <p class="xiaoji">\uFFE5' + subTatol + '</p>\n                                    <span class="btnDel">\u5220\u9664</span>\n                                </div>\n                            </li>';
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