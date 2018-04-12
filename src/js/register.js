require(['config'],function(){
    require(['jquery','header','common'],function(){

        // 手机号验证
        let $phoneNum = $('#phone-num');
        let $showPhone = $('#show-phone');
        $phoneNum.on('blur',function(){
            // 获取输入的值
            let _phoneNum = $phoneNum.val();

            // 正则
            if(!/^1[3-8]\d{9}$/i.test(_phoneNum)){
                $showPhone.addClass('error');
                $showPhone.text('手机号码不合法！');
                $showPhone.show();
            }else{
                // 发送ajax请求
                $.ajax({
                    url:'../api/register.php',
                    data:{
                        phone:_phoneNum
                    }
                })
                .then(function(res){
                    console.log(res);
                            // alert(_phoneNum);
                    if(res=='fail'){
                        $showPhone.removeClass('corr');
                        $showPhone.addClass('error');
                        $showPhone.text('该手机号以注册过！');
                        $showPhone.show();
                    }else{
                        $showPhone.text('');
                        $showPhone.removeClass('error');
                        $showPhone.addClass('corr');
                        $showPhone.show();
                    }
                });
            }
            
            
        });

        // 图片验证码
        let $vcode = $('.vcode');
        let $code = $('#code');
        let $showCode = $('#show-code');
        // 封一个图片验证码函数
        function createCode(){
            let random = rColor();
            $vcode.html(random)
        }
        createCode();
        // 点击切换验证码
        $vcode.on('click',function(){
            createCode();
            return false;
        });
        // let _code;
        $code.on('blur',function(){
            // 获取验证码
            let _vcode = $vcode.text();
            let _code = $code.val();
            if(_vcode != _code){
                $showCode.addClass('error');
                $showCode.text('验证码不正确！');
                $showCode.show();

            }else{
                $showCode.text('');
                $showCode.removeClass('error');
                $showCode.addClass('corr');
                $showCode.show();
            }
        });

        // 密码验证
        let $pass1 = $('#pass1');
        let $pass2 = $('#pass2');
        let $showPass1 = $('#show-pass1');
        let $showPass2 = $('#show-pass2');
        // let _pass1 = '';
        // let _pass2 = '';
        $pass1.on('blur',function(){
            // 获取密码
            let _pass1 = $pass1.val();
            // alert(_pass1);
            if(!/^[a-z0-9][\w\-]{5,15}$/i.test(_pass1)){
                $showPass1.addClass('error');
                $showPass1.text('密码格式错误！');
                $showPass1.show();
            }else{
                $showPass1.text('');
                $showPass1.removeClass('error');
                $showPass1.addClass('corr');
                $showPass1.show();
            }
        });
        $pass2.on('blur',function(){
            // 获取密码
            let _pass1 = $pass1.val();
            let _pass2 = $pass2.val();
            if(_pass2 != _pass1){
                $showPass2.addClass('error');
                $showPass2.text('两次密码不一致！');
                $showPass2.show();
            }else{
                $showPass2.text('');
                $showPass2.removeClass('error');
                $showPass2.addClass('corr');
                $showPass2.show();
            }
        });

        // 手机验证码的验证
        let $btnGet = $('.btnGet');
        let $yanzhengma = $('#yanzhengma');
        $btnGet.on('click',function(){
            // 生成随机验证码
            let radNum = randomNumber(1000,9999);
            $yanzhengma.val(radNum);
        });

        // 提交按钮注册
        let $btnReg = $('#btnReg');
        let $btnAgree = $('#btnAgree');

        $btnReg.on('click',function(){
            //获取值
            let _phoneNum = $phoneNum.val();
            let _pass1 = $pass1.val();
            console.log(_phoneNum,_pass1);
            if(_phoneNum=='' || _pass1 ==''){
                return;
            }

            $.ajax({
                url:'../api/register.php',
                data:{
                    type:'reg',
                    phone:_phoneNum,
                    password:_pass1
                }
            })
            .then(function(data){
                console.log(data);
                if(data=='success'){
                    // 弹窗操作
                    let $mask = $('.mask');     
                    let $time = $('#time');  
                    let s=2;   
                    $mask.fadeIn(function(){
                        this.timer = setInterval(function(){
                            s--;
                            $time.text(s+'秒');
                            if(s==0){
                                clearInterval(this.timer);
                                location.href='../html/login.html';
                            }
                        },1000);
                    });
                }

            });
        });



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
