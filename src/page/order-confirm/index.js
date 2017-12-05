/*
* @Author: ren522686239
* @Date:   2017-12-03 20:00:04
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-05 21:16:48
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');


var _mm 				= require('util/mm.js');
var _address			= require('service/address-service.js');
var _order				= require('service/order-service.js');
var _addressModal 		= require('./address-modal.js');
var templateAddressList = require('./address-list.string');
var templateProductList = require('./product-list.string');

var page = {
	data : {
		selectedAddressId : null
	},
	init :function(){
		this.bindEvent();
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		// 添加新地址
		$(document).on('click','.address-new',function(){
			_addressModal.show({
				isUpdate : false,
				onSuccess : function(data){
					_this.loadAddressList();
				}
			});
		});
		// 编辑地址
		$(document).on('click','.address-edit',function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				_addressModal.show({
					isUpdate : true,
					onSuccess : function(data){
						_this.loadAddressList();
					},
					data : res
				});
			},function(errMsg){
				_mm.errorTips(errMsg);
			})
			
		});
		// 删除地址
		$(document).on('click','.address-delete',function(e){
			e.stopPropagation();
			if (window.confirm('确认要删除该地址吗')) {
				var shippingId = $(this).parents('.address-item').data('id');
				_address.deleteAddress(shippingId,function(res){
					_this.loadAddressList();
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			
			
		});
		// 地址的选中
		$(document).on('click','.address-item',function(){
			var $this = $(this);
			$this.hasClass('active') ? '' :$this.addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $this.data('id');
		});
		// 订单提交
		$(document).on('click','.submit-btn',function(){
			var shippingId = _this.data.selectedAddressId;
			if (shippingId) {
				_order.createOrder({
					shippingId : shippingId
				},function(res){
					window.location.href = './payment.html?orderNumber=' + res.orderNO;
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips('请选择地址后在提交');
			}
		});
	},
	// 加载地址列表
	loadAddressList : function(){
		var addressHtml = '',
			_this = this;
		$('.address-con').html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			addressHtml =  _mm.renderHtml(templateAddressList,res);
			$('.address-con').html(addressHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	// 加载订单列表
	loadProductList : function(){
		var prodcutListHtml = '';
		$('.address-con').html('<div class="loading"></div>');
		_order.getProductList(function(res){
			prodcutListHtml = _mm.renderHtml(templateProductList,res);
			$('.product-con').html(prodcutListHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	addressFilter : function(data){
		if (this.data.selectedAddressId) {
			var selectedAddressIdFlag = false;
			for (var i = 0 ,length = data.list.length; i <length; i++) {
				if (data.list[i].id === this.data.selectedAddressId) {
					data.list[i].isActive   = true;
					selectedAddressIdFlag = true;
				}
			}
			if (!selectedAddressIdFlag) {
				this.data.selectedAddressId = null;
			}
		}
	}

};

$(function() {
	page.init();
});