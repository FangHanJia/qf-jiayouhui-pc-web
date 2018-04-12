require(['config'],function(){
    require(['jquery','header','fzoom','common'],function(){
        // 获取url
        let url = location.search;
        // 截取数据
        url = url.slice(1);
        url = url.split('&');
        let obj = {};
        for(let i=0;i<url.length;i++){
            let arr = url[i].split('=');
            obj[arr[0]] = arr[1];
        }

        // 像后端获取数据
        $.ajax({
            url:'../api/details.php',
            data:{
                type:obj.type,
                id:obj.id
            }
        })
        .then(function(data){
            let res = JSON.parse(data);
            // 提取图片
            
            zoom(res);
            // 商品信息
            showMsg(res);

        });
        // 封一个放大镜的函数
        function zoom(i){
            // 图片数据
            // let arr = ['../img/count-down-img11.jpg','../img/count-down-img10.jpg']
            let $imgBox = $('.img-box');
            let $ul = $('<ul></ul>');
            let $res = i.map(function(item){
                return `<li>
                            <img src=${item.imgurl} />
                        </li>`;
            });
            // 生成图片列表
            $ul.append($res);
            $imgBox.append($ul);
            $('#small').fZoom();
        }

        // 封一个商品信息函数
        function showMsg(res){
            // 显示标题
            let $des = $('#des');
            $des.text(res[0].des);

            // 显示价格
            let $price = $('.price');
            $price.children('b').text(res[0].ourprice); 
            $price.children('em').text(res[0].saleprice); 

            // 显示编号
            let $guid = $('.guid');
            $guid.children('span').text(res[0].id);

            // 月销量
            let $saleCount = $('.sale-count');
            $saleCount.children('span').text(res[0].salecount+' 件');
            // 商品数量
            let $buyCount = $('#buy-count');

            // 封一个商品数量加减函数
            function goodsNum(){
                let $number = $('.number');
                let $jian = $('#jian');
                let $add = $('#add');

                _buyCount = $buyCount.val();
                // 数量加减操作
                $jian.on('click',function(){
                    // 获取输入框的值
                    _buyCount--;
                    if(_buyCount <=1){
                        _buyCount =1;
                    }
                    $buyCount.val(_buyCount);
                    console.log(_buyCount);
                });
                $add.on('click',function(){
                    // 获取输入框的值
                    _buyCount++;
                    $buyCount.val(_buyCount);
                    console.log(_buyCount);
                });
            }   
            goodsNum();
            // 获取商品对象写入cookie,添加到购物车
            let $add2car = $('.add2car');
            $add2car.on('click',function(){
                console.log($buyCount.val());
                let cookieObj = {
                    id:res[0].id,
                    ourprice:res[0].ourprice,
                    saleprice:res[0].saleprice,
                    des:res[0].des,
                    imgurl:res[0].imgurl,
                    value:$buyCount.val()
                    
                }
                // 将数据传给购物车函数
                add2Car(cookieObj);
            });
        }
        // 封一个添加到购物车函数
        function add2Car(obj){
            // 写入先读取
            let goodslist = Cookie.get('goodslist') || [];
            if(typeof goodslist == 'string'){
                goodslist = JSON.parse(goodslist);
            }

            // 判断商品的数量
            let guid = obj.id;
            let idx;
            let has = goodslist.some(function(g,i){
                idx = i;
                return g.guid === guid;
            });
             if(has){
                //存在相同商品则获取qty
                goodslist[idx].qty = Number(goodslist[idx].qty)+obj.value*1;
            }else{
                //将数据添加到一个对象中
                let good = {
                    guid:obj.id,
                    img:obj.imgurl,
                    saleprice:obj.saleprice,
                    ourprice:obj.ourprice,
                    des:obj.des,
                    qty:obj.value
                }
                goodslist.push(good);
            }
            // 存储到cookie中
            document.cookie = 'goodslist='+JSON.stringify(goodslist)+';path=/';
            readCookie();
        }

        

        // 封一个tab参数切换函数
        function tabToggle(){
            // 获取元素
            let $picBox = $('.pic-box');
            // 生成跟多参数界面
            let $textBox = $('.text-box');
            let $textUl = $('<ul></ul>');
            for(let i=0;i<6;i++){
                let $li = $('<li/>');
                let $p  = $('<p/>');
                $p.text('【商品编码】 8016481451');
                $p.appendTo($li);
                $li.appendTo($textUl);
            }
            $textUl.appendTo($textBox);

            let $tabTitle = $('.tab-title');
            $tabTitle.on('click','li',function(){
                $(this).addClass('curr');
                $(this).siblings('li').removeClass('curr');

                $textBox.toggle();
                $picBox.toggle();
            });
        }
        tabToggle();

        // 封一个导航条显示隐藏函数
        this.timer = setInterval(function(){
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
            if($('#nav1')){
                clearInterval(this.timer);
            }
        },500);
    });
});