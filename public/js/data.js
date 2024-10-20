$(document).ready(function () {
  var owl = $(".slide-top");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      360: {
        items: 1,
      },
      480: {
        items: 1,
      },
      640: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });
});
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "../www.googletagmanager.com/gtm5445.html?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-TXB5V8CH");
jQuery(document).ready(function () {
  var offset = 220;
  var duration = 500;
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".back-to-top").fadeIn(duration);
    } else {
      jQuery(".back-to-top").fadeOut(duration);
    }
  });

  jQuery(".back-to-top").click(function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});
$(document).ready(function () {
  var owl = $(".home-neocare");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      360: {
        items: 2,
      },
      480: {
        items: 2,
      },
      640: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
});
$(document).ready(function (a) {
  $('[data-fancybox="gallery2472"]').fancybox({
    loop: true,
    buttons: [
      "zoom",
      "share",
      "slideShow",
      "fullScreen",
      "download",
      "thumbs",
      "close",
    ],
    animationEffect: "zoom-in-out",
    transitionEffect: "circular",
  });
});

$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-nav",
});

$(".slider-nav").slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  dots: true,
  focusOnSelect: true,
});

$("a[data-slide]").click(function (e) {
  e.preventDefault();
  var slideno = $(this).data("slide");
  $(".slider-nav").slick("slickGoTo", slideno - 1);
});
$(document).ready(function () {
  var owl = $(".banner-home");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      360: {
        items: 1,
      },
      480: {
        items: 1,
      },
      640: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  });
});
$(document).ready(function () {
  $(".list-menu > li").hover(
    function () {
      var mid = $(this).attr("data-submenu-mid");

      $(".submenu" + mid).addClass("active");
    },
    function () {
      $(".showmenu").removeClass("active");
    }
  );
});
$(document).ready(function () {
  var owl = $(".home-neocare");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      360: {
        items: 2,
      },
      480: {
        items: 2,
      },
      640: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
});
$(document).ready(function () {
  var owl = $(".home-delimax");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      360: {
        items: 2,
      },
      480: {
        items: 2,
      },
      640: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
});
$(document).ready(function () {
  var owl = $(".home-yensao");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      360: {
        items: 2,
      },
      480: {
        items: 2,
      },
      640: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
});
$(document).ready(function () {
  var owl = $(".home-nhomsp");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      360: {
        items: 1,
      },
      480: {
        items: 1,
      },
      640: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });
});
$(document).ready(function () {
  var owl = $(".home-spbanchay");
  owl.owlCarousel({
    margin: 10,
    autoplay: true,
    nav: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      360: {
        items: 2,
      },
      480: {
        items: 2,
      },
      640: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
});
