// init
$(document).ready(function() {

  $('select').material_select();
  $('.parallax').parallax();
  // Scrolly
  //this is where we apply opacity to the arrow
  $(window).scroll(function() {

    //get scroll position
    var topWindow = $(window).scrollTop();
    //multipl by 1.5 so the arrow will become transparent half-way up the page
    var topWindow = topWindow * 1.5;

    //get height of window
    var windowHeight = $(window).height();

    //set position as percentage of how far the user has scrolled
    var position = topWindow / windowHeight;
    //invert the percentage
    position = 1 - position;
  });
});

var options = [{
  selector: '.fadeInImage1',
  offset: 300,
  callback: function(el) {
    Materialize.fadeInImage($(el));
  }
}, {
  selector: '.fadeInImage2',
  offset: 500,
  callback: function(el) {
    Materialize.fadeInImage($(el));
  }
}];
Materialize.scrollFire(options);
