var baseUrl='http://localhost/konka';

define(['jquery'],function($){
    return{
        confirm:function(){
            let user=localStorage.getItem('user') || sessionStorage.getItem('user')
            if(user){
                alert('已登录，请勿重复登录');
                location.href='index.html'
            }
        },
        login:function(){
            $('.submit').on('click',function(){
                if($('#vcode').val()!=$('.vcode-show').html()){
                     alert('验证码错误');
                    return
                }
                $.ajax({
                    type: "post",
                    url:   `${baseUrl}/interface/login.php`,
                    data: $('#login').serialize(),
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