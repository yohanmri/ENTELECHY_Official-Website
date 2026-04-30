/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";
	gsap.config({
		nullTargetWarn: false,
	});

// lenis-smooth-scroll
	const lenis = new Lenis({
		duration: 1, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		direction: 'vertical', 
		smooth: true, 
		smoothTouch: false, 
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault(); 

		const target = $(this.getAttribute('href')); 

		if (target.length) {
			lenis.scrollTo(target[0], {
				duration: 1.2, 
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
			});
		}
	});


	if (!window.scrollListenersAdded) {
		function TXTheaderSticky() {
			var $window = $(window);
			var lastScrollTop = 0;
			var $header = $('.txa_sticky_header');
			var headerHeight = $header.outerHeight() + 30;

			$window.scroll(function () {
				var windowTop = $window.scrollTop();

				if (windowTop >= headerHeight) {
					$header.addClass('txa_sticky');
				} else {
					$header.removeClass('txa_sticky');
					$header.removeClass('txa_sticky_show');
				}

				if ($header.hasClass('txa_sticky')) {
					if (windowTop < lastScrollTop) {
						$header.addClass('txa_sticky_show');
					} else {
						$header.removeClass('txa_sticky_show');
					}
				}

				lastScrollTop = windowTop;
			});
		}
		TXTheaderSticky();
		jQuery(window).on('scroll', function() {
			if (jQuery(window).scrollTop() > 250) {
				jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').addClass('sticky-on')
			} else {
				jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').removeClass('sticky-on')
			}
		});
		$(window).on("scroll", function() {
			if ($(this).scrollTop() > 200) {
				$('.at-scrollup').fadeIn();
			} else {
				$('.at-scrollup').fadeOut();
			}
		});
		window.scrollListenersAdded = true;
	}

	$('.open_mobile_menu').on("click", function() {
		$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
	});
	$('.open_mobile_menu').on('click', function () {
		$('body').toggleClass('mobile_menu_overlay_on');
	});
	jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fas fa-angle-down"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
	});
	
	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});

	$('.at-scrollup').on("click", function()  {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	}); 
	gsap.registerPlugin(ScrollTrigger);
	// counter-activation
	$('.counter').counterUp({
		delay: 20,
		time: 5000
	});
	// Animation
	if($('.wow').length){
		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		}
		);
		wow.init();
	};
	jQuery('.video_box').magnificPopup({
		disableOn: 200,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});
	$('.marquee-left').marquee({
		gap: 0,
		speed: 40,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});
	$('.marquee-right').marquee({
		gap: 28,
		speed: 40,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});
	$('.marquee-left2').marquee({
		gap: 30,
		speed: 100,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});
	$('.marquee-right2').marquee({
		gap: 30,
		speed: 100,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});

	if($('.at-slider-title').length) {
		var txtSplit = $('.at-slider-title');
		if(txtSplit.length == 0) return; gsap.registerPlugin(SplitText); txtSplit.each(function(index, el) {
			el.split = new SplitText(el, { 
				type: "lines",
				linesClass: "split-line"
			});
		});
	}
	if($('.at-slider-letter').length) {
		var txtSplit = $('.at-slider-letter');
		if(txtSplit.length == 0) return; gsap.registerPlugin(SplitText); txtSplit.each(function(index, el) {
			el.split = new SplitText(el, { 
				type: "chars",
				charsClass: "chars"
			});
		});
	}
	// windows-loaded-before-functions (Wrappers removed for SPA compatibility)
	// document.addEventListener("DOMContentLoaded", function () {
	// 	window.addEventListener('load', function(){

			gsap.utils.toArray(".at-text p").forEach(paragraph => {
				let timeline = gsap.timeline({
					scrollTrigger: {
						trigger: paragraph,
						start: "top 90%",
						end: "bottom 60%",
						toggleActions: "play none none none"
					}
				});
				let splitText = new SplitText(paragraph, { type: "lines" });
				gsap.set(paragraph, { perspective: 400 });
				timeline.from(splitText.lines, {
					opacity: 0,
					rotationX: -80,
					transformOrigin: "top center -50",
					force3D: true,
					duration: 1,
					delay: 0.5,
					stagger: 0.1
				});
			});
			let preloader = document.querySelector("#preloader");
			if (preloader) {
				preloader.classList.add("preloaded");
				setTimeout(function () {
					preloader.remove();
				}, 1000 ) ;

			}
			if($(".at_hero_title").length) {
				var NXSECTITLE = $(".at_hero_title");
				if(NXSECTITLE.length == 0) return; gsap.registerPlugin(SplitText); NXSECTITLE.each(function(index, el) {

					el.split = new SplitText(el, { 
						type: "lines,words,chars",
						linesClass: "split-line"
					});

					gsap.set(el, { perspective: 400 });

					if( $(el).hasClass('hero_title_1') ){
						gsap.set(el.split.chars, {
							y: 100,
							opacity: 0,
							scaleX: 0,
							rotationX: 15,
						});
					}
					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							start: "top 90%",
							toggleActions: "play reverse play reverse",
							markers: false,
						},
						x: 0,
						y: 0,
						scaleX: 1,
						scaleY: 1,
						opacity: 1,
						duration: 1,
						stagger: .05,
						rotationX: 0,
						delay: .1,
						ease: "power3.inOut",
					});
				});
			}
			setTimeout(function() {
				const AIHERO1 = gsap.timeline();
				AIHERO1
				.from(".at-hero2-img-wrap .item-img3", { opacity:0, rotate: 0,  yPercent: 100, duration: 4, transformOrigin: "center",  ease: "elastic.out(1,0.7)" })
				.from(".at-hero2-img-wrap .item-img2", { opacity:0, rotate: 0,  xPercent: -100, duration: 4, transformOrigin: "center", ease: "elastic.out(1,0.7)" },"< .5")
				.from(".at-hero2-img-wrap .item-img1", { opacity:0, rotate: 0,  xPercent: 100, duration: 4, transformOrigin: "center",  ease: "elastic.out(1,0.7)" },"<")
				.from(".at-hero2-client-wrap .at-hr2-cl-shape", { opacity:0, rotate: 180,  yPercent: -100, duration: 4, transformOrigin: "center",  ease: "elastic.out(1,0.7)" },"<")
				.from(".at-hero2-client li", { opacity:0, scale: 0, rotate: 360,  yPercent: -100, duration: 3.5, transformOrigin: "center",  ease: "elastic.out(1,0.7)" },"< .5")
				.from(".at-hero2-text .at-btn2", { opacity:0,   yPercent: 100, duration: 1, transformOrigin: "bottom",  ease: "power1.out" },"< .5")

				if ($('.at-hero3-slider').length > 0 ) {
					var slider = new Swiper('.at-hero3-slider', {
						spaceBetween: 0,
						slidesPerView: 1,
						loop: true,
						speed: 1000,
						effect: "fade",
						autoplay: {
							enabled: true,
							delay: 6000
						},
						pagination: {
							el: ".at-hr2-pagi",
							clickable: true,
						},
						navigation: {
							prevEl: ".at-hr2-prev",
							nextEl: ".at-hr2-next",
						},

					});
				};

				const AIHERO3 = gsap.timeline();
				AIHERO3
				.from(".at-hero3-sec .at-hr3-shape3", { opacity:0, rotate: 0,  yPercent: -100, duration: 4, transformOrigin: "center",  ease: "elastic.out(1,0.7)" })
				.from(".at-hero3-sec .at-hr3-shape2", { opacity:0, rotate: 0,  yPercent: 100, duration: 4, transformOrigin: "center",  ease: "elastic.out(1,0.7)" },"< .2")
				.from(".at-hero3-sec .at-hero3-social", { opacity:0, rotate: 0,  xPercent: -100, duration: 2, transformOrigin: "center",  ease: "elastic.out(1,0.7)" },"< .2")

				const AIHERO2 = gsap.timeline();
				AIHERO2
				.from(".at-hero1-bg img", { scale: 1.5, duration: 2, transformOrigin: "center",  ease: "power1.out" })
				.from(".at-hero1-content .at-hero1-video", { height: 0, duration: 2, transformOrigin: "bottom",  ease: "power1.out" },"<")
				.from(".at-hero1-text .at-btn1", { y: 150, opacity: 0, duration: 1, transformOrigin: "bottom",  ease: "power1.out" },"<")
				.from(".at-hr-item-line:nth-child(1)", { y: 250, opacity: 0, duration: 4, transformOrigin: "bottom",  ease: "elastic.out(1,0.7)" },"<")
				.from(".at-hr-item-line:nth-child(2)", { y: -250, opacity: 0, duration: 4, transformOrigin: "bottom",  ease: "elastic.out(1,0.7)" },"< .2")



			}, 700);
		// })		
