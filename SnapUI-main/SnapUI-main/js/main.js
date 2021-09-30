$(document).ready(function(){
	
	serviceSticky(true);
	headerPadding(true);

	/* ALWAYS PAGE START FROM TOP */
	$(this).scrollTop(0);

	/* TIME OPENING DYAMIC VALUE SET */

	$(".about-facility-list .dropdown-menu a").on('click', function(e) {
		e.preventDefault();
		var selText = $(this).text();
		$(".about-facility-list .dropdown-toggle span").text(selText);
	});

	/* DYAMIC DROPDOWN VALUE */
	$(".dropdown-select a").click(function(e){
		e.preventDefault();
		var parent = $(this).parents(".dropdown").find('.dropdown-toggle span');
		parent.text($(this).text().trim());
		parent.val($(this).data('value'));
	});

	/* ACCORION CLOSE OUTSIDE */

	$(document).on('click', function (e){
		var filterOpened = $('.advance-filter-list').hasClass('show');

		if(!$(e.target).closest('.advance-filter-list').length && !$(e.target).is('.advance-filter-list') && filterOpened === true){
			$('.advance-filter-list').collapse('hide');
		}
	});

	/* RANGE SLIDER */

	if($.fn.ionRangeSlider) {
		$(".js-range-slider").ionRangeSlider({
			skin: "round",
			type: "double",
			min: 0,
			max: 1000,
			prefix: '€',
			step: 1,
		});
	}

	/* DATAPICKER */

	if($.fn.datetimepicker) {
		$(".datetimepicker").datetimepicker({
			format: "dd MM yyyy - HH:ii P",
			showMeridian: true,
			autoclose: true,
			todayBtn: true,
			todayHighlight: 1,
		});

		$(".datepicker").datetimepicker({
			format: "dd MM yyyy",
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});	

		$(".timepicker").datetimepicker({
			format: "HH:ii P",
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 1,
			minView: 0,
			maxView: 1,
			forceParse: 0
		});
	}

	/* MAP SHOW HIDE */
	if($(".card-map").length > 0) {

		/* PAGE LOAD HIDE MAP */
		$(".card-map").hide();

		/* SHOW MAP ON CLICK */
		$(".card-detail-map a").on("click", function() {
			// $(this).closest(".card").parent(".col-lg-6").siblings().find(".card-map").show();
			$(".card-map").show();
			$(".filter-hidemap").addClass("d-flex");
		});

		/* HIDE MAP AND MAP ICON */
		$(".filter-hidemap").on("click", function(){
			$(this).removeClass("d-flex");
			$(".card-map").hide();
		});		
	}

	/* PROFILE PAGE SCOLL TO */
	if($("#addnewservice").length > 0) {
		$("#addnewservice").click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $("#timeAccordion").offset().top - 120
			}, 700);
		});
	}

	/* BOOK NOW FOR MOBILE */
	if($("#booknow").length > 0) {
		$("#booknow").click(function(e){
			$(".card-service").show();
			$("body").addClass("overflow-hidden");
		});

		$(".card-service .icon-close").click(function(e){
			$(".card-service").hide();
			$("body").removeClass("overflow-hidden");
		});
	}

	/* REVIEW SLIDER */
	
	if($(".swiper-container").length > 0) {
		const swiperNitrosurge = new Swiper('.reviews-slider', {
			loop: false,
			speed:1000,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.reviews-slider .swiper-button-next',
				prevEl: '.reviews-slider .swiper-button-prev',
			},
		});
	}

	/* Header Sticky */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 150){  
			$('.header').addClass("header-sticky");
		}
		else {
			$('.header').removeClass("header-sticky");
		}
	});
});

$(window).on('load', function() {
	/* LOADER */

	setTimeout(function(){
		$('#preloader').fadeOut();
	}, 1000);
});

/* RESIZE FUNCTION */

(function () {
	cardMapHeight(false);
	headerPadding(false);
	serviceSticky(false);
})();

window.onresize = function(){
	cardMapHeight(true);
	headerPadding(true);
	serviceSticky(true);
}

/* RESIZE DYAMAMIC HEIGHT SET MAP CARD */
function cardMapHeight(resize) {
	if ($(window).width() > 991) {
		if($(".card-map").length > 0) {
			var cardMap = $(".card:not(.card-map)").outerHeight();
			$(".card-map").css("height", cardMap);
		}
	}
}

/* DYAMIC SET PADDING MODAL */
function headerPadding(resize) {
	var headerHeight = $(".header").outerHeight();
	
	$("body").css("padding-top", headerHeight);	
}

/* SERVICE STICKY */
function serviceSticky(resize) {
	if($('.card-service-sticky').length > 0) {
		if ($(window).width() > 991) {
			$sticky = $('.card-service');
			$foot = $('footer');
			marginSpacing = 120;
			offtop = $sticky.offset().top - marginSpacing;
			offbottom = $foot.offset().top - ( marginSpacing*2 + $sticky.height());

			$(window).scroll(function() {
				setStickyServiceCard();
			});
		}
	}
}

/* SET STICKY SERVICE CARD */
function setStickyServiceCard(){
	scrolltop = $(window).scrollTop();
	if (scrolltop > offtop && $sticky.hasClass('is-sticky')) {
		$sticky.removeClass('is-sticky').addClass('position-fixed').css('top', marginSpacing);
	}
	if (offtop > scrolltop && $sticky.hasClass('position-fixed')) {
		$sticky.removeClass('position-fixed').addClass('is-sticky').css('top', 'auto');
	}
	if (scrolltop > offbottom && $sticky.hasClass('position-fixed')) {
		$sticky.removeClass('position-fixed').addClass('bottom').css('top', offbottom+marginSpacing);
	}
	if (offbottom > scrolltop && $sticky.hasClass('bottom')) {
		$sticky.removeClass('bottom').addClass('position-fixed').css('top', marginSpacing);
	}
}

/* MODAL OPEN CARD STICKY */
$('#modalProfile .modal-content').on("scroll", function() {
	if ($(window).width() > 991) {
		setStickyServiceCard();
	}
});