$(document).ready(function() {

  //Init Materialzie
  $('select').formSelect();
  $('.datepicker').datepicker({
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    maxYear: 2002,
    yearRange: 80,
    clear: 'Borrar',
    done: 'OK',
  });

  //Init pouchDB
  function Settings() {

    this.jsonified = [];
    this.bloodType = false,
      this.name = false,
      this.lastname = false,
      this.dni = false,
      this.email = false,
      this.weight = false,
      this.birthday = false,
      this.password = false,
      this.toJSON = function() {

        for (var prop in this) {
          if (this[prop].length)
            this.jsonified.push({
              '_id': prop,
              value: this[prop]
            });
        }
        return this.jsonified;
      }
  }

  var info = new Settings();

  $("#saveSettings").submit(function(e) {

  info.name = $("#name").val();
  info.lastname = $("#lastname").val();
  info.bloodType = $("#bloodType").val();
  info.dni = $("#dni").val();
  info.email = $("#email").val();
  info.birthDate = $("#birthdate").val();
  info.weight = $("#weight").val();
  info.password = $("#password").val();

  console.log(info.toJSON());
  });
  /*
  function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : false;
  }

  var info = new Settings();

  $.post("/", {

    _xsrf: getCookie('_xsrf'),
    type: "creds"

  }).done(function(data) {

    data = JSON.parse(data);

    respType = data['type'];

    if (respType == 'creds') {

      var dbUser = data['dbUser'];
      var dbPass = data['dbPass'];

      var settingsDB = new PouchDB("settings" + dbUser, {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_settingssDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@droppio.org:6489/settings' + dbUser);

    }

  });


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

    $("#saveSettings").submit(function(e) {

      info.name = $("#name").val();
      info.lastname = $("#lastname").val();
      info.bloodType = $("#bloodType").val();
      info.dni = $("#dni").val();
      info.email = $("#email").val();
      info.birthDate = $("#birthDate").val();
      info.weight = $("#weight").val();
      info.password = $("#password").val();
      /*
      for (var doc in info.toJSON()) {

        settingsDB.get(prop).then(function(doc) {

          doc.value = info[prop];

          settingsDB.put(doc).catch(function(err) {
            //Strong presence of the dark force I see here (show warning)
          });

        });
      }

    });


  });
  */
});
