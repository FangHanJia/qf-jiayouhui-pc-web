'use strict';

// 1、配置文件
require.config({
    // 配置别名
    paths: {
        jquery: '../lib/jquery-3.2.1',
        fcarousel: '../lib/jquery-fcarousel/jquery.fCarousel',
        fzoom: '../lib/jquery-fzoom/jquery.fZoom',
        header: 'header',
        common: 'common'
    },
    // 配置依赖
    shim: {
        fcarousel: ['jquery'],
        header: ['jquery'],
        fzoom: ['jquery']
    }
});