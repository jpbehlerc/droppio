$(document).ready(function() {

  //Init pouchDB
  function Settings() {

    this._jsonified = [];
    this._keys = [];
    this.bloodType = false;
    this.name = false;
    this.lastname = false;
    this.dni = false;
    this.email = false;
    this.weight = false;
    this.birthDate = false;
    this.password = false;
    this.province = false;
    this.toJSON = function() {

      for (var prop in this) {

        if (prop.indexOf('_') == -1) {

          if (this[prop].length)
            this._jsonified[prop] = this[prop];

        }
      }

      return this._jsonified;
    };
  }

  var info = new Settings();

  function storePosition(position) {

    info.location = {
      'lat': position.coords.latitude,
      'lon': position.coords.longitude
    };

    var geocoder = new google.maps.Geocoder();

    var latlon = new google.maps.LatLng("-32.8832582", "-68.8935387");

    geocoder.geocode({
      'latLng': geolocate
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var result;
        if (results.length > 1) {
          result = results[1];
        } else {
          result = results[0];
        }
        //console.log(result);
        console.log(result.address_components[2].long_name + ', ' + result.address_components[3].long_name);

      }
    });

  }

  //Watch and store position in realtime
  navigator.geolocation.watchPosition(function(position) {

    storePosition(position);
  });


  $.post("/registerTest", {

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

      var hospitalsDB = new PouchDB("hospitals", {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_hospitalsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@alfredarg.com:6489/hospitals');

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
        keys = Object.keys(elems);

        settingsDB.allDocs({
          include_docs: true,
          keys: keys
        }).then(function(res) {

          res.rows.forEach(function(row) {

            if ('error' in row) {

              settingsDB.put({
                '_id': row.key,
                'value': elems[row.key]
              }).catch(function(err) {
                // Show some fancy warning :O
              });

            } else {

              doc = row.doc;
              doc['value'] = elems[row.key];
              console.log(doc);
              settingsDB.put(doc).catch(function(err) {
                // Show some fancy warning :O
              });
            }

          });

        }).catch(function(err) {
          // some paranormal shit happening here (show warning)
        });

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


      hospitalsDB.sync(remote_hospitalsDB, {

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


$('select').material_select();

});