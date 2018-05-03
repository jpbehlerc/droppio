$(document).ready(function() {

  //Init pouchDB
  function Settings() {

    this.bloodType = false,
      this.radius = false

  };

  function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : false;
  }

  var keys = ['bloodType', 'nearbyHospitals'];

  var bloodID = {
    4: 'O+',
    1: 'A+',
    2: 'B+',
    3: 'AB+',
    8: 'O-',
    5: 'A-',
    6: 'B-',
    7: 'AB-',
  }

  var notReady = {
    'campaigns': true,
    'settings': true,
  };

  var settings = new Settings();

  $.post("/registerTest", {

    _xsrf: xsrf_token,
    type: "creds"

  }).done(function(data) {

    data = JSON.parse(data);

    respType = data['type'];

    if (respType == 'creds') {

      dbUser = data['dbUser'];
      dbPass = data['dbPass'];
      dbAdminUser = data['dbAdminUser'];
      dbAdminPass = data['dbAdminPass'];

      //Init respective DBs
      var campaignsDB = new PouchDB("campaigns", {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_campaignsDB = new PouchDB('https://' + dbAdminUser + ':' + dbAdminPass + '@alfredarg.com:6489/campaigns');

      var settingsDB = new PouchDB("settings" + dbUser, {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_settingsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@alfredarg.com:6489/settings' + dbUser);

      var statsDB = new PouchDB("stats" + dbUser, {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_statsDB = new PouchDB('https://' + dbAdminUser + ':' + dbAdminPass + '@alfredarg.com:6489/stats' + dbUser);

      var algorithmsDB = new PouchDB("algorithms", {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_algorithmsDB = new PouchDB('https://' + dbAdminUser + ':' + dbAdminPass + '@alfredarg.com:6489/algorithms');


      campaignsDB.allDocs({
        include_docs: true,

      }).then(function(res) {

        res.rows.forEach(function(docs) {

          doc = docs.doc;

          receiver = doc.name + ' ' + doc.lastname;
          hospital = doc.hospital;
          donors = doc.donors;

          totalTime = doc.status == 0 ? 30 : 15;

          created = moment(doc.createdAt);
          now = moment().tz("America/Argentina/Buenos_Aires").valueOf();
          remaining = totalTime / now.subtract(created);
          console.log(remaining);
          compatible = '';

          doc.compatible.forEach(function(row) {

            compatible += bloodID[row] + ' ';
          });

          $('#casperCampaign').find('#campaignReceiver').html(receiver);
          $('#casperCampaign').find('#campaignHospital').html(hospital);
          $('#casperCampaign').find('#campaignDonors').find('#neededDonors').html(donors);
          $('#casperCampaign').find('#campaignCompatibility').html(compatible);

          newCampaign = $('#casperCampaign').html();

          $('#campaigns').append(newCampaign);


          //receiver = doc.name + ' ' + doc.lastname;
        });

      }).catch(function(err) {

        $("#test").html(err);
      });

      //Sync settings only then start campaign filtration
      settingsDB.sync(remote_settingsDB, {

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

        if (notReady['settings']) {

          notReady['settings'] = false;

          settingsDB.allDocs({
            include_docs: true,
            keys: keys

          }).then(function(res) {

            var allPresent = true;

            res.rows.forEach(function(doc) {

              if ('error' in doc || doc.doc === null) {

                allPresent = false;
              } else {

                settings[doc.doc._id] = doc.doc.value;
              }

            });


            if (allPresent) {


              campaignsDB.replicate.from(remote_campaignsDB, {

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

                filter: function(doc, req) {

                  var isCompatible = doc.compatible.includes(req.query.bloodType);
                  var isNear = req.query.nearbyHospitals.includes(doc.hospital);
                  var isValid = doc.createdAt > req.query.expiry;

                  return isCompatible && isNear && isValid;

                },

                query_params: {
                  bloodType: settings.bloodType,
                  nearbyHospitals: settings.nearbyHospitals,
                  expiry: moment().tz("America/Argentina/Buenos_Aires").subtract(30, 'days').valueOf()
                }


              }).on('change', function(change) {

                console.log(change);
                docs = change.docs;

                for (var key in docs) {

                  console.log(docs[key]);

                  doc = docs[key];

                  receiver = doc.name + ' ' + doc.lastname;
                  hospital = doc.hospital;
                  donors = doc.donors;
                  compatible = '';

                  doc.compatible.forEach(function(row) {

                    compatible += bloodID[row] + ' ';
                  });

                  $('#casperCampaign').find('#campaignReceiver').html(receiver);
                  $('#casperCampaign').find('#campaignHospital').html(hospital);
                  $('#casperCampaign').find('#campaignDonors').find('#neededDonors').html(donors);
                  $('#casperCampaign').find('#campaignCompatibility').html(compatible);

                  newCampaign = $('#casperCampaign').html();

                  $('#campaigns').append(newCampaign);

                }

              });

            }

          }).catch(function(info) {

            console.log("Aha something nasty happened while syncing campaigns!");
          });

        }
      }).on('error', function(info) {

        console.log("Oops smth happened while trying to sync settings!");

      });

      //Sync settings only then start campaign filtration
      statsDB.sync(remote_statsDB, {

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
      }).on('error', function(err) {
        //See you in afterlife
      });

      algorithmsDB.sync(remote_algorithmsDB, {

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
      }).on('error', function(err) {
        //See you in afterlife
      });



    }

  });


  // Page Selection
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
  $('.datepicker').datepicker({
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

  $('.timepicker').timepicker({
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
  $('select').formSelect();
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

        id = $(this).attr("id");
        donation = {
          '_id': info._id + '@' + id,
          'name': info.name,
          'lastName': info.LastName
        };

        settingsDB.get('isAble').then(function(res) {

          campaigns.put(donation).catch(function(err) {

            swal({
              title: 'Oops!',
              text: 'Ocurrió un error al procesar la donación, por favor intente nuevamente :)',
              type: 'error',
              showConfirmButton: false,
            });

          });

        }).catch(function(err) {

          months = {
            "January": '01',
            "February": '02',
            "March": '03',
            "April": '04',
            "May": '05',
            "June": '06',
            "July": '07',
            "August": '08',
            "September": '09',
            "October": '10',
            "November": '11',
            "December": '12'
          }

          //Check if user can donate given settings, create flag isAble document
          now = moment().tz("America/Argentina/Buenos_Aires");
          birth = info.birthDate.split(" ");

          day = parseInt(birth[0]) < 10 ? "0" + birth[0] : birth[0];
          month = months[birth[1].split(",")[0]];
          year = birth[2];

          age = moment(year + "-" + day + "-" + month + " " + "00:00").diff(now, 'years');

          weight = parseInt(info.weight);

          if (age >= 18 && weight >= 50) {

            settingsDB.put({
              '_id': '_local/isAble'
            });

            campaigns.put(donation).catch(function(err) {

              swal({
                title: 'Oops!',
                text: 'Ocurrió un error al procesar la donación, por favor intente nuevamente :)',
                type: 'error',
                showConfirmButton: false,
              });

            });

          }

        });

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


  $('#spread').click(function() {

    if (typeof FB !== 'undefined' && FB !== null) {

      FB.login(function(response) {

        if (response.status === 'connected') {
          // Logged into your app and Facebook.
        } else {
          // The person is not logged into this app or we are unable to tell.
        }
      }, {
        scope: 'publish_actions'
      });


    }


  });

});