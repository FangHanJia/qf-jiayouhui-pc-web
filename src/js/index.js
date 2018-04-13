// 引入文件
require(['config'],function(){
    require(['jquery','fcarousel','header','common'],function($){
        // 主体轮播图函数
        function mainBanner(){
            let banner_focus = $('#banner-focus');
            banner_focus.fCarousel({
                imgs:[
                    '../img/banner_img1.jpg',
                    '../img/banner_img2.jpg',
                    '../img/banner_img3.jpg',
                    '../img/banner_img4.jpg'
                    ],
                type:'fade',
                width:715,
                height:380,
                duration:5000
            });
        }
        mainBanner();

        /**
         *  通过ajax向后端获取数据初始化界面
         */
        $.ajax({
            url:'../api/index.php'
        })
        .then(function(data){
                // 转化
                let res = JSON.parse(data);

                // 处理限时抢购商品数据
                countContent(res.cd,'count');
                countContent(res.cd,'love');

                // 处理轮播图商品数据：
                bannerFloor(res.f,1,'1F 品质家居');
                bannerFloor(res.f,2,'2F 美装个护');
                bannerFloor(res.f,3,'3F 服饰美饰');
                bannerFloor(res.f,4,'4F 食品保健');
                bannerFloor(res.f,5 ,'5F 生活电器');

                // 处理今日热销商品数据:第一楼
                hotFloor(res.h,1,0,5);
                hotFloor(res.h,2,5,10);
                hotFloor(res.h,3,10);
                hotFloor(res.h,4,10);
                hotFloor(res.h,5,10);
            });

        // 封一个倒计时title界面函数
        function countTitle(type){
            if(type == 'love'){
                let $loveTitle = $('#love-title');
                // 生成结构
                let h2 = $('<h2 class="title">猜你喜欢</h2>');
                $loveTitle.append(h2);
            }else if(type == 'time'){
                let $countTitle = $('#count-title');
                // 生成结构
                let h2 = $('<h2 class="title">限时抢购</h2>');
                let temp =`<span class="run-time" id="run-time">距离本场结束还有：
                                <i class="h">9</i> 时
                                <i class="m">9</i> 分
                                <i class="s">9</i> 秒
                            </span>`;
                let runTime = $(temp);
                h2.append(runTime);
                $countTitle.append(h2);

                let $h = $('#run-time').children('.h'); 
                let $m = $('#run-time').children('.m'); 
                let $s = $('#run-time').children('.s'); 

                // 指定结束时间
                let endTime = '2018-4-7 10:10:10';
                // 默认10个小时
                let endTime2 = Date.now() + (10*60*60*1000);
                // 显示倒计时
                showTime();
                let timer = setInterval(showTime,1000);
                function showTime(){
                    // let offset = Date.parse(endTime) - Date.now();
                    let offset = endTime2 - Date.now();
                    
                    offset = Math.floor(offset/1000);

                    if(offset <=0){
                        clearInterval(timer);
                    }

                    let sec  = offset%60;
                    let min  = Math.floor(offset/60)%60;
                    let hour = Math.floor(offset/60/60)%24;

                    // 补零
                    sec  = sec<0 ? '0'+sec:sec;
                    min  = min<0 ? '0'+min:min;
                    hour = hour<0 ? '0'+hour:hour;

                    // 写入界面
                    $h.text(hour);
                    $m.text(min);
                    $s.text(sec);
                }
            }
        }
        countTitle('time');
        countTitle('love');
        // 封一个倒计时content界面函数
        function countContent(res,type){
            let $type ='#'+type; 
            let $content = '#'+type+'-content';
            let $countDown = $($type);
            let $countContent = $($content);
            // 生成数据
            let gid = 'goods-box-'+type;
            let $goodsBox = $('<ul ></ul>');
            $goodsBox.attr('id',gid);
            $goodsBox.addClass('goods-box');

            // 生成左右箭头
            let pid ='goods-prev-'+type;
            let nid = 'goods-next-'+type;
            let $goodsPrev = $('<a class="goods-prev" ></a>');
            let $goodsNext = $('<a class="goods-next" ></a>');
            $goodsPrev.attr('id',pid);
            $goodsNext.attr('id',nid);

            // 获取数据生成html结构
            let $html = res.map(function(item){
                return `<li id=${item.id}>
                            <a >
                                <img src=${item.imgurl} />
                                <span>${item.off}折</span>
                                <b>${item.des}</b>
                                <font>￥${item.ourprice}<i>￥${item.saleprice}</i></font>
                                <strong>立即抢购</strong>
                            </a>
                        </li>`;
            });
            $countContent.append($goodsBox.append($html));
            $countDown.append($goodsPrev);
            $countDown.append($goodsNext);

            // 封一个左右滚动的函数
            scroll(gid,pid,nid);
            function scroll(){
                let index = 0;
                let g = '#'+gid;
                let p = '#'+pid;
                let n = '#'+nid;

                let $prev_g = $(p);
                let $next_g = $(n);
                let $goodsBox= $(g);
                let $imgLen = $goodsBox.children('li').length;
                let $len = $goodsBox.children('li').outerWidth(true)*5;
                let $num = $imgLen/5;
                $goodsBox.css({width:$imgLen*$len});
                let bos = $goodsBox.width();
                $next_g.on('click',function(){
                    index++;
                    run();
                });
                $prev_g.on('click',function(){
                    index--;
                    run();

                });
                function run(){
                    if(index >=$num){
                        index = $num-1;
                    }else if(index <=0){
                        index = 0;   
                    }
                    $goodsBox.stop().animate({left:-$len*index});
                }
                
            }
        }
        
        // 封一个轮播图商品函数
        function bannerFloor(res,num,title){
            let selector = '#floor'+num;
            let $floor1 = $(selector);
            let r = res.slice(num-1,num);
            let addTitle = `<div class="floor-title">
                            <h2>${title}</h2>
                        </div>`;
            let $f = $(addTitle);
            $floor1.append($f);

            // 插入内容
            let $floorContent = $('<div></div>');
            $floorContent.addClass('floor-content');
           
            let $r = r.map(function(item){
                return `<div class="left fl">
                            <b><a ><img src=${item.bigimg} /></a></b>
                            <p>
                                <a >
                                    <img src=${item.icon1} />
                                </a>
                                <a >
                                    <img src=${item.icon2} />
                                </a>
                                <a >
                                    <img src=${item.icon3} />
                                </a>
                                <a >
                                    <img src=${item.icon4} />
                                </a>
                                <a >
                                    <img src=${item.icon5} />
                                </a>
                                <a >
                                    <img src=${item.icon6} />
                                </a>
                            </p>
                        </div>
                        <div class="right fr">
                                <div class="floor-1-banner" id="floor-${num}-banner"></div>
                                <ul class="floor-1-ad">
                                    <li>
                                        <a >
                                            <img src=${item.ad1} />
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <img src=${item.ad2} />
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <img src=${item.ad3} />
                                        </a>
                                    </li>
                                </ul>
                            </div>`;
            });
            $floorContent.append($r);
            $floor1.append($floorContent);

            // 封一个轮播图函数：
            function loop(num){
                let ele = '#floor-'+num+'-banner';
                let $loop = $(ele);
                let imgarr = [];
                imgarr.push(r[0].banner1);
                imgarr.push(r[0].banner2);
                $loop.fCarousel({
                    imgs:imgarr,
                    type:'fade',
                    width:580,
                    height:310,
                    duration:4000,
                });
            }
            loop(num);
        }

        // 封一个热销界面函数
        function hotFloor(h,num,star,end){
            let hLen =h.slice(star,end); 
            let $h = '#hot-floor'+num;
            let $hotSale = $($h);
            let html_h = $(`<div class="hot-title">
                            <h2>本月热销榜</h2>
                        </div>`); 
            $hotSale.append(html_h);

            // 商品
            let $hotContent = $('<ul></ul>');
            $hotContent.addClass('hot-content');
            let idx = 'hot-content'+num
            $hotContent.attr('id',idx);
            let $res = hLen.map(function(item){
                return `<li id=${item.id}>
                            <a >
                                <i></i>
                                <img src=${item.imgurl} />
                                <b>${item.des}</b>
                                <em>￥${item.ourprice}</em>
                            </a>
                        </li> `;
            });
            $hotContent.append($res);
            $hotSale.append($hotContent);
            let e = '#'+idx
            let $is = $(e).find('i');
            $is.eq(0).addClass('i1').text('1');
            $is.eq(1).addClass('i2').text('2');
            $is.eq(2).addClass('i3').text('3');
        }
        
        
        // 封一个跳转到详情页函数
        function toDetals(){
            // 倒计时数据
            let $countContent = $('#count-content');
            $countContent.on('click','li',function(){
                let $id = $(this).attr('id');
                let $type = 'index_countdown';
                console.log($id);
                location.href = '../html/details.html?id='+$id+'&type='+$type;
            });

            // 猜你喜欢数据
            let $loveContent = $('#love-content');
            $loveContent.on('click','li',function(){
                let $id = $(this).attr('id');
                let $type = 'index_countdown';
                console.log($id);
                location.href = '../html/details.html?id='+$id+'&type='+$type;
            });

            // 热销商品数据
            let $hots = $('.hot-sale');
            $hots.on('click','li',function(){
                let $id = $(this).attr('id');
                let $type = 'index_hot';
                console.log($id);
                location.href = '../html/details.html?id='+$id+'&type='+$type;
            });
        }
        toDetals();

        // 封一个跳转到商品列表页函数
        function toList(){
            let $floor = $('.floor-l');
            $floor.on('click',function(){
                 location.href = '../html/goodslist.html';
            });
        }
        toList();
    });
});