require.config({
    paths:{
        jquery:'./jquery.min',
        index:'./lib/index',
        reg:'./lib/reg'
    }
});


require(['index'], function(index) {
    index.search();
    index.tool()
});

require(['reg','jquery'],function(reg,$){
    reg.reg();
    reg.vcode();
    $('.btn-vcode').on('click',function(){
        reg.vcode();
    })
})