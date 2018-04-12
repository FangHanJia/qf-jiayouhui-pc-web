require(['config'],function(){
    require(['jquery','header','common'],function(){
        

        // 获取页面元素
        let $showCart = $('.cart');
        // 默认隐藏
        $showCart.hide();

        // 获取用户登陆状态
        // 用户登陆状态
        let loginStatus = true;
        if(loginStatus){
            // 显示登陆界面
            $showCart.show();
            // 获取页面元素
            let $goodsList = $('.goodsList');
            let $tatolPrice = $('.tatol-price');
            let $tatolNums = $('.tatol-nums');
            // 全选按钮
            let $btnAll = $('#btnAll');
            
            let $checkboxs;

            // 全局cookie
            let goodslist;

            // 封一个读取商品cookie函数
            // 初始化
            goodsCookie();
            function goodsCookie(){
                goodslist = Cookie.get('goodslist') || [];
                if(typeof goodslist =='string'){
                    goodslist = JSON.parse(goodslist);
                }


                // 写进界面
                
                let $g_ul = $('<ul></ul>');
                let subTatol = 0;
                let tatolPrice = 0;
                let tatolNum = 0;
                let $res = goodslist.map(function(item,idx){
                    // 总价
                    tatolPrice+=item.qty * Number(item.ourprice);

                    // 总数量
                    tatolNum +=item.qty; 
                    // 小计
                    subTatol =item.qty * item.ourprice; 

                    return `<li id=${item.guid}>
                                <label for="">
                                    <input type="checkbox" checked/>
                                </label>
                                <div>
                                    <img src=${item.img} />
                                    <p class="text">${item.des}</p>
                                    <p class="style"><i>颜色：共同</i><br /><i>款式：共同</i></p>
                                    <p class="ourprice"><i>${item.ourprice}</i></p>
                                    <p class="num">
                                        <label for="">
                                            <i class="btn-reduce">-</i>
                                            <input type="text" value=${item.qty}
                                             class="goods-num"/>
                                            <i class="btn-add">+</i>
                                        </label>
                                    </p>
                                    <p class="xiaoji">￥${subTatol}</p>
                                    <span class="btnDel">删除</span>
                                </div>
                            </li>`;
                });
                
                $g_ul.append($res);
                $goodsList.html('');
                $goodsList.append($g_ul);

                $tatolPrice.text(tatolPrice);
                        // 总数量
                $tatolNums.text(tatolNum);

               // 将总价和总数量传出去
               getNum(tatolPrice,tatolNum);

            } 
            // 封一个接收商品总价和总数量函数
            function getNum(tatolPrice,tatolNum){
                // $tatolPrice.text(tatolPrice);
                 // 全选操作
                $btnAll.on('click',function(){

                    $checkboxs.prop('checked',this.checked);
                    // 高亮全选行
                    $lis[this.checked ? 'addClass' : 'removeClass']('bg');

                    if(this.checked){
                        // 总价
                        $tatolPrice.text(tatolPrice);
                        // 总数量
                        $tatolNums.text(tatolNum);
                    }else{
                        // 清空数据
                        // 总价
                        $tatolPrice.text('');
                        // 总数量
                        $tatolNums.text('');
                    }

                });
            }

            

            // 按钮事件委托
            //  1 删除按钮事件
            $goodsList.on('click','.btnDel',function(){
                // 获取当前行
                let $currentLi = $(this).parents('li');
                // 当前行id
                let $id = $currentLi.attr('id');

                // 遍历拿到事件源的id
                for(let i = 0;i<goodslist.length;i++){
                    if(goodslist[i].guid == $id){
                        // 删除当前行id的cookie
                        goodslist.splice(i,1);
                        break;
                    }
                }

                // 重新写入cookie
                Cookie.set('goodslist',JSON.stringify(goodslist)+';path=/');

                // 刷新界面
                goodsCookie();

                // 读取全局cookie
                readCookie();

                return false;
            })
            // 2 减少按钮事件
            .on('click','.btn-reduce',function(){
                // 获取当前行
                let $currentLi = $(this).parents('li');
                // 当前行id
                let $id = $currentLi.attr('id');

                // 遍历拿到事件源的id
                for(let i = 0;i<goodslist.length;i++){
                    if(goodslist[i].guid == $id){
                        // 对应商品cookie的qty减一
                        let count = goodslist[i].qty--;
                        if(count <= 1){
                            // 小于1则删除该cookie
                            goodslist.splice(i,1);
                        }
                        break;
                    }
                }

                // 重新写入cookie
                Cookie.set('goodslist',JSON.stringify(goodslist)+';path=/');

                // 刷新界面
                goodsCookie();

                // 读取全局cookie
                readCookie();
                return false;
            })
            // 3 增加按钮事件
            .on('click','.btn-add',function(){
                // 获取当前行
                let $currentLi = $(this).parents('li');
                // 当前行id
                let $id = $currentLi.attr('id');

                // 遍历拿到事件源的id
                for(let i = 0;i<goodslist.length;i++){
                    if(goodslist[i].guid == $id){
                        // 对应商品cookie的qty减一
                        let count = goodslist[i].qty++;
                        // 无限量
                        break;
                    }
                }

                // 重新写入cookie
                Cookie.set('goodslist',JSON.stringify(goodslist)+';path=/');

                // 刷新界面
                goodsCookie();


                // 读取全局cookie
                readCookie();
                return false;
            });

            // 选中按钮操作
            // 获取元素
            let $lis = $goodsList.find('li');
            let $btnFx = $('#btnFx');
            $checkboxs = $(':checkbox').not('#btnAll');

           
            

            // 任意行高亮+勾选
            $goodsList.on('click','li',function(){
                // 高亮当前行
                $(this).toggleClass('bg')
                // 勾选复选框
                .find(':checkbox').prop('checked',$(this).hasClass('bg'));
                checkAll();

            });

            // 封一个全选按钮状态按钮函数
            function checkAll(){

                // 获取选中的复选框
                let $checkeds = $checkboxs.filter(':checked');

                // 判断复选框数量和选中的数量
                 $btnAll.prop('checked',$checkeds.length==$checkboxs.length);


            }
            
        }



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