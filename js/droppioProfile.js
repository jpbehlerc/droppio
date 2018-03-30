$(document).ready(function() {

  //Init pouchDB
  function Settings() {

    this._jsonified = [];
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

          if (prop.indexOf('_') == -1) {

            if (this[prop].length)

              this._jsonified.push({
                '_id': prop,
                'value': this[prop]
              });
          }
        }
        return this._jsonified;
      }
  }

  var info = new Settings();

  function storePosition(position) {

    info.location = {
      'lat': position.coords.latitude,
      'lon': position.coords.longitude
    };

  }

  //Watch and store position in realtime
  navigator.geolocation.watchPosition(function(position) {

    storePosition(position);
  });


  $.post("/register", {

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

      var remote_settingsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@alfredarg.com:6489/settings' + dbUser);

      $("#saveSettings").submit(function(e) {

        e.preventDefault();

        info.name = $("#name").val();
        info.lastname = $("#lastname").val();
        info.bloodType = $("#bloodType").val();
        info.dni = $("#dni").val();
        info.email = $("#email").val();
        info.birthDate = $("#birthDate").val();
        info.weight = $("#weight").val();
        info.password = $("#password").val();
        info.radius = $("#radius").val();
        elems = info.toJSON();

        for (var i in elems) {
          console.log(i);
          var doc = elems[i];
          console.log(elems[i]);

          settingsDB.get(elems[i]['_id']).then(function(res) {

            res.value = elems[i]['value'];

            settingsDB.put(res).catch(function(err) {
              //Strong presence of the dark force I see here (show warning)
            });

          }).catch(function(err) {
            //Document not found
            console.log(doc);
            settingsDB.put(elems[i]).catch(function(err) {
              //Strong presence of the dark force I see here (show warning)
            });
          });
        }
      });

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

      }).on('error', function(err) {
        //See you later terminator
      });

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

});