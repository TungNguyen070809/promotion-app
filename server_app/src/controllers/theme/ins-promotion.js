var IP = {
	settings: {
		requestURL: 'http://localhost:8888/api/ajax',
		shopName: Haravan.shop || window.location.hostname,
		email: window.customerEmail || '',
		isLogin: window.isLogin,
		requestData: {},
		mediaScreen: window.innerWidth
	},
	init: function(){
		this.initRequestAjaxHTML();
	},
	initRequestAjaxHTML: function(disLoading){
		var self = this;
		if(self.initGetCookieMethod('promotionData') !== null && self.initGetCookieMethod('promotionData') !== ''){
			var storage = JSON.parse(decodeURIComponent(self.initGetCookieMethod('promotionData')));
			if(self.settings.shopName !== storage.shop) return ;
			window.customerEmail = (storage.customerEmail && window.customerEmail == '') ? storage.customerEmail : window.customerEmail;
			window.customerName = storage.customerName ? storage.customerName : '';
			window.customerPhone = storage.customerPhone ? storage.customerPhone : '';
		}
		var countView = 0;
		if(typeof sessionStorage.countView == 'undefined'){
			countView = 1;
			sessionStorage.countView = 'had';
		}
		var hrvShop = self.settings.shopName,
				hrvEmail = self.settings.email || window.customerEmail;
		var requestURL = self.settings.requestURL;
		var params = {
			type: 'GET',
			url: requestURL,
			data: {
				shop: hrvShop,
				email: hrvEmail,
				countView: countView
			},
			dataType: 'json',
			beforeSend: function(){
				if(!disLoading)
					$('.pageLoading').addClass('in');
			},
			success: function(response) {
				$('.pageLoading').removeClass('in');
				self.initRequestRenderHTML(response);
			},
			error: function(XMLHttpRequest, textStatus) {
				console.log(textStatus);
				$('#insPromotionApp').empty();
			}
		};
		jQuery.ajax(params);
	},
	initRequestRenderHTML: function(data){
		var self = this;
		if(typeof(data) !== 'object'){
			console.log('Dữ liệu không đúng định dạng...');
			return false;
		}
		if(data.error || !data.data){
			console.log('Dữ liệu lỗi...');
			return false;
		}
		var dataJson = data.data;
		self.settings.requestData = dataJson;
		var $promotionLayout = jQuery('#insPromotionApp'),
				$promotionContent = $promotionLayout.find('.qContent');
		$promotionContent.empty();
		var promotionData = dataJson['jsonResponse']['listPromotion'],
				turnedData = dataJson['jsonResponse']['turned'] || 0,
				emailRequireData = dataJson['requireEmail'],
				listGift = dataJson['jsonResponse']['listGift'];
		var {info, need_take, requireLogin, totalTurn} = dataJson;
		var objTake = {...need_take, requireLogin};
		self.initRenderFormDataMethod(objTake);
		if(typeof promotionData == 'undefined' || promotionData.length == 0){
			$('#insPromotionApp').empty();
			return false;
		}
		$promotionLayout.find('.promotionShow .title').html(info.name_list_gift);
		$promotionLayout.find('#insPromotionPopup h3.title').html(info.name_popup);
		let disClass = (dataJson['jsonResponse']['turn'] == 0) ? 'disabled' : '',
				turnUrl = !emailRequireData || disClass != '' ? 'javascript:;' : '/account/login';
		$promotionLayout.find('.viewPromotions').remove();
		$promotionLayout.append('<button type="button" class="btnView viewPromotions">'+ info.name_button_view +'</button>');
		$promotionContent.append('<span class="qTitle"></span>');
		$promotionContent.append('<div class="qBoder"></div>');
		$promotionContent.append('<div class="qAction text-center"></div>');
		$promotionContent.find('.qAction').html('<a href="'+ turnUrl +'" class="btnQuay '+ disClass +'">'+ info.name_button +' (<span>'+ dataJson.jsonResponse.turn +'</span>)</a>');
		$promotionContent.find('.qBoder').html(
			'<div class="qLine"></div>\
<div class="qStart active"></div>\
<div class="qLeft"></div>\
<div class="qRight"></div>\
<div class="qList"></div>'
		);
		if(typeof listGift === 'undefined' || listGift.length === 0)
			$promotionLayout.find('.promotionModal .receivedPromotion').html('<p class="noItem">Bạn chưa có quà tặng nào...</p>');
		else{
			$promotionLayout.find('.promotionModal .receivedPromotion').empty();
			for(let i=0; i<listGift.length; i++ ){
				$promotionLayout.find('.promotionModal .receivedPromotion').append(
					'<div class="itemCode">\
<p>\
'+ listGift[i]['name'] +' <br>\
<span>'+ listGift[i]['code'] +'</span>\
</p>\
</div>');
			}
		}
		var $listPromotion = $promotionContent.find('.qList');
		var arrayTurn = dataJson['turnArr'];
		for(let i=0; i<arrayTurn.length; i++ ){
			let promotion = arrayTurn[i];
			$listPromotion.append('<div class="list-gift__content__item">\
<div class="list-gift__content__item__in">\
<p class="giftName img"><img src="//file.hstatic.net/1000339952/file/ins_vo_item.png" alt="'+ promotion['promotionName'] +'" /></p>\
<span class=""></span>\
<p class="list-gift__content__item__title style-1">'+ promotion['promotionCode'] +'</p>\
</div>\
</div>');
		}
		$promotionLayout.find('.listGift').empty();
		for(let i=0; i<promotionData.length; i++){
			$promotionLayout.find('.listGift').append(
				'<div class="giftItem">\
<div class="giftInner">\
<p class="giftIcon"><img src="//file.hstatic.net/1000339952/file/ins_vo_item.png" alt="'+ promotionData[i]['promotionName'] +'" /></p>\
<p class="giftName" title="'+ promotionData[i]['promotionName'] +'">'+ promotionData[i]['promotionName'] +'</p>\
</div>\
<div>');
		}
		$promotionLayout.find('.viewPromotions').on('click', function(){
			$('#insPromotionPopup').addClass('active');
		});
		$('.closePromotions').on('click', function(){
			$('#insPromotionPopup').removeClass('active');
		});
		var transArr = dataJson['transArr'];
		if(transArr.length == 0 || typeof transArr == 'undefined'){
			$promotionLayout.empty().hide();
			console.log('Không có khuyến mãi nào...');
			return false;
		}
		var tranIndex = typeof transArr[turnedData] != 'undefined' && transArr[turnedData]['index'] ? transArr[turnedData]['index'] : 0;
		if(tranIndex == 0){
			console.log('Thiếu tranIndex...');
			return false;
		}
		$promotionContent.find('.btnQuay').on('click', function(e){
			e.preventDefault();
			if($(this).hasClass('disabled') || $(this).hasClass('turning'))
				return false;
			if(requireLogin && !window.isLogin){
				window.location.href = '/account/login';
				return false;
			}
			var transitionNumber = self.initRenderTransitionIndex(tranIndex);
			$promotionContent.find('.qStart').removeClass('active');
			$(this).addClass('turning').html(info.name_button_turnning);
			$promotionContent.find('.qList').animate({
				'marginTop': '0px'
			}, {
				step: function (now, fx) {
					$(this).css({'transition':'all 3s ease-in-out 0s','-moz-transition': 'all 3s ease-in-out 0s','-o-transition': 'all 3s ease-in-out 0s',"transform": "translate3d(-"+ (transitionNumber + ($(this).width() - transitionNumber) / 2) +"px, 0px, 0px)"});
				},
				duration: 3000,
				done: function () {
					let $this = $(this);
					$(this).css({"transform": "translate3d(-"+ (transitionNumber / 2) +"px, 0px, 0px)"})
					setTimeout(function(){
						var objPost = {
							index: transArr[turnedData]['index'],
							code: transArr[turnedData]['code'],
							name: transArr[turnedData]['name'],
							device: self.initRenderDeviceMethod()
						},
								objTake = {
									customerEmail: need_take.take_email ? window.customerEmail : null,
									customerName: need_take.take_name ? window.customerName : null,
									customerPhone: need_take.take_phone ? window.customerPhone : null
								};

						self.initGetCodeRequestMethod(self.settings.shopName, objTake, objPost);
						$this.css({'transition':'all 1s ease-in-out 0s','-moz-transition': 'all 1s ease-in-out 0s','-o-transition': 'all 1s ease-in-out 0s', "transform": "translate3d(-"+ transitionNumber +"px, 0px, 0px)"});
					},3000)
					setTimeout(function(){$('.pageLoading').addClass('in');},4500);
				}
			}, 'linear');
		});
	},
	initResetEventDefaul: function(){
		var $promotionLayout = $('#insPromotionApp');
		$promotionLayout.find('.btnQuay').removeClass('turning');
		$promotionLayout.find('.qList').css({'transition':'all 0s ease-in-out 0s','-moz-transition': 'all 0s ease-in-out 0s','-o-transition': 'all 0s ease-in-out 0s'}).removeAttr('style');
	},
	initTurningPromotionEvent: function(e){
		e.preventDefault();
		var $button = $(e.target);
		var $promotionLayout = $button.parents('#insPromotionApp');
		if($promotionLayout.size() == 0)
			return false;
	},
	initGetCodeRequestMethod: function(shop, take, obj){
		var self = this;
		var requestURL = self.settings.requestURL || 'http://localhost:8888/api/ajax';
		var $promotionLayout = jQuery('#insPromotionApp');
		var params = {
			type: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: requestURL,
			contentType: 'application/json',
			data: {
				shop: shop,
				objTake: take,
				objPost: obj
			},
			dataType: 'json',
			beforeSend: function(){
				
			},
			success: function(response) {
				if(response.error || Object.keys(response.jsonData).length === 0){
					alert('Lỗi!!! Dữ liệu post lên không chính xác...');
					$('#insPromotionApp').remove();
					return false;
				}
				let textGift = '<p>'+ response.jsonData.customerCode.name +' <br>\
<span>'+ response.jsonData.customerCode.code +'</span>	\
</p>';
				if(response.jsonData.customerCode.code === '' )
					textGift = '<p class="missCode">'+ self.settings.requestData.info.name_miss_gift +'</p>';
				$promotionLayout.find('#insGiftPopup').remove();
				$promotionLayout.append(
					'<div id="insGiftPopup" class="giftModal styleModal engo-popup">\
<div class="overlay"></div>\
<div class="content">\
<div class="popupBody">\
<h3 class="title">\
Bạn vừa quay được\
</h3>\
<div class="receivedPromotion">\
<div class="itemCode">'+textGift+'</div>\
</div>\
</div>\
<a class="btnClose closePopupGift" href="javascript:;"></a>\
</div>\
</div>');
				$promotionLayout.find('.promotionModal .receivedPromotion').append(
					'<div class="itemCode">\
<p>\
'+ response.jsonData.customerCode.name +' <br>\
<span>'+ response.jsonData.customerCode.code +'</span>\
</p>\
</div>');
				setTimeout(function(){
					$('.pageLoading').removeClass('in');
					$promotionLayout.find('#insGiftPopup').addClass('active');
					self.initRequestAjaxHTML(true);
				},2500);
				$promotionLayout.find('#insGiftPopup .closePopupGift').on('click', function(){
					setTimeout(function(){$promotionLayout.find('#insGiftPopup').remove()},250);
				});
			},
			error: function(XMLHttpRequest, textStatus) {
				console.log(textStatus)
			}
		};
		jQuery.ajax(params);
	},
	initRenderFormDataMethod: function(objTake){
		var self = this;
		var {take_name, take_email, take_phone, requireLogin} = objTake;
		if(requireLogin && !window.isLogin) return false;
		var data = {}, inputHTML = '';
		//data.email = window.customerEmail;
		if(window.customerEmail === '')
			inputHTML = '<div class="form-group">\
<label>Email <sup>*</sup></label> \
<input id="dataEmail" data-name="customerEmail" type="email" class="form-control" required/>\
</div>';
		if(window.customerName === '' && objTake.take_name )
			inputHTML += '<div class="form-group">\
<label>Họ và tên <sup>*</sup></label> \
<input id="dataName" data-name="customerName" type="text" class="form-control" required/>\
</div>';
		if(window.customerPhone === '' && objTake.take_phone)
			inputHTML += '<div class="form-group">\
<label>Số điện thoại <sup>*</sup></label> \
<input id="dataPhone" data-name="customerPhone" type="number" class="form-control num" required/>\
</div>';
		if(inputHTML !== ''){
			var popupData = '<div id="insFormData" class="promotionFormData engo-popup styleModal">\
<div class="overlay"></div>\
<div class="content">\
<div class="popupBody">\
<h3 class="title">\
Vui lòng điền thông tin\
</h3>\
<div class="formData">\
<form class="frmData">\
<div class="formInput">'+inputHTML+'</div>\
<div class="formAction"><button type="submit" class="btn btn-primary btnSendData">Gửi</button></div>\
</form>\
</div>\
</div>\
</div>\
</div>';
			$('#insPromotionApp').append(popupData);
			$('.promotionFormData').addClass('active');
			$('.frmData').submit(function(e){
				e.preventDefault();
				var dt = {};
				$(this).find('.formInput .form-group input').each(function(i,el){
					let name = $(el).attr('data-name'),
							val = $(el).val();
					window[name] = val;
					dt[name] = val;
				})
				self.initSetCookieMethod('promotionData',encodeURIComponent(JSON.stringify({"shop": self.settings.shopName, ...dt})),7);
				self.initRequestAjaxHTML();
				$('.promotionFormData').removeClass('active');
			})
		}else{
			return false;
		}
		//return data;
	},
	initRenderTransitionIndex: function(tranIndex){
		if(!tranIndex || tranIndex == 0)
			return 0;
		var transitionNumber = (tranIndex * 180) - (180 + 50 + 100 + 25);
		if(this.settings.mediaScreen >= 500 && this.settings.mediaScreen < 768){
			transitionNumber = (tranIndex * 140) - (140 + 40 + 100);
		}
		else if(this.settings.mediaScreen < 500){
			transitionNumber = (tranIndex * 120) - (120 + 20 + 100);
		}
		return transitionNumber;
	},
	initActiveResizeWindow: function(data){
		var transArr = data['transArr'],
				turnedData = data['jsonResponse']['turned'] || 0,
				tranIndex = typeof transArr[turnedData] != 'undefined' && transArr[turnedData]['index'] ? transArr[turnedData]['index'] : 0;
		var transitionNumber = this.initRenderTransitionIndex(tranIndex);
	},
	initGetCookieMethod: function(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	initSetCookieMethod: function(cname, cvalue, exdays){
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	initRenderDeviceMethod: function(){
		if('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))
			return 'mobile';
		else if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent.toLowerCase()))
			return 'tablet';
		else
			return 'desktop';
	}
}
IP.init();
window.addEventListener("resize", function(){
	var screen = IP.settings.mediaScreen;
	if(screen !== window.innerWidth)
		IP.settings.mediaScreen = window.innerWidth;
});