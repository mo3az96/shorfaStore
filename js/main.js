$(window).on("load", function () {
  $("body").removeClass("overflow");
});
$(document).ready(function () {
  // Menu
  $(".menu-btn").click(function () {
    $(".header-nav").addClass("active");
    $("body").addClass("overflow");
    $(".overlay").fadeIn();
  });
  $(".menu-close,.overlay").click(function () {
    $(".header-nav").removeClass("active");
    $("body").removeClass("overflow");
    $(".overlay").fadeOut();
  });
  // Main Slider
  let mainSwiper = new Swiper(".main-slider .swiper", {
    loop: true,
    speed: 500,
    slidesPerView: "auto",
    centeredSlides: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      0: {
        spaceBetween: 10,
      },
      991: {
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".main-slider .slider-pagination",
      clickable: true,
    },
  });

  // Categories Slider
  let categoriesSwiper = new Swiper(".categories-slider .swiper", {
    loop: true,
    slidesPerView: "auto",
    breakpoints: {
      0: {
        spaceBetween: 15,
      },
      1200: {
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".categories-slider .slider-pagination",
      clickable: true,
    },
  });

  // Products Slider
  let productsSwiper = new Swiper(".products-slider .swiper", {
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 15,
      },
      481: {
        slidesPerView: "auto",
        spaceBetween: 21,
      },
    },
    pagination: {
      el: ".products-slider .slider-pagination",
      clickable: true,
    },
  });

  // Testimonials Slider
  let testimonialsSwiper = new Swiper(".testimonials-slider .swiper", {
    loop: true,
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 0,
      },
      767: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2.5,
      },
      1199: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".testimonials-slider .slider-pagination",
      clickable: true,
    },
  });

  // Select2
  if ($(window).width() > 767) {
    $(".select2-trigger").select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: "dropdown-list",
    });
  }

  // Password
  $(".password-icon").click(function () {
    var input = $(this).parents(".password-content").find("input");
    if ($(input).attr("type") == "password") {
      $(input).attr("type", "text");
    } else {
      $(input).attr("type", "password");
    }
  });

  // otp
  $(".otp-input").on("input", function () {
    var $this = $(this);
    var value = $this.val();
    if (value.length === 1) {
      $this.next(".otp-input").prop("disabled", false).focus();
    }
    checkInputs();
  });

  $(".otp-input").on("keydown", function (e) {
    var $this = $(this);
    if (e.key === "Backspace" && !$this.val()) {
      $this.prop("disabled", true);
      $this.prev(".otp-input").focus().val("").prop("disabled", false);
    }
  });

  $(".otp-input").on("paste", function (e) {
    e.preventDefault();
    var pasteData = e.originalEvent.clipboardData.getData("text");
    var chars = pasteData.split("").slice(0, 4);
    $(".otp-input").each(function (index) {
      $(this)
        .val(chars[index] || "")
        .prop("disabled", false);
    });
    $("#otp4").focus();
    checkInputs();
  });

  function checkInputs() {
    var allFilled = $(".otp-input")
      .toArray()
      .every((input) => input.value.length === 1);
    if (allFilled) {
      $(".otp_btn-content").show();
    } else {
      $(".otp_btn-content").hide();
    }
  }
});
