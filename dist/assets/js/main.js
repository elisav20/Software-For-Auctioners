$(function () {

	/*Fixed Header*/
	let header = $("#js-fixed-header");
	let intro = $("#js-scroll-nav-intro");
	let introH = intro.innerHeight();
	let scrollPos = $(window).scrollTop();
	let nav = $("#js-show-nav");
	let navToggle = $("#js-show-nav-navToggle");
	let burger = $(".burger");

	checkScroll(scrollPos, introH)

	$(window).on("scroll resize", function () {
		introH = intro.innerHeight() - 50;
		scrollPos = $(this).scrollTop();

		checkScroll(scrollPos, introH);
	});

	function checkScroll(scrollPos, introH) {
		if (scrollPos > introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	}

	/*Smooth Scroll*/
	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		let elementID = $(this).data('scroll');
		let elementOffset = $(elementID).offset().top;

		nav.removeClass("show");

		$("html, body").animate({
			scrollTop: elementOffset - 20
		}, 1000)
	})



	/*navToggle*/
	navToggle.on("click", function (event) {
		event.preventDefault();

		nav.toggleClass("show");
		burger.toggleClass("open");
	})
});