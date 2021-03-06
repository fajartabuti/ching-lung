;
(function ($, window, document, undefined) {
    'use strict';
    var $winW = function () {
        return $(window).width();
    };
    var $winH = function () {
        return $(window).height();
    };
    var $screensize = function (element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function (mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
    $(document).ready(function () {
        $(window).on('load', function () {
            $('.preloader').fadeOut();
            $('.animated-row').each(function () {
                var $this = $(this);
                $this.find('.animate').each(function (i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function (event, isInView) {
                        if (isInView) {
                            setTimeout(function () {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });
        });
        if ($('.facts-list').length) {
            $('.facts-list').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 3000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 10
                    },
                    460: {
                        items: 1,
                        margin: 10
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.about-pic-list').length) {
            $('.about-pic-list').owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                items: 1,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 4000,
                animateOut: 'fadeOut',
                responsive: {
                    0: {
                        items: 1,
                        margin: 10
                    }
                }
            });
        }
        if ($('.services-list').length) {
            $('.services-list').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 3,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 10
                    },
                    460: {
                        items: 1,
                        margin: 10
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.gallery-list').length) {
            $('.gallery-list').owlCarousel({
                loop: false,
                nav: false,
                dots: true,
                items: 3,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 4000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 10
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
        if ($('.testimonials-slider').length) {
            $('.testimonials-slider').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: true,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 10
                    },
                    768: {
                        items: 1
                    }
                }
            });
        }
        if ($('.fullpage-default').length) {
            var myFullpage = new fullpage('.fullpage-default', {
                licenseKey: ' C7F41B00-5E824594-9A5EFB99-B556A3D5',
                anchors: ['slide01', 'slide02', 'slide03', 'slide04', 'slide05', 'slide06'],
                menu: '#nav',
                lazyLoad: true,
                navigation: true,
                navigationPosition: 'right',
                scrollOverflow: true,
                responsiveWidth: 768,
                responsiveHeight: 600,
                responsiveSlides: true
            });
        }
        $(document).on('click', '.navbar-toggle', function () {
            $('.navbar-collapse').slideToggle(300);
            return false;
        }).on('click', '.navigation-menu > li > a', function () {
            $('.navbar-collapse').slideUp(300);
        }).on('click', '.next-section', function () {
            fullpage_api.moveSectionDown();
        });
        $('.facts-row').on('inview', function (event, isInView) {
            $('.count-number').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
                setTimeout(function () {
                    $('.count-number').removeClass('count-number').addClass('counted');
                }, 1000);
            });
        });
        $('.skills-row').on('inview', function (event, isInView) {
            $(this).addClass('view');
        });
        $(document).on('click', '.menu-trigger', function () {
            $('body').toggleClass('sidemenu-open');
        }).on('click', '.side-menu .navbar-nav li a', function () {
            $('body').removeClass('sidemenu-open');
        });
    });
})(jQuery, window, document);

/**
   * Easy selector helper function
   */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

const typed = select('.typed')
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var el_autohide = document.querySelector('.autohide');
    var last_scroll_top = 0;
    window.addEventListener('scroll', function () {
        let scroll_top = window.scrollY;

        if (scroll_top < last_scroll_top) {
            el_autohide.classList.remove('scrolled-up');
            el_autohide.classList.add('scrolled-down');
            $('.navbar-collapse').slideUp(300);
        }
        else {
            el_autohide.classList.remove('scrolled-down');
            el_autohide.classList.add('scrolled-up');
        }
        last_scroll_top = scroll_top;
    });
});

var $header = $('#header');

$(window).on('load', function () {
    if (window.innerWidth <= 767) {
        $header.addClass('scrolled-down');
    }
    else {
        $header.removeClass('scrolled-down');
    }
});

$(window).resize(function () {
    if (window.innerWidth <= 767) {
        $header.addClass('scrolled-down');
    }
    else {
        $header.removeClass('scrolled-down');
    }
});

$(function() {
    var igLink = 'https://www.instagram.com/chinglungbekasi/';
    var fbLink = 'https://www.facebook.com/ChingLungkotabekasi/';
    var ytLink = 'https://www.youtube.com/channel/UC6OTkJDeS55F0AtVRMjRLVw';
    var waLink = 'https://api.whatsapp.com/send/?phone=+6285692936644&text=halo%2C+saya+mau+panggil+atau+tanya+tentang+barongsai+ching+lung&app_absent=0';
    var gMapsLink  = 'https://goo.gl/maps/NM7zriZaXw1hbcjF8';
    var emailLink  = 'mailto:contact@chinglung.com';
    
    $("[title=Instagram]").attr('href', igLink);
    $("[title=Facebook]").attr('href', fbLink);
    $("[title=Youtube]").attr('href', ytLink);
    $("[title=Whatsapp]").attr('href', waLink);
    $("[title=Gmaps]").attr('href', gMapsLink);
    $("[title=Email]").attr('href', emailLink);
 });

var $myGroup = $('#achivementsList');
$myGroup.on('show.bs.collapse','.collapse', function() {
    $myGroup.find('.collapse.show').collapse('hide');
});

$(document).ready(function() {
    $('#firstPlaceButton').click();
 });
