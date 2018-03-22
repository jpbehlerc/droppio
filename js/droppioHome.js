$(document).ready(function() {

  //Init pouchDB
  var settings = {

    bloodType = false,
    name = false,
    lastname = false,
    dni = false,
    email = false,
    weight = false,
    birth = false
  };

  //Init respective DBs
  var campaigns = new PouchDB("campaigns_userID", {
    auto_compaction: false,
    cache: false,
    heartbeat: true
  });

  var settings = new PouchDB("settings_userID", {
    auto_compaction: false,
    cache: false,
    heartbeat: true
  });

  var remote_campaigns = new PouchDB('https://droppio.org:6489/campaigns');
  var remote_settings = new PouchDB('https://droppio.org:6489/settings_userID');

  $('#home').click(function(e) {
    e.preventDefault();
    window.location = "https://droppio.org/home";
  });
  $('#campaign').click(function(e) {
    e.preventDefault();
    window.location = "https://droppio.org/campaign";
  });
  $('#profile').click(function(e) {
    e.preventDefault();
    window.location = "https://droppio.org/profile";
  });

  //$('#pickadate').pickadate();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: true,
    min: [1901, 1, 1],
    max: true,
    Year: 2002,
    selectYears: 1000,
    labelMonthNext: 'Proximo Mes',
    labelMonthPrev: 'Mes Anterior',
    labelMonthSelect: 'Seleccione Mes',
    labelYearSelect: 'Seleccione Año',
    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    today: false,
    clear: 'Borrar',
    close: 'Cerrar'
  });

  $('.timepicker').pickatime({
    default: false, // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Borrar', // text for clear-button
    canceltext: 'Cancelar', // Text for cancel-button
    autoclose: true, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function() {} //Function for after opening timepicker
  });
  $('select').material_select();
  // Success Modal
  $('.spread').click(function(e) {

    swal('Gracias!',
      'Ademas de compartir puedes salvar a esta persona donando!.',
      'success');

  });

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

  //Sync settings only then start campaign filtration
  settings.sync(remote_settings, {

    live: true,
    retry: true,
    back_off_function: function(delay) {

      if (delay == 0) {

        return 1000;

      } else if (delay >= 1000 && delay < 1800000) {

        return delay * 1.5;

      } else if (delay >= 1800000) {

        return delay * 1.1;

      }

    }
  }).on('paused', function(err) {

      settings.get('bloodType').then(function(doc) {


          settings.bloodType = doc.bloodType;
          settings.name = doc.name;
          settings.lastname = doc.lastname;
          settings.dni = doc.dni;
          settings.email = doc.email;
          settings.weight = doc.weight;
          settings.birthDate = doc.birthDate;

          campaigns.replicate.from(remote_campaigns, {

            live: true,
            retry: true,
            back_off_function: function(delay) {

              if (delay == 0) {

                return 1000;

              } else if (delay >= 1000 && delay < 1800000) {

                return delay * 1.5;

              } else if (delay >= 1800000) {

                return delay * 1.1;

              }
            },
            selector: {
              "compatible": {
                "$elemMatch": {
                  "$eq": settings.bloodType
                }
              }

            }

          }).on('change', function(docs) {

              var distance = function(src, dst) {

                var R = 6371e3; // metres
                var φ1 = src.lat.toRadians();
                var φ2 = dst.lat.toRadians();
                var Δφ = (dst.lat - src.lat).toRadians();
                var Δλ = (dst.lon - src.lon).toRadians();

                var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                return (R * c);


              }

              for (i = 0, n = docs.length; i < n; i++) {

                doc = docs[i];
                dst = doc.coordinates;
                src = settings.coordinates;

                if (distance(src, dst) <= 5000) {

                  //Show campaign, else do nothing
                }

              }


            };
          }).on('error', function(info) {
          // I'll be back
        });

      });


  }).on('error', function(info) {

  console.log("Oops smth happened while trying to sync settings!");

});



});