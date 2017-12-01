/*
* @Author: ren522686239
* @Date:   2017-11-30 21:37:08
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-30 22:50:17
*/
'use strict';
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');


var Pagination = function() {
	var _this = this;

	this.defaultOption = {
		container 		: null,
		pageNum 		:1,
		pageRange	 	:3,
		onSelectPage 	: null
	};
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		// 对active 和disabled 不做处理
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
	});
};

// 渲染分页组件
Pagination.prototype.render = function(userOption){
	//合并选项
	this.option = $.extend({},this.defaultOption,userOption);
	// 判断容器对象是否为合法jquery对象
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	// 判断是否只有一页
	if (this.option.pages <= 1){
		return;
	}
	this.option.container.html(this.getPaginationHtml());
};
Pagination.prototype.getPaginationHtml = function(){
// |上一页| 1 2 3 4 5 6 |下一页| 5/6
	var html 		= '',
		pageArray 	= [],
		option  	= this.option,
		start 		= option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
		end 		= option.pageNum + option.pageRange > option.pages ? option.pages : option.pageNum + option.pageRange;
	// 上一页按钮数据
	pageArray.push({
		name 	: '上一页',
		disabled : !this.option.hasPreviousPage,
		value 	: this.option.prePage
	});
	// 页数范围
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name 	: i,
			value 	: i,
			active  : (i === this.option.pageNum)
		});
	}
	// 下一页
	pageArray.push({
		name 	: '下一页',
		disabled : !this.option.hasNextPage,
		value 	: this.option.nextPage
	});
	html = _mm.renderHtml(templatePagination,{
		pageArray 	: pageArray,
		pages 		: option.pages,
		pageNum		: option.pageNum

	});
	return html;
};

module.exports = Pagination;