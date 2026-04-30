/**
 * front-end-ENTELECHY — main.js
 * 
 * We re-initialize the core Swipers and handle data-backgrounds here
 * because we are functioning without Elementor's JS wrappers and hooks.
 */

(function($) {
    "use strict";

    $(document).ready(function() {
        
        // 1. Process all missing [data-background] images (e.g., Pricing, About, etc.)
        $('[data-background]').each(function() {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });





        // 4. Force GSAP SplitText visibility for hero text explicitly, 
        // in case Swiper slide-active hooks from original scripts fail without elementor
        setTimeout(function() {
            $('.at-slider-title .split-line').css({
                'opacity': '1',
                'visibility': 'visible',
                'transform': 'translate(0,0)'
            });
            $('.at-slider-letter .chars').css({
                'opacity': '1',
                'visibility': 'visible'
            });
            $('.sec_title.ai-itm-title span').css({
                'opacity': '1',
                'visibility': 'visible',
                'transform': 'translate(0,0)'
            });
        }, 1500);

    });

})(jQuery);
