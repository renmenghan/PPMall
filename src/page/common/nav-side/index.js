/*
* @Author: ren522686239
* @Date:   2017-11-26 20:31:41
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-26 20:58:26
*/
'use strict';
require('./index.css');

var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var navSide = {
	option : {
		name : '',
		navList : [
			{name : 'user-center',		desc : '个人中心',		href : './user-center.html'},
			{name : 'order-list',		desc : '我的订单',		href : './user-center.html'},
			{name : 'user-pass-update',	desc : '修改密码',		href : './user-pass-update.html'},
			{name : 'about',			desc : '关于PPMall',		href : './about.html'}
		],
	},
	init : function(option) {
		// 合并选项
		$.extend(this.option,option);

		this.renderNav();
	},
	// 渲染nav
	renderNav : function(){
		for (var i = 0 ,iLength = this.option.navList.length; i <iLength; i++) {
			if (this.option.name === this.option.navList[i].name) {
				this.option.navList[i].isActive = true;
			}
		};

		// 渲染数据
		var html = _mm.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		$('.nav-side').html(html);

	}
	
};

module.exports = navSide;