// });
if($('.ai-itm-title').length) {
	var txtheading = $(".ai-itm-title");

	if(txtheading.length == 0) return; gsap.registerPlugin(SplitText); txtheading.each(function(index, el) {

		el.split = new SplitText(el, { 
			type: "lines,words,chars",
			linesClass: "split-line"
		});

		if( $(el).hasClass('ai-itm-anim') ){
			gsap.set(el.split.chars, {
				opacity: .3,
				x: "-10",
			});
		}
		el.anim = gsap.to(el.split.chars, {
			scrollTrigger: {
				trigger: el,
				start: "top 92%",
				end: "top 50%",
				markers: false,
				scrub: 1,
			},

			x: "0",
			y: "0",
			opacity: 1,
			duration: .7,
			stagger: 0.2,
		});

	});
}

gsap.utils.toArray(".img-parallax").forEach(function(container) {
	let image = container.querySelector("img");

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			scrub: true,
			pin: false,
		},
	}); 
	tl.from(image, {
		yPercent: -30,
		ease: "none",
	}).to(image, {
		yPercent: 30,
		ease: "none",
	}); 
});

const boxes = gsap.utils.toArray('.txt_item_active');
boxes.forEach(svg => {
	gsap.to(svg, {
		scrollTrigger: {
			trigger: svg,
			start: "top 100%",
			end: "bottom bottom",
			toggleClass: "active",
			duration: 3,
			delay:1,
			toggleActions: "play play play reverse",
			once: true,
		}
	});
});

