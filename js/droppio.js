$(document).ready(function() {

  $('#home').click(function(e){
    e.preventDefault();
    window.location = "https://droppio.org/home";
  });
  $('#campaign').click(function(e){
    e.preventDefault();
    window.location = "https://droppio.org/campaign";
  });
  $('#profile').click(function(e){
    e.preventDefault();
    window.location = "https://droppio.org/profile";
  });

// Pickers - - - - - - - - - - - - -
// Date Picker
  $('.datepicker').datepicker({
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    maxYear: 2002,
    setDefaultYear: true,
    defaultYear: 1990,
    yearRange: 80,
    clear: 'Borrar',
    done: 'OK',
  });

// Timer Picker
  $('.timepicker').timepicker({
    defaultTime: '08:00', // Set default time: 'now', '1:30AM', '16:30'
    autoClose: true,
    twelvehour: false, // Use AM/PM or 24-hour format
    done: 'OK', // text for done-button
    cancel: 'Cancelar', // Text for cancel-button
  });
  $('select').formSelect();


// Modals - - - - - - - - - - - - - - - - - -
// Share
  $('.spread').click(function(e) {

    swal('Gracias!',
      'Ademas de compartir puedes salvar a esta persona donando!.',
      'success');

  });
// Donate
  $('.donate').click(function(e) {

    swal({
      html: '<div class="row center"><div class="col s2 m2 l2"> <i class="fas fa-exclamation-circle ce" style="margin-top:0.5em; margin-left:-0.25em; font-size:2.5em; color:#c91249"></i></div><div class="col s10 m10 l10"><p class="left flow-text" style="text-align:left;color:#c91249">Tenga en cuenta que para donar usted debe:</p></div></div><div class="row" style="margin-top:-1em; text-align:left"><div class="col s2 m2 l2" style="margin-top:-1em"></div><div class="col s10 m10 l10"><ul><li style="margin-bottom:0.5em"> &bull; Pesar más de 50 kilos</li><li style="margin-bottom:0.5em"> &bull; Tener entre 18 y 65 años de edad</li><li style="margin-bottom:0.5em"> &bull; No haber padecido una enfermedad en los ultimos 7 días</li><li style="margin-bottom:0.5em"> &bull; Tener presión arterial normal</li><li style="margin-bottom:0.5em"> &bull; No habese hecho un tatuaje ni haber recibido alguna operacion en el ultimo año</li></ul></div></div></div></div><div class="row center"><div class="col s2 m2 l2"> <i class="fas fa-h-square" style="margin-top:0.5em; margin-left:-0.25em; font-size:2.5em; color:#c91249;"></i></div><div class="col s10 m10 l10"><p class="left flow-text" style="text-align:left; color:#c91249;">Presentarse en Hospital Español<span style="color:black;"> de 8hs a 12hs</span></p></div></div>',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#ffab40',
      cancelButtonText: 'Cancelar',
      position: 'top-center'

    }).then(function(result) {

      if (result.value) {

        swal({
          title: 'Genial!',
          text: 'Estás a un paso de salvar a esta persona, sólo debes ir a donar',
          type: 'success',
          confirmButtonText: 'Ir a donar',
          showCancelButton: true,
          cancelButtonText: 'Iré luego'

        }).then(function(result) {

          console.log("Button value: " + result.value);

          if (result.value)
            window.location = "https://www.google.com/maps?&z=10&mrt=yp&t=m&q=-32.8996453,-68.878869,13";


        });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // Shall we show a dismissal msj?
      }
    });

  });
});
