/*
* @Author: ren522686239
* @Date:   2017-12-05 17:18:15
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-05 20:56:02
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var navSide 		= require('page/common/nav-side/index.js');
var templateIndex 	= require('./index.string');

var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init :function(){
		navSide.init({
			name:'order-list'
		});
	this.onLoad();
	this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.cancle-btn',function(){
			if (window.confirm('确认要取消该订单吗')) {
				_order.cancelOrder(_this.data.orderNumber,function(res){
					_mm.successTips('该订单取消成功');
					_this.loadOrderDetail();
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
		});
	},
	onLoad : function(){
		this.loadOrderDetail();
	},

	loadOrderDetail : function(){
		var html = '',
			_this = this;
		$('.content').html('<div class="loading"></div>');
		_order.getOrderDetail(this.data.orderNumber,function(res){
			_this.dataFilter(res);
			html = _mm.renderHtml(templateIndex,res);
			$('.content').html(html);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	dataFilter : function(data){
		data.needPay 		= data.status == 10;
		data.isCancelble 	= data.status == 10;
	}
};

$(function() {
	page.init();
});