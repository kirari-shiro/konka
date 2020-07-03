require.config({
    paths:{
        jquery:'./jquery.min',
        index:'./lib/index',
        shop:'./lib/shop'
    }
})


require(['index'],function(index){
    index.search(),
    index.tool()
})

require(['shop'],function(shop){
    shop.render(function(){
        shop.del();
        shop.check();
        shop.checkAll();
        shop.addNum();
        shop.changeNum()
    })
})