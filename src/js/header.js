// 商品cookie
let readCookie;

//用户cookie:用于获取用户信息和登陆状态
let userCookie;

let type = 'index';

let userInfo;

let goodslist;

// 封一个点击回到顶部效果函数
function toTop(){
    let $toTop = $('#toTop');
    let $win =  $(window);
    $win.on('scroll',function(){
        let $sc = $win.scrollTop();
        let $rwidth = $win.width();
        if($sc > 500){
            $toTop.css({display:'block'});
        }else{
            $toTop.css({display:'none'});
        }
    });
    $toTop.on('click',function(){
        let $sc = $win.scrollTop();
        $('body,html').animate({scrollTop:0},500);
    });
}

// 封一个顶部导航条鼠标移入事件
function showNav(){
    let $show_phone = $('.show_phone');
    $('#phone').on('mouseover',function(){
        $show_phone.show();
    }).on('mouseout',function(){
        $show_phone.hide();
    })
    let $show_weixin = $('.show_weixin');
    $('#weixin').on('mouseover',function(){
        $show_weixin.show();
    }).on('mouseout',function(){
        $show_weixin.hide();
    });
}

// 封一个购物车显示隐藏函数
function showCart(){
    let $goods_list = $('.goods-list');
    $('.shopping-cart').on('mouseover',function(){
        $goods_list.show();
        // console.log(this);
    }).on('mouseout',function(){
        $goods_list.hide();
    })
}

// 封一个商品分类函数
function showGoods(){
    let $nav2 = $('#nav2');

    // 处于首页时，直接显示
    if(type = 'index'){
        return;
    }else{
        $('#nav1').on('mouseover',function(){
            $nav2.show();
        }).on('mouseout',function(){
            $nav2.hide();
        });
    }
}
// 引进首页footer
$('#footer').load('../html/footer.html');
// 引进首页header
$('#header').load('../html/header.html',function(){
    toTop();
    showNav();
    showCart();
    showGoods();
    // userCookie();

});

// 封一个读取商品cookie函数
readCookie = function (){
    //获取cookie
    let goodslist = Cookie.get('goodslist') || [];
    if(typeof goodslist === 'string'){
        goodslist = JSON.parse(goodslist);
    }
    // 获取购物车的元素
    let $topCount = $('#top-count');
    let $shopCart = $('.shopping-cart');
    let $goosList = $shopCart.find('.goods-list');
    let $goodsNums = $shopCart.find('.goods-nums');
    let $ul = $('<ul></ul>');
    let $toCart = $('<a href="../html/shoppingCart.html"></a>');
    $toCart.addClass('toCart');
    $toCart.text('去购物车');
    $ul.addClass('ul-box');
    let topQty = 0;
    let $res = goodslist.map(function(goods){
        topQty += Number(goods.qty);
        return `<li>
                    <img src="../${goods.imgurl}"/>
                    <p class="des"> ${goods.des}</p >
                    <p>${goods.ourprice}&times;${goods.qty}</p>
                </li>`;
    });
    $goodsNums.text(topQty);
    $topCount.text(topQty);
    $ul.append($res);
    $goosList.html('');
    $goosList.append($ul);
    $goosList.append($toCart);
}

let timer = setInterval(function(){
    let $signIn = $('.sign-in');
    if($signIn){
        clearInterval(timer);
        userCookie($signIn);
    }
},500);
// 封一个读取用户cookie函数
userCookie = function(s){
    if(s){
    // 获取顶部元素
    let $topName = $('#top-name');
    let $signOut = $('#sign-out');
    // 读取用户cookie
    userInfo = Cookie.get('userInfo') || [];
    if(typeof userInfo =='string'){
        userInfo = JSON.parse(userInfo);
    }
    // 封一个获取用户登陆状态函数:ajax
    function getLine(){
        $.ajax({
            url:'../api/login.php',
            data:{
                getStatus:'online'
            }
        })
        .then(function(data){
            let res = JSON.parse(data);
            if(res.length!=0){
                let _phone = res[0].phone;
                $topName.hide();
                let $a = $('<a></a>');
                let $i = $('<i></i>');
                $a.html('你好！'+_phone);
                $i.html('退出');
                $i.addClass('btnOut');
                $signOut.append($a);
                $signOut.append($i);

                // 显示购物车cookie
                readCookie();
                let $p = $('<p></p>');
                $p.addClass('name');
                $p.text('你好！'+_phone);
                s.append($p);
                s.show();
                s.next('div').hide();

                setLine(_phone);

            }

        });
    }
    getLine();

    // 封一个设置用户状态函数
    function setLine(_phone){
        let $btnOut = $signOut.find('i');
        let $a = $signOut.find('a');
        $btnOut.on('click',function(){
            $signOut.hide();
            $topName.show();

            s.next('div').show();
            s.hide();

            
            
            // 将注销的状态发送给后端
            $.ajax({
                url:'../api/login.php',
                data:{
                    phone:_phone,
                    getStatus:'offline'
                }
            })
            .then(function(data){

            }); 
            // 退出时将cookie存进数据库
            let _text = $a.text().substr(3,11);
            $.ajax({
                url:'../api/header.php',
                data:{
                    phone:_text
                }
            })
            .then(function(data){
                if(data=='success'){
                    // console.log(666);
                }
            });
            Cookie.remove('goodslist');
            readCookie();

        });
    }

    

   }
}



