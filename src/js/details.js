require(['config'],function(){
    require(['jquery','header','fzoom'],function(){
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
        console.log(obj.type,obj.id);

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
            let imgurl = res[0].imgurl;
            // 放大镜
            zoom(imgurl);
            // 商品信息
            showMsg(res);

        });
        // 封一个放大镜的函数
        function zoom(i){
            // 图片数据
            // let arr = ['../img/count-down-img11.jpg','../img/count-down-img10.jpg']
            let arr = [i];
            let $imgBox = $('.img-box');
            let $ul = $('<ul></ul>');
            let $res = arr.map(function(item){
                return `<li>
                            <img src=${item} />
                        </li>`;
            });
            // 生成图片列表
            $ul.append($res);
            $imgBox.append($ul);
            $('#small').fZoom();
        }

        // 封一个商品信息函数
        function showMsg(res){
            console.log(res);
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
        }

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