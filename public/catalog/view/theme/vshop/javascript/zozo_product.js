var swiperThumbImage = new Swiper('.product-thumb-slide', { 
	spaceBetween: 10,
	slidesPerView: 4,
	watchSlidesVisibility: true
});
var swiperMainImage = new Swiper('.product-main-slide', {
	watchSlidesProgress: true,
	autoHeight: true,
	centeredSlides: true,
	slidesPerView: 1,
	speed:1000,
	navigation: {
		nextEl: '.zozo_product_main-slide_next',
		prevEl: '.zozo_product_main-slide_prev',
	},
	thumbs: {
		swiper: swiperThumbImage
	}
});

$('.view_moress').on('click', 'a', function() {
	if( $(this).hasClass('one') ){
		$(this).addClass('d-none');
		$('.view_moress .two').removeClass('d-none');
	} else {
		$(this).addClass('d-none');
		$('.view_moress .one').removeClass('d-none');
	}
	$('.content_coll').toggleClass('active');
	$('.bg_cl').toggleClass('d-none');
});

$(".open_sw_mobile").on('click', function() {
	$('.mobile_open_box_swatch').toggleClass('active');
	if ($('#o_sw_buy').hasClass('active')){
		$('#body_overlay').removeClass('d-none');
		colLeft.classList.remove("active");
	}else {
		$('#body_overlay').addClass('d-none');
	}
	$('.fix-phone').removeClass('active');
});