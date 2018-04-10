// 1、配置文件
require.config({
    // 配置别名
    paths:{
        jquery:'../lib/jquery-3.2.1',
        header:'../js/header',
        fcarousel:'../lib/jquery-fcarousel/jquery.fCarousel',
        fzoom:'../lib/jquery-fzoom/jquery.fZoom'
    },
    // 配置依赖
    shim:{
        fcarousel:['jquery'],
        header:['jquery'],
        fzoom:['jquery']
    }
});