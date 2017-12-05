/*
* @Author: ren522686239
* @Date:   2017-11-26 11:59:35
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-03 20:02:21
*/
'use strict';
require('./index.css');

var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var _user = require('service/user-service.js');

var _nav = {
	init : function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();	
		return this;
	},
	bindEvent : function(){
		// 登录按钮
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		// 注册按钮
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});

		// 登出按钮
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	loadUserInfo : function(){
		_user.checkLogin(function(res){
			$('.no-login').hide().siblings('.login-info').show().find('.user-name').text(res.username);
		},function(error){

		});
	},
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		},function(errMsg){
			$('.nav .cart-count').text(0);
		});
	},
};

module.exports = _nav.init();