/*
* @Author: ren522686239
* @Date:   2017-11-26 21:36:32
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-05 21:56:01
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	if (type === 'payment') {
		var orderNumber = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
	}
	$element.show();
});