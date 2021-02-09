$(function() {

    // Fixed header
	let header = $("#header");
	let intro = $("#intro");
	let introH = intro.innerHeight();
	let scrollPos = $(window).scrollTop();
	let nav = $("#nav");
	let navToggle = $("#navToggle");

	checkScroll(scrollPos, introH);
	$(window).on("scroll resize", function() {
		introH = intro.innerHeight();
        scrollPos = $(this).scrollTop();
		
		checkScroll(scrollPos, introH);
	});
	
	function checkScroll(scrollPos, introH) {
		if(scrollPos > introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}		
	}
	
	
	// Smooth scroll
	
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();
		
		let elementId = $(this).data('scroll');
		let elementOffset = $(elementId).offset().top;
		
		nav.removeClass("show");
		
		$("html, body").animate({
			scrollTop: elementOffset - 90
		}, 700);
	});

    // Mobile nav

    navToggle.on('click', function(e) {
        e.preventDefault();

        nav.toggleClass('show');
    });

    // Filter

    const filter = $('[data-filter]');
    filter.on('click', function(e){
        e.preventDefault();

        let cat = $(this).data('filter');

        if (cat === 'all') {
            $('[data-cat]').removeClass('hide');
        } else {
            $('[data-cat]').each(function() {
                let workCat = $(this).data('cat');
    
                if(workCat != cat) {
                    $(this).addClass('hide').hide(300);
                } else {
                    $(this).removeClass('hide').show(300);
                }
            });
        }

        $('[data-slider="slick"]').slick('setPosition');
    });


    // Modal

    const modalCall = $('[data-modal]');
    const modalClose = $('[data-close]');

    modalCall.on('click', function(e) {
        e.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');
        
        $(modalId).addClass('show');
        $('body').addClass('no-scroll');
    });

    modalClose.on('click', function(e) {
        e.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');
        
        modalParent.removeClass('show');
        $('body').removeClass('no-scroll');
    });

    $('.modal').on('click', function(e) {        
        $(this).removeClass('show');
        $('body').removeClass('no-scroll');
    });

    $('.modal__dialog').on('click', function(e) {        
        e.stopPropagation();
    });

    // Slider: https://kenwheeler.github.io/slick

    $('[data-slider="slick"]').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: false,
        dots: true
    });

    $('.slickPrev').on('click', function(e) {
        e.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick('slickPrev');
    });

    $('.slickNext').on('click', function(e) {
        e.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick('slickNext');
    });
});