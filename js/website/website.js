// init
$(document).ready(function() {
  $('select').formSelect();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.collapsible').on('click', function() {
    $(this).find('.material-icons').toggleClass('rotate180');
  });
  $('.checkbox').click('input[checkbox]',function(){
    $('.modal').modal();
  });
  $('#register').find('button').click(function(e) {
    e.preventDefault();
    console.log('gut');
    var name = $('#name').val();
    var lastname = $('#lastname').val();
    var bloodType = $('#bloodType').val();
    var bloodTypeForm = undefined;
    var dni = $('#dni').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    console.log('alles gut');
    if (bloodType == 1) {
      bloodTypeForm = "A+"
    } else if (bloodType == 2) {
      bloodTypeForm = "B+"
    } else if (bloodType == 3) {
      bloodTypeForm = "AB+"
    } else if (bloodType == 4) {
      bloodTypeForm = "O+"
    } else if (bloodType == 5) {
      bloodTypeForm = "A-"
    } else if (bloodType == 6) {
      bloodTypeForm = "B-"
    } else if (bloodType == 7) {
      bloodTypeForm = "AB-"
    } else if (bloodType == 8) {
      bloodTypeForm = "O-"
    } else {
      bloodTypeForm = ""
    }
    $('#confirmSignUp').find('#confirmText').html('<p><b>Nombre:</b> ' + name + '</p>' + '<p><b>Apellido:</b> ' + lastname + '</p>' + '<p><b>Tipo de Sangre:</b> ' + bloodTypeForm + '</p>' + '<p><b>Dni:</b> ' + dni + '</p>' + '<p><b>Email:</b> ' + email + '</p>' + '<p><b>Telefono:</b> ' + phone + '</p>');
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

});
