window.addEventListener('DOMContentLoaded', (event) => {
    var mewfade = new Swiper('.zozo_text_fade', {
        loop: false,
        speed:1200,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        slidesPerView: 1
    });
    var mn_show = document.querySelectorAll('.show_full');
    mn_show.forEach(item => item.addEventListener('click', (event) => {
        const level0Items = document.querySelectorAll("#menu-mew .level0");
        level0Items.forEach(function (item) {
            item.classList.toggle("show");
        });
    }))
});
/*Back to Top*/
var bg_top_mb = document.querySelector('.menubar');
var bg_head_mb = document.querySelector('.bg_head');
var f_search_mb = document.querySelector('.left-search');
var goTopBtn = document.querySelector('.back_top');
const closeSlogan = document.querySelectorAll('.js-close-slogan');
function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight/3;
    if (scrolled > 1) {
        bg_head_mb.classList.add('min');
        bg_top_mb.classList.add('min');
        f_search_mb.classList.add('min');
        closeSlogan.forEach(item => item.classList.remove('open_slogan'));
    }
    if (scrolled < 1) {
        bg_head_mb.classList.remove('min');
        bg_top_mb.classList.remove('min');
        f_search_mb.classList.remove('min');
        closeSlogan.forEach(item => item.classList.add('open_slogan'));
    }
    if (scrolled > coords) {
        goTopBtn.classList.add('back_show');
    }
    if (scrolled < coords) {
        goTopBtn.classList.remove('back_show');
    }
}