gsap.utils.toArray(' .top_view').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			start: "top 95%",
			end: "top 100%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { opacity: 1, scale: 1, yPercent: "-100"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
});


if ($('.at-spon1-slider').length > 0 ) {
	var slider = new Swiper('.at-spon1-slider', {
		spaceBetween: 150,
		slidesPerView: 7,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 7,
			},
			'1200': {
				slidesPerView: 6,
				spaceBetween: 40,
			},
			'992': {
				slidesPerView: 5,
				spaceBetween: 20,
			},
			'768': {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			'576': {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			'480': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			'0': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	});
};
if ($('.at-client1-slider').length > 0 ) {
	var slider = new Swiper('.at-client1-slider', {
		spaceBetween: 40,
		slidesPerView: 5,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
				spaceBetween: 40,
			},
			'992': {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			'768': {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			'576': {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			'480': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			'0': {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	});
};
var quick_view = new Swiper(".at-ser1-thumb", {
	loop: true,
	spaceBetween: 0,
	slidesPerView: 5,
	speed: 1000,
	direction: 'vertical',
	navigation: {
		prevEl: ".at-ser1-prev",
		nextEl: ".at-ser1-next",
	},
	breakpoints: {  
		'1400': {
			slidesPerView: 5,
		},
		'1200': {
			slidesPerView: 5,
		},
		'1199': {
			slidesPerView: 3,
			direction: 'horizontal',
		},
		'480': {
			slidesPerView: 2,
			direction: 'horizontal',
		},
		'0': {
			slidesPerView: 2,
			direction: 'horizontal',
		},
	},
});

var swiper2 = new Swiper(".at-ser1-slider", {
	loop: true,
	spaceBetween: 0,
	speed: 1000,
	slidesPerView: 1,
	effect: "fade",
	navigation: {
		prevEl: ".at-ser1-prev",
		nextEl: ".at-ser1-next",
	},
	thumbs: {
		swiper: quick_view,
	},
});

ScrollTrigger.matchMedia({
	"(min-width: 1200px) and (max-width: 1920px)": function() {

		var ATTEAM = gsap.timeline({
			scrollTrigger: {
				trigger: '.at-tm1-sec',
				start: "top -10%",
				end: "top -100%",
				scrub: 1,
				pin: true,
				pinSpacing: true,
				markers: false,
			}
		});

		ATTEAM
		.from(".at-tm1-content .at-tm1-bgclr", { width: 0, duration: 1, ease: "power2.out" })
		.from(".at-tm1-item-wrap", { yPercent: 100, duration: 1, ease: "power2.out" },"<= .1")
		.from(".at-tm1-item:nth-child(1)", { yPercent: 100, duration: 1, ease: "power2.out" }, "<= .4")
		.from(".at-tm1-item:nth-child(4)", { yPercent: 100, duration: 1, ease: "power2.out" }, "<");
	}
});

if (window.matchMedia("(min-width: 1200px)").matches) { 
	var ATTEAM = gsap.timeline({
		scrollTrigger: {
			trigger: '.at-case-sec',
			start: "top 80%",
			end: "bottom 100%",
			scrub: 1,
			markers: false,
		}

	});
	ATTEAM
	.from( ".at-case-title h3" , {  color: "#6C1AFC" ,  letterSpacing: "200px", y: 500,  duration: 1, ease: "power2.out"})
};

const all_btns = gsap.utils.toArray(".bi-btn-hover");
const all_btn_circles = gsap.utils.toArray(".bi-btn-item");

if (all_btns.length > 0) {
	all_btns.forEach((btn, i) => {
		$(btn).mousemove(function (e) {
			const rect = btn.getBoundingClientRect();
			const relX = e.clientX - rect.left;
			const relY = e.clientY - rect.top;

			gsap.to(all_btn_circles[i], {
				duration: 0.5,
				x: relX - rect.width / 2,
				y: relY - rect.height / 2,
				ease: "power2.out",
			});
		});

		$(btn).mouseleave(function () {
			gsap.to(all_btn_circles[i], {
				duration: 0.5,
				x: 0,
				y: 0,
				ease: "power2.out",
			});
		});
	});
}

if (window.matchMedia("(min-width: 1200px)").matches) { 
	var ATWORKPROCESS = gsap.timeline({
		scrollTrigger: {
			trigger: '.at-step1-sec',
			start: "top 0%",
			end: "top -100%",
			scrub: 1,
			pin: true,
			pinSpacing: true,
			markers: false,
		}

	});
	ATWORKPROCESS
	.from( ".at-step1-side2" , {   xPercent: -100,   duration: 1, ease: "power2.out"})
	.from( ".at-step1-side1" , {   xPercent: 100,   duration: 1, ease: "power2.out"})
	.to( ".at_step_type_1" , { rotate: "18deg",  y: -120,   duration: 1, ease: "power2.out"},"<")
	.to( ".at_step_type_1" , { rotate: "18deg",  y: -120,   duration: 1, ease: "power2.out"})
	.to( ".at_step_type_2" , { rotate: "-18deg",  y: -640,   duration: 1, ease: "power2.out"},"<=.15")
	.to( ".at_step_type_3" , { rotate: "6deg",  y: -620,   duration: 1, ease: "power2.out"},"<=.6")
	.to( ".at_step_type_4" , { rotate: "0",  y: -610,   duration: 1, ease: "power2.out"},"<=.6")
};

gsap.utils.toArray(' .top_view').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			start: "top 95%",
			end: "top 100%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { opacity: 1, scale: 1, y: "200"}, {opacity: 1, y: 0, duration: 1, immediateRender: false})
});
if ($('.at-testi2-slider').length > 0 ) {
	var slider = new Swiper('.at-testi2-slider', {
		spaceBetween: 32,
		slidesPerView: 4,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 1000,
		pagination: {
			el: ".at-testi2-pagi",
			clickable: true,
		},
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1300': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			'992': {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			'992': {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			'768': {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			'576': {
				slidesPerView: 1,
				spaceBetween: 24,
			},
			'480': {
				slidesPerView: 1,
				spaceBetween: 24,
			},
			'0': {
				slidesPerView: 1,
				spaceBetween: 24,
			},
		},
	});
};


