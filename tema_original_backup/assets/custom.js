jQuery(function(){

// my slick slider options
var options = {
   arrows: $('.slick-hero2').data("arrows"),
    dots: $('.slick-hero2').data("dots"),
    autoplay: $('.slick-hero2').data("autoplay"),
    autoplaySpeed: $('.slick-hero2').data("autoplayspeed"),
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    speed: theme.variables.transitionSpeed,
  adaptiveHeight: true,
};


// my slick slider as constant object
const mySlider = $('.slick-hero2').on('init', function(slick) {

  // on init run our multi slide adaptive height function
  multiSlideAdaptiveHeight(this);

}).on('beforeChange', function(slick, currentSlide, nextSlide) {
console.log(currentSlide);
  // on beforeChange run our multi slide adaptive height function
  multiSlideAdaptiveHeight(this);

}).slick(options);


// our multi slide adaptive height function passing slider object
function multiSlideAdaptiveHeight(slider) {

  // set our vars
  let activeSlides = [];
  let tallestSlide = 0;

  // very short delay in order for us get the correct active slides
  setTimeout(function() {

    // loop through each active slide for our current slider
    $('.slick-track .slick-active', slider).each(function(item) {

      // add current active slide height to our active slides array
      activeSlides[item] = $(this).outerHeight();

    });

    // for each of the active slides heights
    activeSlides.forEach(function(item) {

      // if current active slide height is greater than tallest slide height
      if (item > tallestSlide) {

        // override tallest slide height to current active slide height
        tallestSlide = item;

      }

    });

    // set the current slider slick list height to current active tallest slide height
    $('.slick-list', slider).height(tallestSlide);
console.log(tallestSlide);
  }, 10);

}


// when window is resized
$(window).on('resize', function() {

  // run our multi slide adaptive height function incase current slider active slides change height responsively
  multiSlideAdaptiveHeight(mySlider);

});
  });