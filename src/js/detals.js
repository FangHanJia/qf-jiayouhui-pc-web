require(['config'],function(){
    require(['jquery','header'],function(){

        console.log(666);
       let id = location.search;
       console.log(id);


       // 封一个导航条显示隐藏函数
        this.timer = setInterval(function(){
            console.log($('#nav1'));
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