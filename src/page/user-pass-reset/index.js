/*
* @Author: ren522686239
* @Date:   2017-11-28 17:24:39
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-28 19:18:45
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
	data : {
		username : '',
		question : '',
		answer	 : '',
		token	 : ''
	},
	init :function(){

		this.bindEvent();
		this.onLoad();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		// 用户名提交
		$('.username-submit').click(function(){
			var username = $.trim($('#user-name').val());
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else{
				formError.show('请输入用户名');
			}
		});
		// 答案提交
		$('.answer-submit').click(function(){
			var answer = $.trim($('#user-answer').val());
			if (answer) {
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer 	:answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请密码提示问题的答案');
			}
		});
		// 密码提交
		$('.password-submit').click(function(){
			var password = $.trim($('#user-password').val());
			if (password) {
				_user.resetPassword({
					username 		: _this.data.username,
					forgetToken   	: _this.data.token,
					passwordNew  	: password
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入不少于6位的新密码');
			}
		});
		// 回车提交
		$('.user-input').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	loadStepUsername : function(){
		$('.step-username').show();
	},
	loadQuestion : function(){
		formError.hide();
		$('.step-username').hide().siblings('.step-answer').show().find('.user-item-question').text('密码提示问题为：' + this.data.question);
	},
	loadPassword : function(){
		formError.hide();
		$('.step-password').show().siblings('.step-answer').hide();
	},
 	
};

$(function() {
	page.init();
});