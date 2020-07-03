var baseUrl = 'http://localhost/konka';


define(['jquery'], function ($) {
    return {
        render: function (callback) {
            let shop = localStorage.getItem('shop');
            if (shop) {
                shop = JSON.parse(shop);
                let id = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/getshop.php`,
                    data: {
                        idList:id
                    },
                    dataType: "json",
                    success: function (data) {
                        let temp='',
                            num=0,
                            numT=0;
                        data.forEach(elm=>{
                            let pri=JSON.parse(elm.price);
                            shop.forEach(val=>{
                                if(val.id==elm.id){
                                    num=val.num
                                }
                            })
                            numT+=pri.now*num;
                            temp+=`
                            <ul title="${elm.id}">
                                <li><input type="checkbox" checked class="check"></li>
                                <li>
                                    <img src="${baseUrl}/src/${elm.pic}" alt="">
                                    <p>
                                        <span>${elm.name}</span>
                                        <span>${elm.detail}</span>
                                    </p>
                                </li>
                                <li>${pri.now}</li>
                                <li>
                                    <button type="button" class="btn btn-default input-cut">-</button>
                                    <input type="text" value="${num}" id="number">
                                    <button type="button" class="btn btn-default input-add">+</button>

                                </li>
                                <li>${(pri.now*num).toFixed(2)}</li>
                                <li>
                                    <a href="javascript:;" class="del">删除</a>
                                    <a href="javascript:;">移到收藏夹</a>
                                </li>
                            </ul>`
                        });
                        $('.shop_noun').html(temp);
                        $('.numT').html(numT.toFixed(2));
                        $('.total').html(data.length)

                        callback&&callback();
                    }
                });
            }
        },
        del:function(){
            $('.del').on('click',function(){
                let shop = localStorage.getItem('shop'),
                    ul=$(this).parent().parent(),
                    arr=[];

                shop = JSON.parse(shop);
                shop.forEach(elm=>{
                    if(elm.id !=ul.attr('title')){
                        arr.push(elm)
                    }
                })
                localStorage.setItem('shop',JSON.stringify(arr))
                ul.remove();
                
                let check=$('.check:checked'),
                    numT=0;
                $('.check:checked').parent().parent().children('li:nth-child(3)').each(function(i,elm){
                    let num=$(elm).parent().children('li:nth-child(4)').children('input').val()
                   numT+= $(elm).html()*num
                })
                $('.numT').html(numT.toFixed(2));
                $('.total').html(check.length)
            })
        },
        check:function(){
            $('.check').on('click',function(){
                let check=$('.check:checked'),
                numT=0;
                $('.check:checked').parent().parent().children('li:nth-child(3)').each(function(i,elm){
                    let num=$(elm).parent().children('li:nth-child(4)').children('input').val()
                   numT+= $(elm).html()*num
                })
                $('.numT').html(numT.toFixed(2));
                $('.total').html(check.length)
            })
            
        },
        checkAll:function(){
            $('.check-all').on('click',function(){

                let flag=$(this).prop('checked')

                $('input[type=checkbox]').prop('checked',flag)


                let check=$('.check:checked'),
                numT=0;
                $('.check:checked').parent().parent().children('li:nth-child(3)').each(function(i,elm){
                    let num=$(elm).parent().children('li:nth-child(4)').children('input').val()
                   numT+= $(elm).html()*num
                })
                $('.numT').html(numT.toFixed(2));
                $('.total').html(check.length)
            })
        },
        addNum:function(){
            $('.input-add').on('click',function(){
                let number=$(this).siblings('#number');
                let num=number.val();
                num++;
                if(num<=0){
                    num=1;
                };
                number.val(num);


                $(this).parent().parent().children('li:nth-last-child(2)').html(
                    ($(this).parent().parent().children('li:nth-child(3)').html()*num).toFixed(2)
                )

                let check=$('.check:checked'),
                numT=0;
                $('.check:checked').parent().parent().children('li:nth-child(3)').each(function(i,elm){
                    let num=$(elm).parent().children('li:nth-child(4)').children('input').val()
                   numT+= $(elm).html()*num
                })
                $('.numT').html(numT.toFixed(2));
                $('.total').html(check.length)
            })
            $('.input-cut').on('click',function(){
                let number=$(this).siblings('#number');
                let num=number.val();
                num--;
                if(num<=0){
                    num=1;
                };
                
                number.val(num);

                $(this).parent().parent().children('li:nth-last-child(2)').html(
                    ($(this).parent().parent().children('li:nth-child(3)').html()*num).toFixed(2)
                )

                let check=$('.check:checked'),
                numT=0;
                $('.check:checked').parent().parent().children('li:nth-child(3)').each(function(i,elm){
                    let num=$(elm).parent().children('li:nth-child(4)').children('input').val()
                   numT+= $(elm).html()*num
                })
                $('.numT').html(numT.toFixed(2));
                $('.total').html(check.length)
            })
        },
        changeNum:function(){
            $('.shop_noun').on('input','#number',function(){
                let num=$(this).val();
                if(!num>0){
                    num=1
                }else{
                    num=parseInt(num);
                }
                $(this).val(num);

                $(this).parent().parent().children('li:nth-last-child(2)').html(
                    ($(this).parent().parent().children('li:nth-child(3)').html()*num).toFixed(2)
                )

                let check=$('.check:checked'),
                numT=0;
                $('.check:checked').parent().parent().children('li:nth-child(3)').each(function(i,elm){
                    let num=$(elm).parent().children('li:nth-child(4)').children('input').val()
                   numT+= $(elm).html()*num
                })
                $('.numT').html(numT.toFixed(2));
                $('.total').html(check.length)
            })
        }
    }
})