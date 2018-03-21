$(document).ready(function() {

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

  //Register campaign events
  $('.spread').click(function(e) {

    swal('Gracias!',
      'Ademas de compartir puedes salvar a esta persona donando!.',
      'success');

  });

  $('.donate').click(function(e) {

    swal({
      html: '<div class="row center"> <div class="col s2 m2 l2"> <i class="fas fa-exclamation-circle" style="margin-top:0.5em; margin-left:-0.25em; font-size:2.5em; color:#c91249"></i></div><div class="col s10 m10 l10"><p class="left flow-text" style="text-align:left;color:#c91249">Tenga en cuenta que para donar usted debe:</p></div></div><div class="row" style="margin-top:-1em; text-align:left"><div class="col s2 m2 l2" style="margin-top:-1em"></div><div class="col s10 m10 l10"><ul><li style="margin-bottom:0.5em"> &bull; Pesar más de 50 kilos</li><li style="margin-bottom:0.5em"> &bull; Tener entre 18 y 65 años de edad</li><li style="margin-bottom:0.5em"> &bull; No haber padecido una enfermedad en los ultimos 7 días</li><li style="margin-bottom:0.5em"> &bull; Tener presión arterial normal</li></ul></div></div></div></div><div class="row center"> <div class="col s2 m2 l2"> <i class="fas fa-h-square" style="margin-top:0.5em; margin-left:-0.25em; font-size:2.5em; color:#c91249;"></i></div><div class="col s10 m10 l10"><p class="left flow-text" style="text-align:left; color:#c91249;">Presentarse en Hospital Español<span style="color:black;"> de 8hs a 12hs</span></p></div></div>',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#ffab40',
      cancelButtonText: 'Cancelar',
      position: 'top-start'

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
            window.location = "https://www.google.com/maps?&z=10&mrt=yp&t=m&q=-32.9149469+-68.847456,17";


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

      var bloodType = doc.type;

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
              "$eq": bloodType
            }
          }

        }

      }).on('error', function(info) {
        // I'll be back
      });

    });


  }).on('error', function(info) {

    console.log("Oops smth happened while trying to sync settings!");

  });



});