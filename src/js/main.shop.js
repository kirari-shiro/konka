require.config({
    paths:{
        jquery:'./jquery.min',
        index:'./lib/index',
        shop:'./lib/shop'
    }
})


require(['index'],function(index){
    index.search();
    index.tool();
    index.userSave();
    index.userOut();
})

require(['shop'],function(shop){
    shop.checkAll();

    shop.render(function(){
        shop.del();
        shop.check();
        shop.addNum();
        shop.changeNum();
    })
})