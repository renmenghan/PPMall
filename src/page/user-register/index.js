/*
* @Author: ren522686239
* @Date:   2017-11-28 10:26:32
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-28 10:54:12
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util//mm.js');
var _user = require('service/user-service.js');
//表单错误提示
var formError = {
	show : function(msg){
		$('.error-item').show().find('.err-msg').text(msg);
	},
	hide : function(){
		$('.error-item').hide();
	}
};

var page = {
	init :function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		// 检测用户名
		$('#user-name').blur(function(){
			var username = $.trim($(this).val());
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		//提交表单
		$('.btn-submit').click(function(){
			_this.submit();
		});

		// 回车提交
		$('.user-input').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});

	},
 	// 表单提交
	submit : function(){
		var formData = {
			username  				: $.trim($('#user-name').val()),
			password  				: $.trim($('#user-password').val()),
			passwordConfirm  		: $.trim($('#user-password-confirm').val()),
			phone  					: $.trim($('#user-phone').val()),
			email  					: $.trim($('#user-email').val()),
			question  				: $.trim($('#user-password').val()),
			answer  				: $.trim($('#user-answer').val())
		},
		// 验证结果
		validataResult =  this.formValidata(formData);
		if (validataResult.status) {
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else {
			formError.show(validataResult.msg);
		}
		
	},
	// 验证字段
	formValidata : function(formData){
		var result = {
			status 	: false,
			msg 	:''
		};
		if (!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (formData.password !== formData.passwordConfirm) {
			result.msg = '两次密码不一致';
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if (!_mm.validate(formData.phone,'phone')) {
			result.msg = '手机格式不正确';
			return result;
		}
		if (!_mm.validate(formData.email,'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		if (!_mm.validate(formData.question,'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if (!_mm.validate(formData.answer,'require')) {
			result.msg = '密码提示问题答案不能为空';
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