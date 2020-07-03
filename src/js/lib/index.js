var baseUrl='http://localhost/konka';


define(['jquery'],function($){
    return {
        render:function(){
           $.ajax({
               type: "get",
               url: `${baseUrl}/interface/getall.php`,
               dataType: "json",
               success: function (data) {
                    let temp=''
                    data.forEach(function(elm){
                        let pri=JSON.parse(elm.price);
                        temp+=`<div class="product-show">
                                    <a href="${baseUrl}/src/html/product.html?id=${elm.id}"><img src="${baseUrl}/src/${elm.pic}" alt=""></a>
                                    <h4>${elm.title}</h4>
                                    <div>${elm.flag}</div>
                                    <p>
                                        ${pri.now}
                                        <span>${pri.old}</span>
                                    </p>
                                </div>`
                    })
                    $('.star-product').html(temp)
               }
           });
            
        },
        search:function(){
            $('.search-open').on('click',function(){
                $('.nav-nav').css('display','none')
                $('.search-wrap').css('display','block')
            })
            $('.search-close').on('click',function(){
                $('.nav-nav').css('display','block')
                $('.search-wrap').css('display','none')
            })
        },
        scroll:function(){
            $(window).on('scroll',function(){
                if($('body,html').scrollTop()>740){
                    $('.ladder').css({
                        opacity:1
                    })
                }else{
                    $('.ladder').css({
                        opacity:0
                    })
                }
            })

            $('.ladder>ul>li').on('click',function(){
                let top=$('#'+$(this).attr('class')).offset().top;
                top-=50
                $('body,html').animate({
                    scrollTop:top
                },200);
            })
            
        },
        tool:function(){
            $(window).on('scroll',function(){
                if($('body,html').scrollTop()>740){
                    $('.tool>ul>li:last-child').css('display','block')
                }else{
                    $('.tool>ul>li:last-child').css('display','none')
                }
            })
            $('.tool>ul>li:last-child').on('click',function(){
               
                $('body,html').animate({
                    scrollTop:0
                },200);
            })
        },
        userSave:function(){
            let username=localStorage.getItem('user')||sessionStorage.getItem('user');
                username=JSON.parse(username);
            if(username){
                $('#user-save').html(username['user']);
                $('#user-login').css('display','block');
                $('#user-reg').css('display','none');
            }
        },
        userOut:function(){
            $('#user-out').on('click',function(){
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');
                location.reload()
            })
        }
    }
})