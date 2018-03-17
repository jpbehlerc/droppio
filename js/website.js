// init
$(document).ready(function() {

  $(".button-collapse").sideNav();
  $('select').material_select();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});
window.onload = function() {
  scrolly();
};
