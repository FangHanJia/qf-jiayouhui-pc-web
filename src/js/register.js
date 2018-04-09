jQuery(function($){
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
    }
});