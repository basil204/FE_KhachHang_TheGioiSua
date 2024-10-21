$(document).ready(function () {
  // Owl Carousel common settings
  function initOwlCarousel(selector, itemsConfig) {
    var owl = $(selector);
    owl.owlCarousel({
      margin: 10,
      autoplay: true,
      nav: true,
      loop: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: itemsConfig,
    });
  }

  // Initiate carousels with specific settings
  initOwlCarousel(".slide-top", {
    0: { items: 1 },
    360: { items: 1 },
    768: { items: 1 },
    1200: { items: 1 },
  });

  initOwlCarousel(
    ".home-neocare, .home-delimax, .home-yensao, .home-spbanchay",
    {
      0: { items: 2 },
      768: { items: 4 },
      1200: { items: 6 },
    }
  );

  initOwlCarousel(".banner-home", {
    0: { items: 1 },
    768: { items: 2 },
    1200: { items: 2 },
  });
  $(".menu-nhomsp").owlCarousel({
    loop: true, // Cho phép lặp lại carousel
    margin: 10, // Khoảng cách giữa các item
    nav: true, // Hiển thị các nút "Prev" và "Next"
    items: 10, // Hiển thị 10 item cùng lúc
    autoplay: true, // Bật tự động chạy carousel
    autoplayTimeout: 3000, // Thời gian chuyển đổi giữa các item (3 giây)
    dots: true, // Hiển thị các dots điều hướng
    responsive: {
      0: {
        items: 2, // Hiển thị 2 item trên thiết bị nhỏ (như mobile)
      },
      600: {
        items: 4, // Hiển thị 4 item trên thiết bị vừa (như tablet)
      },
      1000: {
        items: 10, // Hiển thị 10 item trên thiết bị lớn (desktop)
      },
    },
  });

  // Scroll to top button functionality
  var offset = 220;
  var duration = 500;
  $(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
      $(".back-to-top").fadeIn(duration);
    } else {
      $(".back-to-top").fadeOut(duration);
    }
  });

  $(".back-to-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });

  // Fancybox gallery
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

  // Slick slider
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

  // Menu hover functionality
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
