/*
* @Author: ren522686239
* @Date:   2017-11-28 21:28:38
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-28 22:57:46
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
var navSide 		= require('page/common/nav-side/index.js');
var templateIndex 	= require('./index.string');

var page = {
	init :function(){
		navSide.init({
			name:'user-center'
		});
		this.bindEvent();
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone 		: $.trim($('#phone').val()),
				email 		: $.trim($('#email').val()),
				question 	: $.trim($('#question').val()),
				answer 		: $.trim($('#answer').val())
			},
			validateResult = _this.formValidata(userInfo);
			if (validateResult.status) {
				// 更改用户信息
				_user.updateUserInfo(userInfo,function(data,msg){
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		_user.loadUserInfo(function(res){
			var html = _mm.renderHtml(templateIndex,res);

			$('.panel-body').html(html);

		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	// 验证字段
	formValidata : function(formData){
		var result = {
			status 	: false,
			msg 	:''
		};
		
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