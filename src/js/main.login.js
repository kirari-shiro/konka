require.config({
    paths:{
        jquery:'./jquery.min',
        index:'./lib/index',
        login:'./lib/login'
    }
});


require(['index'], function(index) {
    index.search();
    index.tool();
});


require(['login','jquery'],function(login,$){
    login.confirm();
    login.login();
    login.vcode();
    $('.btn-vcode').on('click',function(){
        login.vcode();
    })
})