// Project Slider	
if ($('.at-ser3-slider').length > 0 ) {
	var slider = new Swiper('.at-ser3-slider', {
		slidesPerView: 5,
		loop: true,
		spaceBetween: 32,
		centeredSlides: true,
		speed: 1000,
		navigation: {
			nextEl: ".at-ser3-next",
			prevEl: ".at-ser3-prev",
		},
		pagination: {
			el: ".at-ser3-pagi",
			clickable: true,
		},
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'991': {
				slidesPerView: 3,
				centeredSlides: false,
			},
			'768': {
				slidesPerView: 3,
				centeredSlides: false,
			},
			'576': {
				slidesPerView: 1,
				centeredSlides: false,
			},
			'0': {
				slidesPerView: 1,
				centeredSlides: false,
			},
		},
	});
};

// Price Switch
document.addEventListener("DOMContentLoaded", () => {
	const e = document.getElementById("filt-monthly"),
	d = document.getElementById("filt-hourly"),
	t = document.getElementById("switcher"),
	m = document.getElementById("monthly"),
	y = document.getElementById("hourly");

	if (!e || !d || !t || !m || !y) {
		console.warn("Toggle elements not found in DOM");
		return;
	}

	const activate = (mode) => {
		const isHourly = mode === "hourly";
		t.checked = isHourly;
		e.classList.toggle("toggler--is-active", !isHourly);
		d.classList.toggle("toggler--is-active", isHourly);
		m.classList.toggle("hide", isHourly);
		y.classList.toggle("hide", !isHourly);
	};

	e.addEventListener("click", () => activate("monthly"));
	d.addEventListener("click", () => activate("hourly"));
	t.addEventListener("click", () => activate(t.checked ? "hourly" : "monthly"));
});