window.addEventListener('scroll', trackScroll);
function scrollToTop (duration) {
    if (document.scrollingElement.scrollTop === 0) return;

    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', (event) => {
    var swiperProductSaleSlider = new Swiper('.zozo_flash', {
        spaceBetween: 8,
        loop: false,
        speed: 1000,
        autoplay: true,
        navigation: {
            nextEl: '.mf_next',
            prevEl: '.mf_prev',
        },
        freeMode: true,
        scrollbar: {
            el: ".sb_flash",
            hide: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
            1500: {
                slidesPerView: 6,
            }
        }
    });
    var swiperBanner = new Swiper('.zozo_banner', {
        spaceBetween: 10,
        loop: false,
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
        slidesPerView: 1,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            480: {
                slidesPerView: 2
            },
            560: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 3
            }
        }
    });
    var swiperProduct2Slider = new Swiper('.zozo_product_2', {
        spaceBetween: 8,
        loop: false,
        speed: 1000,
        autoplay: false,
        navigation: {
            nextEl: '.mf_next',
            prevEl: '.mf_prev',
        },
        freeMode: true,
        scrollbar: {
            el: ".sb_new",
            hide: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 4
            },
            1200: {
                slidesPerView: 5
            },
            1500: {
                slidesPerView: 6,
            }
        }
    });
    // var mainProductSlider = new Swiper('.zozo_product_main', {
    //  loop: false,
    //  spaceBetween: 8,
    //  speed: 1000,
    //  autoplay: false,
    //  slidesPerView: 2,
    //  navigation: {
    //      nextEl: '.mm_next',
    //      prevEl: '.mm_prev',
    //  },
    //  freeMode: true,
    //  scrollbar: {
    //      el: ".sb_tm",
    //      hide: false,
    //  },
    //  breakpoints: {
    //      375: {
    //          slidesPerView: 2
    //      },
    //      768: {
    //          slidesPerView: 4,
    //      },
    //      992: {
    //          slidesPerView: 4,
    //      },
    //      1200: {
    //          slidesPerView: 5,
    //      },
    //      1500: {
    //          slidesPerView: 6,
    //      }
    //  }
    // });
    let mewTab = new ZozoTab({
        tabContainer:"[data-tab]",
        slideContainerClass:"swiper-container",
        view:"ajaxtab",
        noItem:"Không có sản phẩm nào trong danh mục này.",
        useSlide:true,
        slideConfig:{
            loop: false,
            spaceBetween: 8,
            speed: 1000,
            autoplay: false,
            slidesPerView: 2,
            navigation: {
                nextEl: '.mf_next',
                prevEl: '.mf_prev',
            },
            freeMode: true,
            scrollbar: {
                el: ".sb_aj",
                hide: false,
            },
            breakpoints: {
                375: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 5,
                },
                1500: {
                    slidesPerView: 6,
                }
            }
        }
    },function(target){
        target.querySelectorAll('.js-addToCart').forEach(btn =>{
            btn.removeEventListener('click', addToCart);
            btn.addEventListener('click', addToCart);
        });
        target.querySelectorAll('.lazy').forEach((v) => {
            io.observe(v);
        });
    });
    mewTab.init();
    const tabTitles = document.querySelectorAll('.m_tab .js-tab-title');
    tabTitles.forEach((tabTitle) => {
        tabTitle.addEventListener('click', (event) => {
            //event.preventDefault();
            const bgColor = tabTitle.getAttribute('data-color-bg');
            const ttColor = tabTitle.getAttribute('data-color-tt');
            const mainSection = document.querySelector('.m_tab');
            mainSection.style.setProperty('--bg_tab', bgColor);
            mainSection.style.setProperty('--cl_tit_tab', ttColor);
        });
        tabTitle.addEventListener('mouseenter', () => {
            //tabTitle.dispatchEvent(new Event('click'));
        });
    });
    var swiperBlogHome = new Swiper('.zozo_blog_index', {
        spaceBetween: 10,
        navigation: false,
        loop: false,
        speed:1000,
        autoplay: {
            delay: 6000,
            disableOnInteraction: true,
        },
        slidesPerView: 1,
        pagination: {
            el: '.zozo_blog_p',
            clickable: true,
        },
    });
    var swiperTabLink = new Swiper('.zozo_link_tab', {
        spaceBetween: 10,
        loop: false,
        speed: 1000,
        autoplay: false,
        freeMode: true,
        navigation: {
            nextEl: '.mtl_next',
            prevEl: '.mtl_prev',
        },
        slidesPerView: "auto",
    });
    let videos = document.querySelectorAll('.open_popup');
    let popupVideo = document.querySelector('.popup_box');
    let close_vd = document.querySelectorAll('.close_popup');
    videos.forEach(v => v.addEventListener('click', function(e) {
        e.preventDefault();
        popupVideo.classList.add('open');
        bodyOverlay.classList.remove("d-none");
        let bVideoContainer = popupVideo.querySelector('.b_video');
        if (bVideoContainer) {
            bVideoContainer.innerHTML = `<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${e.target.dataset.video}?enablejsapi=1" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
        }
    }));
    close_vd.forEach(v => v.addEventListener('click', function(e) {
        e.preventDefault();
        popupVideo.classList.remove('open');
        bodyOverlay.classList.add("d-none");
        let bVideoContainer = popupVideo.querySelector('.b_video');
        if (bVideoContainer) {
            setTimeout(function() {
                bVideoContainer.innerHTML = '';
            }, 500);
        }
    }));
});

window.addEventListener('DOMContentLoaded', (event) => {
    var swiperHomeSlider = new Swiper('.zozo_slide', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.msl_next',
            prevEl: '.msl_prev',
        },
        loop: true,
        speed:1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
        slidesPerView: 1,
        //effect: 'fade',
        pagination: {
            el: '.zozo_slide_p',
            clickable: true,
        },
    });
    var swiperBannerPro = new Swiper('.zozo_banner_pro', {
        spaceBetween: 10,
        loop: false,
        speed:1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        slidesPerView: 2,
        pagination: {
            el: '.zozo_banner_slide_p',
            clickable: true,
        },
        navigation: {
            nextEl: '.mb_bnsl_next',
            prevEl: '.mb_bnsl_prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });
});

const formSearch = document.getElementById('js-search-form');
const menuButton = document.querySelectorAll('.js-menu-toggle');
const m_login = document.getElementById('m_login');
const colLeft = document.getElementById('col-left-mew');
const bodyOverlay = document.getElementById('body_overlay');
const menu = document.getElementById('menu-mew');
const contactButtons = document.querySelectorAll('.js-contact-toggle');
const m_mb_bar = document.getElementById('mb_bar');
const bodyM = document.getElementById('body_m');
let isMobile = window.matchMedia("(min-width: 992px)").matches;
let vW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

/*Menu mobi*/
if (menuButton && colLeft){
    menuButton.forEach(menu => menu.addEventListener('click', (event) => {
        event.preventDefault();
        formSearch.classList.remove("open");
        m_mb_bar.classList.remove("active");
        $('.mobile_open_box_swatch').removeClass('active');
        $('.sidebar_mobi').removeClass('openf');
        if (menu.classList.contains('active')){
            colLeft.classList.remove("active");
            menu.classList.remove("active");
            bodyOverlay.classList.add("d-none");
            document.querySelector('body').classList.remove("modal-open")
        } else{
            m_login.classList.remove("active");
            colLeft.classList.add("active");
            menu.classList.add("active");
            bodyOverlay.classList.remove("d-none");
            document.querySelector('body').classList.add("modal-open")
        }
        var closeMenu = document.querySelector('.close_menu_mobile');
        closeMenu.addEventListener('click', (event) => {
            colLeft.classList.remove("active");
            menu.classList.remove("active");
            bodyOverlay.classList.add("d-none");
            document.querySelector('body').classList.remove("modal-open")
        });
    }))
}

window.addEventListener('DOMContentLoaded', (event) => {
    if (window.innerWidth < 992) {
        let shouldSkip = false;
        document.querySelectorAll('#menu-mew .level0 .m_chill').forEach((item, index) => {
            if (shouldSkip) {
                return;
            }
            if (index >= 0) {
                shouldSkip = true;
            }
            item.parentNode.classList.add('open');
        });
        if (shouldSkip == true) {
            menu.classList.add('no_waring');
        }
    }
    if (menu) {
        function handleMenuEvent(event) {
            var targetLi = event.target.closest('#menu-mew > li');
            var mn_x = document.querySelectorAll('#menu-mew > li');
            var targetAnchor = event.target.closest('a');

            if (!mn_x.length) return;
            for (var i = 0; i < mn_x.length; i++) {
                if (mn_x[i].classList.contains('js-submenu')) {
                    mn_x[i].classList.remove('open');
                }
            }
            if (targetLi && targetLi.classList.contains('js-submenu') && targetAnchor && targetAnchor === targetLi.querySelector('a')) {
                if (window.innerWidth < 992) {
                    event.preventDefault();
                }
            }
            if (targetLi.className.includes('js-submenu')) {
                targetLi.classList.add('open');
            }
        }

        function handleMenuMouseLeave(event) {
            var mn_x = document.querySelectorAll('#menu-mew > li');
            if (!mn_x.length) return;
            for (var i = 0; i < mn_x.length; i++) {
                mn_x[i].classList.remove('open');
            }
        }
        menu.addEventListener('click', handleMenuEvent);
        if (window.matchMedia("(min-width: 992px)").matches) {
            //menu.addEventListener('mouseover', handleMenuEvent);
            //menu.addEventListener('mouseleave', handleMenuMouseLeave);
        }
    }

});

/*Contact Button*/
if (contactButtons) {
    contactButtons.forEach(contactButton => {
        contactButton.addEventListener('click', (event) => {
            contactButton.classList.toggle("active");
            m_mb_bar.classList.toggle("active");
            colLeft.classList.remove("active");
            formSearch.classList.remove("open");
            menuButton.forEach(menu => menu.classList.remove('active'));
            $('.mobile_open_box_swatch').removeClass('active');
            bodyOverlay.classList.add("d-none");
            document.querySelector('body').classList.remove('modal-open');
        });
        var closeSupport = document.querySelector('.close_support');
        closeSupport.addEventListener('click', (event) => {
            contactButton.classList.remove("active");
            m_mb_bar.classList.remove("active");
        });
    });
}

/*Body Overlay*/
bodyOverlay.addEventListener('click', function(e){
    bodyOverlay.classList.add("d-none");
    formSearch.classList.remove("open");
    colLeft.classList.remove("active");
    document.querySelector('body').classList.remove('modal-open');
    menuButton.forEach(menu => menu.classList.remove('active'));
    m_login.classList.remove("active");
    m_mb_bar.classList.remove("active");
    $('.mobile_open_box_swatch').removeClass('active');
    $('.sidebar_mobi').removeClass('openf');
    $('.popup_box').removeClass('open');
    //animationMenu();
})

// window.addEventListener('resize', throttle( function(){
//  let vW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//  if(vW > 991){
//      bodyOverlay.classList.add("d-none");
//      colLeft.classList.remove("active");
//  }
// }, 200));
