/*
* @Author: ren522686239
* @Date:   2017-11-26 17:56:31
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-26 19:22:34
*/
'use strict';
require('./index.css');

var _mm = require('util/mm.js');

var header = {
	init : function() {
		this.bindEvent();
		this.load();
		return this;
	},
	load : function(){
		var keyword =  _mm.getUrlParam('keyword');
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		$('.search-btn').click(function(){
			_this.searchSubmit();
		});
		$('.search-input').keyup(function(e){
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
			
		})
	},
	searchSubmit : function(){
		var keyword =  $.trim($('#search-input').val());
			if (keyword) {
				window.location.href = './list.html?keyword=' + keyword;
			}else{
				_mm.goHome();
			}
	}
	
};
header.init();