// Counter
document.addEventListener("DOMContentLoaded", () => {
	const counters = document.querySelectorAll('.counter1');
	counters.forEach(counter => {
		const target = +counter.getAttribute('data-target');
		const offset = 150;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					window.addEventListener("scroll", onScroll);
				} else {
					window.removeEventListener("scroll", onScroll);
				}
			});
		}, { threshold: 0 });
		observer.observe(counter);
		function onScroll() {
			const rect = counter.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const visible = Math.min(
				Math.max((windowHeight - rect.top + offset) / (windowHeight + rect.height), 0),
				1
				);
			const value = Math.floor(visible * target);
			counter.innerText = value;
		}
	});
});

if (window.matchMedia("(min-width: 1200px)").matches) { 
	var AiCount = gsap.timeline({
		scrollTrigger: {
			trigger: '.at-about3-counter-wrap',
			start: "top 70%",
			end: "top -100%",
			scrub: 2,
			pin: false,
			pinSpacing: false,
			markers: false,
		}

	});
	AiCount
	.from( ".at-ab3-count-item:nth-child(1) .inner-item" , {   y: -540,   duration: 1, ease: "power2.out"})
	.to( ".at-ab3-count-item:nth-child(1) .item-img" , {   height: 0, opacity: 0,   duration: 1, transformOrigin: "top", ease: "power2.out"},"<=")
	.from( ".at-ab3-count-item:nth-child(2) .inner-item" , {   y: -740,   duration: 1, ease: "power2.out"},"<= .05")
	.to( ".at-ab3-count-item:nth-child(2) .item-img" , {   height: 0, opacity: 0,   duration: 1, transformOrigin: "top", ease: "power2.out"},"<=")
	.from( ".at-ab3-count-item:nth-child(4) .inner-item" , {   y: -640,   duration: 1, ease: "power2.out"},"<= .05")
	.to( ".at-ab3-count-item:nth-child(4) .item-img" , {   height: 0, opacity: 0, x: 50,   duration: 1, transformOrigin: "top", ease: "power2.out"},"<=")
	.from( ".at-ab3-count-item:nth-child(3) .inner-item" , {   y: -360,  duration: 1, ease: "power2.out"},"<= .05")
	.to( ".at-ab3-count-item:nth-child(3) .item-img" , {   height: 0, opacity: 0,  x: 50,   duration: 1, transformOrigin: "top", ease: "power2.out"},"<=")
	.from( ".at-ab3-count-item:nth-child(5) .inner-item" , {   y: -600,   duration: 1, ease: "power2.out"},"<= .05")
	.to( ".at-ab3-count-item:nth-child(5) .item-img" , {   height: 0, opacity: 0,   duration: 1, transformOrigin: "top", ease: "power2.out"},"<=")

};



