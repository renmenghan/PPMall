/*
* @Author: ren522686239
* @Date:   2017-11-24 20:27:48
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-30 16:25:35
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');

var _mm 			= require('util/mm.js');
var templateBanner 	= require('./banner.string');
$(function() {
	// 渲染bannerhtml
	var bannerHtml = _mm.renderHtml(templateBanner);

	$('.banner-wrap').html(bannerHtml);
	// 初始化banner
    var unslider = $('.banner').unslider({
    	dots: true,
    });

    $('.banner-wrap .banner-arrow').click(function(){
    	var forword = $(this).hasClass('prev') ? 'prev' : 'next';

    	unslider.data('unslider')[forword]();
    });
});