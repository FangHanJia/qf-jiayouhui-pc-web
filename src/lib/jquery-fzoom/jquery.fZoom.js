// 放大镜插件
;(function($){
  // 测试
  console.log(666);
  // 扩张jQuery插件
  $.fn.fZoom = function(options){

    // 默认属性
    let defaults = {
      //大图片的宽度
      width:460,
      //大图片的高度
      height:460,
      // 大图片的位置
      position:'right',
      // 间距
      gap:15
    }

    // 返回jQuery对象
    return this.each(function(){
      // 合并默认属性对象
      let opt = $.extend({},defaults,options);

      // 获取元素
     
      // 小图容器
      let $small = $(this); 
      // 主容器
      let $main = $small.parent('div');
      // 图片列表主容器容器
      let $imgList = $small.prev('div').children('div');
      // 大图容器
      let $big ;
      // 放大镜
      let $zoom;
      // 比例
      let ratio;

      // 面向对象
      let zoom = {
        // 初始化
        init(){
          let $imgs = $imgList.find('img');

          // 添加类名:小图容器
          $small.addClass('small');
          // 小图路径
          let $smallImg = $small.children('img');
          $smallImg.attr('src',$imgs.attr('src'));
          // 创建大图容器
          $big = $('<div></div>');
          // 添加类名
          $big.addClass('big');
          // 大图片
          let $bigImg = $('<img/>');
          // 设置图片路径
          $bigImg.attr('src',$smallImg.attr('src'));

          // 切换图片
          $imgList.on('click','li',function(){
            console.log($(this).children('img'));
            let $currentImg = $(this).children('img');
            $currentImg.addClass('curr');
            $(this).siblings().children('img').removeClass('curr');
            $smallImg.attr('src',$currentImg.attr('src'));
            $bigImg.attr('src',$currentImg.attr('src'));
          });

          // 设置大图容器样式
          $big.css({
            width:opt.width,
            height:opt.height
          });
          // 添加到界面
          $big.append($bigImg);
          $main.append($big);
          
          // 创建放大镜
          $zoom = $('<div/>');
          $zoom.addClass('zoom');
          // 添加到小图容器
          $small.append($zoom);

          // 绑定鼠标移入和移除事件
          $small.on('mouseenter',function(e){
            // 显示放大镜
            zoom.show();

            // 设置放大镜样式
            if($bigImg[0].complete){
              ratio = $bigImg.width()/$smallImg.width();
            }else{
              $bigImg[0].onload = function(){
                ration = $bigImg.width()/$smallImg.width();
              }
            }
            $zoom.css({
              width:opt.width/ratio,
              height:opt.height/ratio
            });
          })
          .on('mouseleave',function(){
            zoom.hide();
          }).on('mousemove',function(e){console.log(66)
            let x =e.pageX - $small.offset().left - $zoom.outerWidth()/2;
            let y =e.pageY - $small.offset().top - $zoom.outerHeight()/2;

            // 边界判断
            if(x<0){
              x = 0;
            }else if(x > $smallImg.innerWidth()-$zoom.outerWidth()){
              x = $smallImg.innerWidth()-$zoom.outerWidth();
            }

            if(y<0){
              y = 0;
            }else if(y > $smallImg.innerHeight()-$zoom.outerHeight()){
              y = $smallImg.innerHeight()-$zoom.outerHeight();
            }

            // 放大镜的移动
            $zoom.css({left:x,top:y});
            // 大图片的移动
            $bigImg.css({left:-x*ratio,top:-y*ratio});
          });

          // 显示函数
          
        },
        show(){
          $big.fadeIn();
          $zoom.show();
        },
        // 隐藏函数
        hide(){
          $big.fadeOut();
          $zoom.hide();
        }
      }

      // 操作对象：初始化
      zoom.init();

    });
  }

})(jQuery);