document.querySelectorAll(".at-project3-item").forEach((projectItem) => {
	const textEl = projectItem.querySelector(".item-text");
	projectItem.addEventListener("mousemove", (e) => {
		const rect = projectItem.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const moveX = (x / rect.width - 0.05) * 1000; 
		const moveY = (y / rect.height - 0.5) * 150;

		gsap.to(textEl, {
			x: moveX,
			y: moveY,
			duration: 4,
			ease: "power2.out"
		});
	});
	projectItem.addEventListener("mouseleave", () => {
		gsap.to(textEl, {
			x: 0,
			y: 0,
			duration: 5,
			ease: "power3.out"
		});
	});
});

if (window.matchMedia("(min-width: 992px)").matches) {
	let proSroll = gsap.timeline();
	let otherSections_2 = document.querySelectorAll('.at-project3-item')
	otherSections_2.forEach((section, index, i) => {
		gsap.set(otherSections_2, {
			scale: 1 
		});
		proSroll.to(section, {
			scale: index === otherSections_2.length - 1 ? 1 : 0.9,
			scrollTrigger: {
				trigger: section,
				pin: section,
				scrub: 1,
				start: "top 5%",
				end: "bottom 100%",
				ease: "none",
				endTrigger: '.at-project3-content',
				pinSpacing: false,
				markers: false,
			},
		})
	});
}

$(document).ready(function() {
	$('#orderTab .nav-link').hover(function() {
		$(this).tab('show');
	});
});

if (window.matchMedia("(min-width: 1200px)").matches) { 
	var ATWORKPROCESS = gsap.timeline({
		scrollTrigger: {
			trigger: '.at-testi3-pinned',
			start: "top 15%",
			end: "top -100%",
			scrub: 1,
			pin: true,
			pinSpacing: true,
			markers: false,
		}

	});
	ATWORKPROCESS
	.from( ".at-testi3-item:nth-child(2)" , {    y: 580,   duration: 1, ease: "power2.out"})
	.from( ".at-testi3-item:nth-child(3)" , {    y: 580,   duration: 1, ease: "power2.out"},"<= .3")
	.from( ".at-testi3-item:nth-child(4)" , {    y: 800,   duration: 1, ease: "power2.out"},"<= .3")
	.from( ".at-testi3-btn" , { opacity: 1,   y: 600,   duration: 1, ease: "power2.out"},"<= .1")
};

