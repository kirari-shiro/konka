require.config({
    paths:{
        jquery:'./jquery.min',
        index:'./lib/index',
        product:'./lib/product'
    }
});


require(['index'], function(index) {
    index.search();
    index.tool()
});

require(['product'],function(pro){
        pro.tabs();
        pro.scroll();
    pro.render(function(id){
        pro.loupe();
        pro.addCar(id);
        pro.addNum();
        
    });
    
})