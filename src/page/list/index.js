/*
* @Author: ren522686239
* @Date:   2017-11-30 19:43:32
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-11-30 23:15:17
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');


var _mm 				= require('util/mm.js');
var _product 			= require('service/product-service.js');
var templateIndex 		= require('./index.string');
var Pagination 			= require('util/pagination/index.js');

var page = {
	data : {
		listParam : {
			keyword 	: _mm.getUrlParam('keyword') 	|| '',
			categoryId 	: _mm.getUrlParam('categoryId') || '',
			orderBy 	: _mm.getUrlParam('orderBy') 	|| 'default',
			pageNum 	: _mm.getUrlParam('pageNum') 	|| 1,
			pageSize	: _mm.getUrlParam('pageSize') 	|| 20
		}
	},
	init :function(){
		this.onLoad();
		this.bindEvent();	
	},
	bindEvent : function(){
		var _this = this;
		// 排序点击
		$('.sort-item').click(function(){
			var $this = $(this);
			// 默认排序
			if ($this.data('type') === 'default') {
				if ($this.hasClass('active')) {
					return;
				}
				else{
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			// 价格排序
			else{
				if ($this.data('type') === 'price') {
					// active class处理
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
				// 升序降序处理
					if (!$this.hasClass('asc')) {
						$this.addClass('asc').removeClass('desc');
						_this.data.listParam.orderBy = 'price_asc';
					}else{
						$this.addClass('desc').removeClass('asc');
						_this.data.listParam.orderBy = 'price_desc';
					}
				}
			}
			_this.loadList();
		});
	},
	onLoad : function(){
		this.loadList();
	},
	// 加载列表
	loadList : function(){
		var _this = this,
			html  = '',
			listParam = this.data.listParam,
			$listCon = $('.list-con');
		_this.data.listParam.keyword ? (delete listParam.categoryId) : (delete listParam.keyword);
		_product.getProductList(listParam,function(res){
			html = _mm.renderHtml(templateIndex,{
				list : res.list
			});
			$listCon.html(html);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});
		},function(errMsg){
			_mm.errorTips(errMsg);
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
				_this.loadList();
			},
		}));
		
	}
};

$(function() {
	page.init();
});