$('.at-gallery3-row1').magnificPopup({
	delegate: '.at-gallery3-img a', 
	type: 'image',
	gallery: {
		enabled: true, 
		tPrev: 'Previous (Left arrow key)', 
		tNext: 'Next (Right arrow key)',  
		tCounter: '%curr% of %total%' 
	}
});


if (window.matchMedia("(min-width: 1200px)").matches) { 
	var ATWORKPROCESS = gsap.timeline({
		scrollTrigger: {
			trigger: '.at-gallery3-wrapper',
			start: "top 15%",
			end: "top -100%",
			scrub: 1,
			pin: true,
			pinSpacing: true,
			markers: false,
		}

	});
	ATWORKPROCESS
	.from( ".at-gallery3-content" , { scale: 2, y: -340,   duration: 1, ease: "power2.out"})
};

gsap.utils.toArray(' .top_view').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			start: "top 80%",
			end: "top 60%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { opacity: 1, scale: 1, x: "-200"})
});

gsap.utils.toArray(' .top_view2').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			start: "top 100%",
			end: "top 80%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { opacity: 1, scale: 1, y: "300"})
});
gsap.utils.toArray(' .right_view').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			start: "top 50%",
			end: "top -50%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { scale: 1, x: "300"})
});

gsap.utils.toArray(' .at-img-up').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: ".at-why-c3-content",
			scrub: 1.5,
			end: "top 20%",
			start: "top 70%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { scale: 1, yPercent: "100"})
});

gsap.utils.toArray(' .top_list').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			end: "top 70%",
			start: "top 100%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { opacity: 0, scale: 1, x: -100, y: "100"})
});


$('.at-item-active').each(function () {
	var $wrap = $(this);
	var $items = $wrap.find('.at-ser1-list');

	$items.on('mouseover', function () {
		$items.removeClass('active');
		$(this).addClass('active');
	});
});

$('.at-price1-wrap').each(function () {
	var $wrap = $(this);
	var $items = $wrap.find('.at-price1-item');

	$items.on('mouseover', function () {
		$items.removeClass('active');
		$(this).addClass('active');
	});
});

$(document).on('click', '.at-faq3-wrap .accordion-item', function(){
	$(this).addClass('faq_active').siblings().removeClass('faq_active')
});


if (window.matchMedia("(min-width: 1200px)").matches) { 
	var TVABT = gsap.timeline({
		scrollTrigger: {
			trigger: '.at-vd1-sec',
			start: "top 30%",
			toggleActions: 'play none none reverse',
			markers: false,
		}

	});
	TVABT
	.from(".at-vd1-sec .at-vd1-img", { opacity: 0, rotate:'0deg',  yPercent: 100, duration: 1,   ease: "power2.out" })
	.from(".at-vd1-sec .at-vd1-circle", { scale: 0,  yPercent: 100, duration: 1,   ease: "power2.out" },"<=.2")
	.from(".at-vd1-item3-wrap", { y: 150, opacity: 0,  duration: 1, transformOrigin: "bottom",   ease: "power2.out" },"<=.2")
	.from(".at-vd1-item2", { y: 150, opacity: 0,  duration: 1, transformOrigin: "bottom",   ease: "power2.out" },"<=.2")
	.from(".at-vd1-item1", { y: 150, opacity: 0, duration: 1, transformOrigin: "bottom",   ease: "power2.out" },"<=.2")


};
gsap.utils.toArray(' .at-trust-content').forEach((el, index) => { 
	let tlcta = gsap.timeline({
		scrollTrigger: {
			trigger: el,
			scrub: 1.5,
			end: "top 70%",
			start: "top 120%",
			toggleActions: "play none none reverse",
			markers: false
		}
	})

	tlcta
	.set(el, {transformOrigin: 'center center'})
	.from(el, { opacity: 1, y: 150, scale: 1.3, scale: .8})
});
})(jQuery);