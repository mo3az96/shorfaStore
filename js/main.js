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
    // autoplay: {
    //   delay: 5000,
    // },
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
  $(".multiple-select-trigger").select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: "multiple-list",
  });

  // Password
  $(".password-icon").click(function () {
    var input = $(this).parents(".password-content").find("input");
    if ($(input).attr("type") == "password") {
      $(input).attr("type", "text");
    } else {
      $(input).attr("type", "password");
    }
  });

  // Telephone
  if ($(window).width() > 767) {
    function formatState(state) {
      if (!state.id) {
        return state.text;
      }

      const flagUrl = state.element?.dataset?.flag?.toLowerCase();

      const $state = $(`
      <span>
        <img src="${flagUrl}" class="img-flag" />
        <i>${state.text}</i>
      </span>
    `);

      return $state;
    }

    $(".country-key").select2({
      templateResult: formatState,
      templateSelection: formatState,
      minimumResultsForSearch: Infinity,
      dropdownCssClass: "country_key-list",
    });
  }
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

  // Archive Filter
  $(".archive_dropdown-btn").click(function () {
    let nextSibling = $(this).next(".archive_dropdown-list");
    $(".archive_dropdown-btn").not(this).removeClass("active");
    $(".archive_dropdown-list").not(nextSibling).slideUp();
    $(this).toggleClass("active");
    $(nextSibling).slideToggle();
  });
  $(".filter-btn").click(function () {
    let parent = $(this).parents(".filter-form");
    $(parent).find(".archive_dropdown-btn").removeClass("active");
    $(parent).find(".archive_dropdown-list").slideUp();
  });

  // Checkboxes
  $("#all").on("change", function () {
    $('#filterBox input[type="checkbox"]')
      .not(this)
      .prop("checked", this.checked);
  });

  $("#filterBox").on("change", 'input[type="checkbox"]', function () {
    if (this.id === "all") return;

    const id = this.id,
      checked = this.checked;
    $(`[data-parent="${id}"] input[type="checkbox"]`)
      .prop("checked", checked)
      .trigger("change");

    const parent = $(this).closest("[data-id]").data("parent");
    if (parent) {
      const group = $(`[data-parent="${parent}"] input[type="checkbox"]`);
      $(`#${parent}`).prop(
        "checked",
        group.length === group.filter(":checked").length
      );
    }

    const boxes = $('#filterBox input[type="checkbox"]').not("#all");
    $("#all").prop("checked", boxes.length === boxes.filter(":checked").length);
  });

  // Single Product Slider
  let singleProductSwiper = new Swiper(".product_gallery-slider .swiper", {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".product_gallery-slider .slider-pagination",
      clickable: true,
    },
  });

  // Input Date
  $("input[type='date']").change(function () {
    if ($(this).val() != "") {
      $(this).parents(".date-content").addClass("active");
    } else {
      $(this).parents(".date-content").removeClass("active");
    }
  });
});
// User Image
function profileImg(input) {
  const $img = $(".user-img-name img");
  const file = input.files?.[0];

  $img.attr(
    "src",
    file
      ? (window.URL || window.webkitURL).createObjectURL(file)
      : $(input).attr("data-palceholder")
  );
}

// Qty input
function stepQty(btn, direction) {
  const input = btn.parentNode.querySelector("input[type=number]");
  if (direction === "up") {
    input.stepUp();
  } else {
    input.stepDown();
  }

  $(input).trigger("change");
}

function additemFiles(input) {
  var preview = $(input).parents(".form-group").find(".file-preview");
  var files = input.files;
  preview.html("");
  for (let i = 0; i < files.length; i++) {
    var val = input.files[i];
    var name = val.name;
    var img = (window.URL ? URL : webkitURL).createObjectURL(val);
    preview.append(
      "<div class='img-pre'><img src='" + img + "' alt='" + name + "' class='img-contain'></div>"
    );
  }
}
