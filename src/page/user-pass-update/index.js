/*
* @Author: ren522686239
* @Date:   2017-11-28 21:28:49
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-28 23:52:29
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
var navSide 		= require('page/common/nav-side/index.js');

var page = {
	init :function(){
		navSide.init({
			name:'user-pass-update'
		});
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			console.log($.trim($('#passowrd').val()));
			var userInfo = {
				password 			: $.trim($('#password').val()),
				passwordNew 		: $.trim($('#passwordNew').val()),
				passwordConfirm 	: $.trim($('#passwordConfirm').val())
			},
			validateResult = _this.formValidata(userInfo);
			if (validateResult.status) {
				// 更改用户信息
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	
	// 验证字段
	formValidata : function(formData){
		var result = {
			status 	: false,
			msg 	:''
		};
		
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (!_mm.validate(formData.passwordNew,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (!_mm.validate(formData.passwordConfirm,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = '两次密码不一致';
			return result;
		}
		if (formData.passwordNew.length < 6) {
			result.msg = '密码不能少于6位';
			return result;
		}
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;
	},
};

$(function() {
	page.init();
});