/*
* @Author: ren522686239
* @Date:   2017-12-05 17:17:38
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-05 18:42:36
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var navSide 		= require('page/common/nav-side/index.js');
var templateIndex 	= require('./index.string');
var Pagination 		= require('util/pagination/index.js');

var page = {
	data : {
		listParam : {
			pageSize : 10,
			pageNum  : 1,
		}
	},
	init :function(){
		navSide.init({
			name:'order-list'
		});
	this.onLoad();
	
	},
	onLoad : function(){
		this.loadOrderList();
	},
	loadOrderList : function(){
		var _this = this,
			$listCon = $('.order-list'),
			listHtml = '';
		_order.getOrderList(this.data.listParam,function(res){

			listHtml = _mm.renderHtml(templateIndex,res);
			$listCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});

		},function(errMsg){
			$listCon.html('<p class="err-tip"></p>')
		});
	},
	// 加载分页
	loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination);
		this.pagination.render($.extend({},pageInfo,{
			container 	: $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			},
		}));
		
	}

	
};

$(function() {
	page.init();
});
