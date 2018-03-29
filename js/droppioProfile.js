$(document).ready(function() {

  //Init pouchDB
  function Settings() {

    this.jsonified = [];
    this.bloodType = false,
      this.name = false,
      this.lastname = false,
      this.dni = false,
      this.email = false,
      this.weight = false,
      this.birthDate = false,
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

  $.post("/", {

    _xsrf: xsrf_token,
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

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  //$('#pickadate').pickadate();
  $('select').material_select();

  settingsDB.sync(remote_settings, {

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
      */
    });



  });
});