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