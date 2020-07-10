var baseUrl='http://localhost/konka';

define(['jquery'],function($){
    return{
        render:function(callback){
            let id=location.search.split('=')[1]
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getpro.php`,
                data: {
                    id:id
                },
                dataType: "json",
                success: function (data) {
                    let price=JSON.parse(data.price);
                    $('.content-title').html(`<li>
                    <a href="javascript:;">${data.type}</a>
                  </li>
                  <li class="content-title-active">
                    ${data.name}
                  </li>`);
                    $('.pic-gb').html(`<img src="../img/star/star${data.id}/1.jpg" alt="">
                    <img src="../img/star/star${data.id}/1.jpg" alt="">`);
                    $('.pic-list').html(`
                    <i class="glyphicon glyphicon-menu-up picUp" style="color: rgb(96, 96, 96);"></i>
                    <li ><img src="../img/star/star${data.id}/1.jpg" alt="" class="ig" data-a='A1'></li>
                    <li ><img src="../img/star/star${data.id}/2.jpg" alt="" class="ig" data-a='A2'></li>
                    <li ><img src="../img/star/star${data.id}/3.jpg" alt="" class="ig" data-a='A3'></li>
                    <li ><img src="../img/star/star${data.id}/4.jpg" alt="" class="ig" data-a='A4'></li>
                    <li ><img src="../img/star/star${data.id}/5.jpg" alt="" class="ig" data-a='A5'></li>
                    <i class="glyphicon glyphicon-menu-down picDown" style="color: rgb(96, 96, 96);"></i>`);
                    $('.content-detail').html(`
                    <h3>${data.name}</h3>
                    <div>${data.detail}</div>`)
                    $('.price>p').html(`
                    
                      ￥${price.now}
                      <span>￥${price.old}</span>
                    `)

                    callback&&callback(data.id);
                }
            });
        },
        loupe:function(){
            let spic=$('.pic-gb>img').eq(0),
                lpic=$('.pic-gb>img').eq(1),
                oim=$('.pic-list>li>img'),
                box=$('.pic-gb');

               oim.mouseenter(function () {
                    oim.parent().removeClass('active');
                    $(this).parent().addClass('active');
                    spic.attr('src',$(this).attr('src'));
                    lpic.attr('src',$(this).attr('src'));
                });
                
               box.mouseover(function () { 

                   lpic.css('opacity',1);
                   box.mousemove(function(ev){
                        let ratio=(lpic.outerWidth()-box.outerWidth())/box.outerWidth(),
                            x=ev.pageX-box.offset().left,
                            y=ev.pageY-box.offset().top;
                        lpic.css({
                            top:-y*ratio,
                            left:-x*ratio
                        })

                   })
                   


                   box.mouseout(function () { 
                    lpic.css('opacity',0)
                   });

               });
               
        },
        addCar:function(id){
            $('.shopcar>.btn-warning').on('click',function(){
                let shopcar=localStorage.getItem('shop'),
                    num=$('#number').val();
                if(num<=0){
                    num=1;
                };
                let product = {
                    id: id,
                    num: num
                } 
                if(shopcar){
                    shopcar=JSON.parse(shopcar);
                    if( shopcar.some(elm=>elm.id==id)){
                        shopcar.forEach(
                            elm=> { elm.id==id? elm.num=num:null;}
                        )
                    }else{
                        shopcar.push(product);
                    }
                }else{
                    shopcar=[];
                    shopcar.push(product);
                }

                localStorage.setItem('shop',JSON.stringify(shopcar))
            })
        },
        addNum:function(){
            $('.input-add').on('click',function(){
                let num=$('#number').val();
                if(num<=0){
                    num=1;
                };
                num++;
                $('#number').val(num);
            })
            $('.input-cut').on('click',function(){
                let num=$('#number').val();
                num--;
                if(num<=0){
                    num=1;
                };
                
                $('#number').val(num);
            })
        },
        tabs:function(){
            $('.intr-tabs>li').on('click',function(){
                let top=$(`#${$(this).attr('title')}`).offset().top;
                console.log($(`#${$(this).attr('title')}`))
                top-=60
                $('body,html').animate({
                    scrollTop:top
                },200);
                $('.intr-tabs>li').removeClass('active');
                $(`.intr-tabs>li[title=${$(this).attr('title')}]`).addClass('active');
            })
        },
        scroll:function(){
            $(window).scroll(function () {
                let top=$('#intr').offset().top-60;
                if($(window).scrollTop()>=top){
                    $('.intr-nav').css('display','block')
                }else{
                    $('.intr-nav').css('display','none')
                }
            });
        },
        changeNum:function(){
            $('#number').on('input',function(){
                let num=$(this).val();
                num=num.replace(/\D|^[0]/g,'');
                if(!num){
                    num=1
                }
                $(this).val(num);

            })
        }
    }
})