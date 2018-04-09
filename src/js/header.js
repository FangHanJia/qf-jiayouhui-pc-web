jQuery(function($){
    let type = 'index';
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
    });

});