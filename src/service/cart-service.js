/*
* @Author: ren522686239
* @Date:   2017-11-26 12:17:28
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-01 18:46:28
*/
'use strict';
var _mm = require('util/mm.js');

var _cart = {
	// 查询购物车数量
	getCartCount:function(userInfo,resolve,reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error	:reject
		});
	},
	//添加到购物车
	addToCart : function(productInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/cart/add.do'),
			data	:productInfo,
			success	: resolve,
			error	: reject
		});
	},

};
module.exports = _cart;