// init
$(document).ready(function() {
  $('.modal').modal();
  $('select').formSelect();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.collapsible').on('click', function(){
    $(this).find('.material-icons').toggleClass('rotate180');
  });
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
$('#register').submit(function() {
  var name = $('#name').val();
  var lastname = $('#lastname').val();
  var bloodType = $('#bloodType').val();
  var dni = $('#dni').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  console.log(phone);
  $('#confirmSignUp').find('#confirmText').html('<p><b>Nombre:</b> ' + name + '</p>' + '<p><b>Apellido:</b> ' + lastname + '</p>' + '<p><b>Tipo de Sangre:</b> ' + bloodType + '</p>' + '<p><b>Dni:</b> ' + dni + '</p>' + '<p><b>Email:</b> ' + email + '</p>' + '<p><b>Telefono:</b> ' + phone + '</p>') ;
  });

});
