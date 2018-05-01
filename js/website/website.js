// init
$(document).ready(function() {
  $('select').formSelect();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.collapsible').on('click', function() {
    $(this).find('.material-icons').first().toggleClass('rotate180');
  });
  $('.checkbox').click('input[checkbox]', function() {
    $('.modal').modal();
  });
  $('#register').find('button').click(function() {
    console.log('gut');
    var data = {};
    data.name = $('#name').val();
    data.lastname = $('#lastname').val();
    data.bloodType = $('#bloodType').val();
    var bloodTypeForm = $('#bloodType').val();;
    data.dni = $('#dni').val();
    data.email = $('#email').val();
    data.phone = $('#phone').val();
    console.log('alles gut');
    btype = {1:'A+',2:'B+',3:'AB+',4:'O+',5:'A-',6:'B-',7:'AB-',8:'O-'};
    $('#confirmSignUp').find('#confirmText').html('<p><b>Nombre:</b> ' + data.name + '</p>' + '<p><b>Apellido:</b> ' + data.lastname + '</p>' + '<p><b>Tipo de Sangre:</b> ' + btype[data.bloodType] + '</p>' + '<p><b>Dni:</b> ' + data.dni + '</p>' + '<p><b>Email:</b> ' + data.email + '</p>' + '<p><b>Telefono:</b> ' + data.phone + '</p>');

    $('#confirmationButton').on('click', function() {

      registerDB.post(data).then(function(result) {
        M.toast({html: 'La Inscripcion en Droppio ha sido exitosa!', classes: 'green darken-2', displayLength: 4000});
      }).catch(function(err) {
        M.toast({html: 'Ha ocurrido un error inesperado!', classes: 'red darken-2', displayLength: 4000});
      });
    });

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
