jQuery(function($){
    

    // 通过Ajax向后端获取数据初始化界面
    $.ajax({
        url:'../api/goodslist.php',
        data:{
            type:'init'
        }
    })
    // 界面初始化
    .then(function(data){

        let res = JSON.parse(data);
        // 初始化热销界面
        hotFloor(res.h,1,0,10);

        // 初始化猜你喜欢界面
        loveContent(res.cd,'love');

        // 初始化商品界面
        initGoods(res.g);
    });

    // 封一个商品界面函数
    function initGoods(res){
        console.log(res);
        let $list = $('.list');
        let $mainL = $('#main-l');
        // 创建商品容器ul
        let $goods = $('<ul></ul>');
        $goods.addClass('goods');
        let $res = res.data.map(function(item){
            return `<li id=${item.id}>
                        <a href>
                            <img src=${item.imgurl}  />
                            <b>${item.des}</b>
                            <p>
                                <i>￥${item.saleprice}</i>
                                ￥${item.ourprice}
                            </p>
                            <font>
                                月销${item.salecount}件
                            </font>
                        </a>
                    </li>`;
        });

        // 添加到界面
        $goods.html('');
        $goods.append($res);
        $list.html('');
        $list.append($goods);

        // 创建分页界面
        let $page = $('.page');
        let $span = $('<span></span>');
        $span.addClass('page-num');
        // 创建分页：用总数除以数量
        let pageLen = Math.ceil(res.total/res.qty);
        for(let i=0;i<pageLen;i++){
            let $a = $('<a></a>');
            $a.html(i+1);
            if(i===res.page - 1){
                $a.addClass('curr');
            }
            $span.append($a);
        }
        // let $pPrev = $('<a id="page-prev">上一页</a>');
        // $pPrev.addClass('curr');
        // let $pNext= $('<a id="page-next">下一页</a>');
        // $pPrev.before($span);
        // $pNext.after($span);
        $page.html('');
        $page.append($span);

        // 搜索数量
        let $span2 = $('<span></span>');
        $span2.addClass('page-set');
        let em = `<em>
                    共<i id="page-total">${pageLen}</i>页
                    <input type="text" value="1" id="page-count"/>
                </em>
                <a href="javasript:void(0);" id="btn-set">确定</a>`;
        $span2.append(em);
        $page.append($span2);
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
            return `<li>
                        <a href>
                            <i></i>
                            <img src=${item.imgurl} />
                            <b>${item.des}</b>
                            <em>￥${item.price}</em>
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

    // 封一个猜你喜欢title函数
    function loveTitle(type){
        if(type == 'love'){
            let $loveTitle = $('#love-title');
            // 生成title
            let h2 = $('<h2 class="title">猜你喜欢</h2>');
            $loveTitle.append(h2);
        }
    }
    loveTitle('love');
    // 封一个猜你喜欢content函数
    function loveContent(res,type){
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
                        <a href="">
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
                $goodsBox.stop().animate({left:-$len*index},'slow');
            }
            
        }
    }

    // 封一个导航条显示隐藏函数
    window.onload = function(){
        let $nav1 = $('#nav1');
        let $nav2 = $('#nav2');
        $nav1.addClass('cur');
            
        $nav2.css({display:'none'})
        $nav1.on('mouseover',function(){
            $nav2.show();
            $(this).removeClass('cur');

        }).on('mouseleave',function(){
            $nav2.hide();
            $nav1.addClass('cur');
        });

        // 封一个发送分页的函数
        function send(pageNo){
                $.ajax({
                    url:'../api/goodslist.php',
                    data:{
                        page:pageNo
                    }
                })
                .then(function(data){
                    console.log(JSON.parse(data));
                    let res = JSON.parse(data);
                    initGoods(res.g);
                });
            }
        // 操作分页
        let $page = $('#main-l');
        $page.on('click','.page-num a',function(){
            console.log(this);
            let pageNo = this.innerText;
            send(pageNo);
        })
        // 操作数量搜索
        .on('click','.page-set a',function(){
            // 获取输入的值
            let $num = $('#page-count').val();
            // 获取总数量
            let $total = $('#page-total').text();
            if($num*1 >= $total*1 || $num*1 <1){
                // alert('输入有误');
                return;
            }
            send($num);
            console.log(this,$num,$total);
        });
    }

});