require(['config'],function(){
    require(['jquery','header','common'],function($){
        // 登陆标题tab切换
        let $loginTitle = $('.login-title');
        let $user = $('#user');
        let $quick = $('#quick');
        $loginTitle.on('click','a',function(){
            $(this).addClass('curr');
            $(this).siblings().removeClass('curr');

            // 内容显示隐藏
            $user.toggle();
            $quick.toggle();
        });

        // 封一个验证用户登陆函数
        function testLogin(){

            // 获取元素
            let $btnLogin = $('#btn-login');
            let $phone = $('#phone');
            let $password = $('#password');
            let $showMsg = $('#show-msg');
            let $autoLogin = $('#auto-login');

            // 验证手机号
            $phone.on('blur',function(){
                let _phone = $phone.val();
                if(!/^1[3-8]\d{9}$/i.test(_phone)){
                    $showMsg.show();
                    $phone.addClass('curr');
                }else{
                    $showMsg.hide();
                    $phone.removeClass('curr');
                    $phone.next().show();
                }
            });

            // 登陆按钮事件
            $btnLogin.on('click',function(){
                // 获取用户名和密码
                let _phone = $phone.val();
                let _password = $password.val();

                // 调用验证函数
                sendInfo(_phone,_password); 


            });
            // 封一个将用户名和密码发送给后端进行验证函数
            function sendInfo(_phone,_password){
                $.ajax({
                url:'../api/login.php',
                data:{
                    phone:_phone,
                    password:_password,
                    // 将登陆状态发送给后端
                    loginstatus:'online'
                }
                })
                .then(function(data){
                    if(data=='success'){
                        // 使用获取登陆状态
                        // if(userInfo.length>0 ){
                        //     let phone = _phone;
                        //     let idx;
                        //     let has = userInfo.some(function(g,i){
                        //         idx = i;
                        //         return g.phone === phone && g.loginstatus =='offline';
                        //     });
                        //     if(has){
                        //         //存在相同用户则修改为
                        //         userInfo[idx].loginstatus = 'online';
                        //         document.cookie = 'userInfo='+JSON.stringify(userInfo)+';path=/';
                        //     }else {
                        //         // 登陆成功则存进用户名和状态
                        //         let user = {
                        //             phone:_phone,
                        //             password:_password,
                        //             loginstatus:'online'
                        //         }

                        //         // 添加到user数组
                        //         userInfo.push(user);
                            
                        //         document.cookie = 'userInfo='+JSON.stringify(userInfo)+';path=/';
                        //     }
                        // }else {
                        //         // 登陆成功则存进用户名和状态
                        //         let user = {
                        //             phone:_phone,
                        //             password:_password,
                        //             loginstatus:'online'
                        //         }

                        //         // 添加到user数组
                        //         userInfo.push(user);
                            
                        //         document.cookie = 'userInfo='+JSON.stringify(userInfo)+';path=/';
                        // }

                        // 弹窗操作
                        let $mask = $('.mask');     
                        let $time = $('#time');  
                        let s=2;   
                        $mask.fadeIn(function(){
                            this.timer = setInterval(function(){
                                s--;
                                $time.text(s+'秒');
                                if(s<=1){
                                    clearInterval(this.timer);
                                    $mask.fadeOut();
                                    // 跳转到首页
                                    location.href='../index.html';
                                }
                            },1000);
                        });
                        // 判断是否下次自动登陆并且用户真实存在
                        // if($autoLogin.prop('checked')){
                        //     // 创建时间对象
                        //     let d = new Date();
                        //     d.setDate(d.getDate()+7);

                        //     // 创建cookie对象
                        //     let user = {
                        //         phone:_phone,
                        //         password:_password,
                        //         // 登陆成功时更换状态
                        //         loginstatus:'online'
                        //     }
                        //     // 添加到user数组
                        //     userInfo.push(user);
                        //     // 将用户名和密码写入cookie
                        //     document.cookie = 'userInfo='+JSON.stringify(userInfo)+';expires='+d.toUTCString()+';path=/';
                        // }
                    }else{
                        $password.addClass('curr');
                    }
                });
            }

            // 自动登陆
                // 1、读取cookie
                // 2、将cookie写进输入框
                // 3、发送Ajax进行用户验证
            // if(userInfo.length>0){
            //     let _phone    = userInfo[userInfo.length-1].phone;
            //     let _password = userInfo[userInfo.length-1].password;
            //     console.log(_phone,_password);
            //     $phone.val(_phone);
            //     $password.val(_password);
            //     // 调用验证函数
            //     sendInfo(_phone,_password);
            // }
        }
        testLogin();


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