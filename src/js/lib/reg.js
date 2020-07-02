var baseUrl='http://localhost/konka';

define(['jquery'],function($){
    return{
        reg:function(){
            let arr=[0,0,0];
            $('#username').on('input',function(){
                let reg=/^\w{2,16}$/;
                if(!reg.test($(this).val())){
                    arr[0]=0;
                    $('.cf-user').html(`用户名不符`)
                }else{
                    arr[0]=1;;
                    $('.cf-user').html(`登录账号<span class="text-danger">*</span>`)
                }
            })
            $('#password,#pw-confirm').on('input',function(){
                if($('#password').val()==$('#pw-confirm').val()){
                    arr[1]=1;
                    $('.cf-pw').html(`确认密码<span class="text-danger">*</span>`)
                }else{
                    arr[1]=0;
                    $('.cf-pw').html(`密码不一致`)
                }
            })
            $('#vcode').on('input',function(){
                if($('#vcode').val()!=$('.vcode-show').html()){
                    $('.cf-vc').html(`验证码错误`);
                    arr[2]=0;
                   
               }else{
                   arr[2]=1;
                   $('.cf-vc').html(`验证码<span class="text-danger">*</span>`);
               }
            })
            $('.submit').on('click',function(){
                
                if(!(arr[0]&&arr[1]&&arr[2])){
                    alert('请验证输入内容');
                    return
                }
                console.log($('#reg').serialize())
                $.ajax({
                    type: "post",
                    url:   `${baseUrl}/interface/reg.php`,
                    data: $('#reg').serialize(),
                    success: function (data) {
                        eval(data)
                    }
                });
            })
        },
        vcode:function(){
            let arr=[];
            for(let i=0;i<4;i++){
                switch(parseInt(Math.random()*3)) {
                    case 0:
                        arr.push(String.fromCharCode(parseInt(Math.random()*26+97)));
                        break;
                    case 1:
                        arr.push(String.fromCharCode(parseInt(Math.random()*26+65)));
                        break;
                    case 2:
                        arr.push(String.fromCharCode(parseInt(Math.random()*10+48)));
                        break;
                }
                    
            }
            str=arr.join('');
           $('.vcode-show').html(str);
        }
    }
})