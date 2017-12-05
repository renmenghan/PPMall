/*
* @Author: ren522686239
* @Date:   2017-12-03 23:28:56
* @Last Modified by:   ren522686239
* @Last Modified time: 2017-12-04 12:37:28
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');


var _mm 				= require('util/mm.js');
var _cities				= require('util/cities/index.js');
var _address			= require('service/address-service.js');
var templateModalIndex 	= require('./address-modal.string');

var addressModal = {
	show : function(option){
		this.option = option;
		this.option.data = option.data || {};
		this.$modalWrap = $('.modal-wrap');
		// 渲染页面
		this.loadModal();
		this.bindEvent();
	},
	hide : function(){
		this.$modalWrap.empty();
	},
	
	bindEvent : function(){
		var _this = this;
		// 省市城市二级联动
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectProvince = $.trim($(this).val());
			_this.loadCities(selectProvince);
		});
		// 保存收货地址
		this.$modalWrap.find('.address-save').click(function(){
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate		= _this.option.isUpdate;;
			// 添加新地址 并且通过表单验证
			if (!isUpdate && receiverInfo.status) {
				_address.save(receiverInfo.data,function(res){
					_mm.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			// 更新地址 并且通过表单验证
			else if (isUpdate && receiverInfo.status) {
				_address.update(receiverInfo.data,function(res){
					_mm.successTips('地址更新成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else {
				_mm.errorTips(receiverInfo.errMsg);
			}
		});
		// close 防止冒泡
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation();
		})
		// close
		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		})
		
	},
	loadModal : function(){
		var modalHtml = _mm.renderHtml(templateModalIndex,{
			isUpdate : this.option.isUpdate,
			data	 : this.option.data
		})
		this.$modalWrap.html(modalHtml);
		this.loadProvinces();

	},
	// 加载省份
	loadProvinces : function(){
		var provinces =  _cities.getProvinces() || [],
		$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		if (this.option.isUpdate && this.option.data.receiverProvince) {
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	// 加载城市
	loadCities : function(provinceName){
		var cities = _cities.getCities(provinceName) || [],
		$citySelect = this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities));
		if (this.option.isUpdate && this.option.data.receiverCity) {
			$citySelect.val(this.option.data.receiverCity);
		}
	},
	// 获取select选项框 输入array 输出html
	getSelectOption : function(array){
		var html = '<option value="">请选择</option>'
		for (var i = 0,length = array.length; i < length; i++) {
			html +=  '<option value="'+ array[i] +'">'+ array[i] +'</option>'
		}
		return html;
	},
	// 获取表单收件人信息 并做表单验证
	getReceiverInfo : function(){
		var receiverInfo = {},
			result = {
				status : false
			};
		if (this.option.isUpdate) {
			receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
		}
		//表单验证
		receiverInfo.receiverName 		= $.trim(this.$modalWrap.find('#receiver-name').val());
		receiverInfo.receiverProvince 	= this.$modalWrap.find('#receiver-province').val();
		receiverInfo.receiverCity 		= this.$modalWrap.find('#receiver-city').val();
		receiverInfo.receiverAddress 	= $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverPhone 		= $.trim(this.$modalWrap.find('#receiver-phone').val());
		receiverInfo.receiverZip 		= $.trim(this.$modalWrap.find('#receiver-zip').val());

		if (!receiverInfo.receiverName) {
			result.errMsg = '请输入收件人姓名';
		}
		else if (!receiverInfo.receiverProvince) {
			result.errMsg = '请选择省份';
		}
		else if (!receiverInfo.receiverCity) {
			result.errMsg = '请选择城市';
		}
		else if (!receiverInfo.receiverAddress) {
			result.errMsg = '请输入收件人详细地址';
		}
		else if (!receiverInfo.receiverPhone) {
			result.errMsg = '请输入收件人手机';
		}else{
			result.status = true;
			result.data = receiverInfo;
		}
		return result;
	}


};

module.exports = addressModal;