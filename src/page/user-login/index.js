/*
* @Author: ren522686239
* @Date:   2017-11-27 21:12:53
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-28 10:50:58
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
		// 表单提交
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
			username  : $.trim($('#user-name').val()),
			password  : $.trim($('#user-password').val()),
		},
		// 验证结果
		validataResult =  this.formValidata(formData);
		if (validataResult.status) {
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redicrect') || './index.html';
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
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;
	},
};

$(function() {
	page.init();
});
