/*
* @Author: ren522686239
* @Date:   2017-12-02 16:21:52
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-03 19:57:54
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');


var _mm 				= require('util/mm.js');
var _cart				= require('service/cart-service.js');
var nav					= require('page/common/nav/index.js');
var templateIndex 		= require('./index.string');

var page = {
	data : {

	},
	init :function(){
		this.onLoad();
		this.bindEvent();	
	},
	bindEvent : function(){
		var _this = this;
		
		// 数量加减
		$(document).on('click','.cart-btn',function(){
			var $this 		= $(this),
			    type  		= $this.hasClass('plus') ? 'plus' : 'minus',
			    $pCount 	= $this.siblings('.count-input'),
			    currCount 	= parseInt($pCount.val()),
			    maxCount 	= parseInt($pCount.data('max')),
			    minCount 	= 1,
			    newCount 	= 0,
			    productId 	= $this.parents('.cart-table').data('product-id');
			if (type === 'plus') {
				if (currCount >= maxCount) {
					_mm.errorTips('该商品数量达到上限');
					return;
				}
				newCount = currCount + 1;
			}else if (type === 'minus') {
				if (currCount <= minCount) {
					return;
				}
				newCount = currCount - 1;
			}

			_cart.updateProduct({
				productId 	: productId,
				count 		: newCount
			},function(res){
				_this.render(res);
			},function(errMsg){
				_this.showError();
			});
		});
		// 全选、 取消全选
	 	$(document).on('click','.cart-select-all',function(){
	 		var $this = $(this);
			// 全选(已经变成checked所以应该调用全选)
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function(res){
					_this.render(res);
				},function(errMsg){
					_this.showError();
				})
			}
			// 取消全选
			else {
				_cart.unselectAllProduct(function(res){
					_this.render(res);
				},function(errMsg){
					_this.showError();
				})
			}
	 	});
	 	// 选中 取消选中
	 	$(document).on('click','.cart-select',function(){
	 		var $this = $(this),
				productId =  $this.parents('.cart-table').data('product-id');

			// 选中
			if ($this.is(':checked')) {
				_cart.selectProduct(productId,function(res){
					_this.render(res);
				},function(errMsg){
					_this.showError();
				})
			}
			// 取消选中
			else {
				_cart.unselectProduct(productId,function(res){
					_this.render(res);
				},function(errMsg){
					_this.showError();
				})
			}
	 	});
	 	// 删除单个商品
	 	$(document).on('click','.cart-delete',function(){
	 		var $this = $(this),
				productId =  $this.parents('.cart-table').data('product-id');
			if (window.confirm('确认要删除该商品吗')) {
				_this.deleteProdcut(productId);
			}
	 	});
	 	// 删除选中商品
	 	$(document).on('click','.cart-delete-selected',function(){
	 		var $selectedItems =  $('.cart-select:checked'),
				arrProductIds = [];
			if (window.confirm('确认要删除选中的商品吗')) {
				for (var i = 0; i < $selectedItems.length; i++) {
					arrProductIds.push($($selectedItems[i]).parents('.cart-table').data('product-id'));
				}
				if (arrProductIds.length > 0) {
					_this.deleteProdcut(arrProductIds.join(','));
				}
				
			}
	 	});
	 	// 去结算
	 	$(document).on('click','.submit-btn',function(){
	 		window.location.href = './order-confirm.html';
	 	});
		
	},
	onLoad : function(){
		
		this.loadCartList();
	},
	// 加载列表
	loadCartList : function(){
		var _this 		= this,
			cartHtml 	= '';
		_cart.getCartList(function(res){
			_this.render(res);
		},function(errMsg){
			_this.showError();
		});
	},
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	// 渲染html
	render : function(res){
		var _this 		= this,
			cartHtml 	= '';
		_this.filter(res);
			// 缓存数据
		_this.data.cartInfo = res;
			// 渲染模板
		cartHtml = _mm.renderHtml(templateIndex,res);
		$('.page-wrap').html(cartHtml);
		// 通知导航购物车更新数量
		nav.loadCartCount();
	},
	deleteProdcut : function(productIds){
		var _this 		= this;
		_cart.deleteProduct(productIds,function(res){
			_this.render(res);
		},function(errMsg){
			_this.showError();
		});
	},
	showError : function(){
		$('.page-wrap').html('<p class="err-tip">不知道哪里不对了，刷新一下试试吧</p>')
	}

};

$(function() {
	page.init();
});