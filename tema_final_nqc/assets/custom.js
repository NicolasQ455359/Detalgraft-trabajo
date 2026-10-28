jQuery(function(){
  if (!$('.slick-hero2').length) return;

  var options = {
    arrows: $('.slick-hero2').data("arrows"),
    dots: $('.slick-hero2').data("dots"),
    autoplay: $('.slick-hero2').data("autoplay"),
    autoplaySpeed: $('.slick-hero2').data("autoplayspeed"),
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    speed: (window.theme && window.theme.variables) ? window.theme.variables.transitionSpeed : 300,
    adaptiveHeight: true
  };

  const mySlider = $('.slick-hero2').on('init', function(slick) {
    multiSlideAdaptiveHeight(this);
  }).on('beforeChange', function(slick, currentSlide, nextSlide) {
    multiSlideAdaptiveHeight(this);
  }).slick(options);

  function multiSlideAdaptiveHeight(slider) {
    let activeSlides = [];
    let tallestSlide = 0;

    setTimeout(function() {
      $('.slick-track .slick-active', slider).each(function(item) {
        activeSlides[item] = $(this).outerHeight();
      });

      activeSlides.forEach(function(item) {
        if (item > tallestSlide) {
          tallestSlide = item;
        }
      });

      if (tallestSlide > 0) {
        $('.slick-list', slider).height(tallestSlide);
      }
    }, 10);
  }

  $(window).on('resize', function() {
    multiSlideAdaptiveHeight(mySlider);
  });
});