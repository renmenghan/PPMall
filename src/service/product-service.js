/*
* @Author: ren522686239
* @Date:   2017-11-30 20:16:16
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-01 18:01:21
*/
'use strict';
var _mm = require('util/mm.js');

var product = {
	// 查询购物车数量
	getProductList:function(param,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/product/list.do'),
			data	:param,
			success : resolve,
			error	:reject
		});
	},
	// 获取商品详情
	getProductDetail:function(param,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/product/detail.do'),
			data	:{
				productId : param
			},
			success : resolve,
			error	:reject
		});
	},

};
module.exports = product;
