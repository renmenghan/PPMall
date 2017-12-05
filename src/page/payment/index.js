/*
* @Author: ren522686239
* @Date:   2017-12-05 21:12:07
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-05 21:30:34
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 				= require('util/mm.js');
var _payment			= require('service/payment-service.js');
var templateIndex 		= require('./index.string');

var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber') 
	},
	init :function(){
		this.onLoad();
	},
	
	onLoad : function(){
		this.loadPayment();
	},
	loadPayment : function(){
		var _this = this,
			html = '';
		_payment.getPaymentInfo(this.data.orderNumber,function(res){
			html = _mm.renderHtml(templateIndex,res);
			$('.page-wrap').html(html);
			_this.listenOrderStatus();
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(res){
				if (res === true) {
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		},5e3);
	}
	
};

$(function() {
	page.init();
});