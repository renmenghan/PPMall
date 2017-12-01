/*
* @Author: ren522686239
* @Date:   2017-12-01 16:31:23
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-01 18:46:46
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 				= require('util/mm.js');
var _product 			= require('service/product-service.js');
var _cart				= require('service/cart-service.js');
var templateIndex 		= require('./index.string');

var page = {
	data : {
		productId : _mm.getUrlParam('productId') || ''
	},
	init :function(){
		this.onLoad();
		this.bindEvent();	
	},
	bindEvent : function(){
		var _this = this;
		// count 加减
		$(document).on('click','.p-count-btn',function(){
			var $this = $(this),
				$pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock,
				type = $this.hasClass('plus') ? 'plus' : 'minus';
			if (maxCount === 0) {
				return;
			}
			if (type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			}else if (type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}

		});
		// 小图预览
		$(document).on('mouseenter','.p-img-item',function(){
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imageUrl);
		});
		// 加入购物车
		$(document).on('click','.cart-add',function(){
			_cart.addToCart({
				productId 	: _this.data.productId,
				count 		: $('.p-count').val()
			},function(res){
				window.location.href = './result.html?type=cart-add';
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
		
	},
	onLoad : function(){
		this.loadDetail();
	},
	// 加载列表
	loadDetail : function(){
		var _this 	= this,
			html	= '',
			$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');

		_product.getProductDetail(_this.data.productId,function(res){
			// 缓存商品信息
			_this.data.detailInfo = res;

			_this.filter(res);
			// render
			html = _mm.renderHtml(templateIndex,res);

			$pageWrap.html(html);
			if (res.stock == 0) {
				$('.p-count').val(0);
			}

		},function(errMsg){
			$pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>')
		});
	},

	filter : function(data){
		data.subImages = data.subImages.split(',');
	}

};

$(function() {
	page.init();
});