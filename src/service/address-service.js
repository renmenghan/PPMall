/*
* @Author: ren522686239
* @Date:   2017-12-03 21:57:03
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-04 12:47:27
*/
'use strict';
var _mm = require('util/mm.js');

var _address = {
	// 获取地址列表
	getAddressList : function(resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/list.do'),
			data	: {
				pageSize : 50
			},
			success	: resolve,
			error	: reject
		});
	},
	// 保存收件人
	save : function(addressInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/add.do'),
			data	: addressInfo,
			success	: resolve,
			error	: reject
		});
	},
	// 获取单条收件人信息
	getAddress : function(shippingId,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/select.do'),
			data	: {
				shippingId : shippingId
			},
			success	: resolve,
			error	: reject
		});
	},
	// 更新收件人
	update : function(addressInfo,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/update.do'),
			data	: addressInfo,
			success	: resolve,
			error	: reject
		});
	},
	// 删除收件人
	deleteAddress : function(id,resolve,reject){
		_mm.request({
			url 	: _mm.getServerUrl('/shipping/del.do'),
			data	: {
				shippingId : id
			},
			success	: resolve,
			error	: reject
		});
	},

}
module.exports = _address;