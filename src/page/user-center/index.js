/*
* @Author: ren522686239
* @Date:   2017-11-28 21:28:59
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-28 22:05:54
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
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		_user.loadUserInfo(function(res){
			var html = _mm.renderHtml(templateIndex,res);

			$('.panel-body').html(html);

		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};

$(function() {
	page.init();
});

