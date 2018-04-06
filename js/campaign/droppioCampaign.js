$(document).ready(function() {

  //Init pouchDB
  function Campaign() {

    this._id = false,
      this.bloodType = false,
      this.name = false,
      this.lastname = false,
      this.dni = false,
      this.hospital = false,
      this.hospitalHours = false,
      this.hospitalLocation = false,
      this.duty = false,
      this.status = false,
      this.createdAt = false

  };

  function Settings() {

    this.bloodType = false,
      this.nearbyHospitals = false
  };

  function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : false;
  }

  function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  };

  function randHex(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  };

  var campaign = new Campaign();
  var settings = new Settings();

  var notReady = {
    'campaigns': true,
    'settings': true
  };

  var compatibility = {
    4: [4, 8],
    1: [1, 5, 4, 8],
    2: [2, 6, 4, 8],
    3: [1, 5, 3, 7, 2, 6, 4, 8],
    8: [8],
    5: [5, 8],
    6: [6, 8],
    7: [7, 5, 6, 8]
  }

  $.post("/registerTest", {

    _xsrf: getCookie('_xsrf'),
    type: "creds"

  }).done(function(data) {

    data = JSON.parse(data);

    respType = data['type'];

    if (respType == 'creds') {

      var dbUser = data['dbUser'];
      var dbPass = data['dbPass'];

      //Init respective DBs
      var settingsDB = new PouchDB("settings" + dbUser, {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_settingsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@alfredarg.com:6489/settings' + dbUser);

      var campaignsDB = new PouchDB("campaigns", {
        auto_compaction: true,
        cache: false,
        heartbeat: true
      });

      var remote_campaignsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@alfredarg.com:6489/campaigns');

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

          $("#ownCampaign, #othersCampaign").click(function() {

            var keys = ['name', 'lastName', 'bloodType', 'dni'];

            for (var div in keys) {

              $('#' + div + 'Div').css('display', 'block');
            }


            if ($(this).attr("id") == 'ownCampaign') {


              settingsDB.allDocs({
                include_docs: true,
                keys: keys
              }).then(function(res) {

                res.rows.forEach(function(row) {
                  console.log(keys);
                  if (keys.include(row.id))
                    $('#' + row.id + 'Div').css('display', 'none');

                });

              }).catch(function(err) {
                // some paranormal shit happening here (show warning)
              });



            }

          });


          notReady['settings'] = false;
        }

      }).on('error', function(err) {
        //See you later pal (show warning)
      });

      campaignsDB.sync(remote_campaignsDB, {

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

        if (notReady['campaigns']) {

          $("#submitCampaign").submit(function() {

            name = $("#name").val();
            lastname = $("#lastname").val();
            bloodType = $("#bloodType").val();
            dni = $("#dni").val();
            status = $("#status").val();

            hospital = $("#hospital").val().split("@");
            hospitalLocation = hospital[1].split(" ");
            hospitalLocation = {
              'lat': hospitalLocation[0],
              'lon': hospitalLocation[1]
            };
            hospital = hospital[0];

            hospitalStarts = $("#hospitalHoursStart").val();
            hospitalEnds = $("#hospitalHoursEnd").val();
            hospitalHours = hospitalStarts + " " + hospitalEnds;

            campaign.name = name;
            campaign.lastname = lastname;
            campaign.bloodType = bloodType;
            campaign.dni = dni;
            campaign.status = status;
            campaign.hospital = hospital;
            campaign.hospitalHours = hospitalHours;
            campaign.createdAt = moment().tz("America/Argentina/Buenos_Aires").valueOf();
            campaign._id = dbUser + randHex(16);
            campaign.compatible = compatibility[campaign.bloodType];

            campaignsDB.find({
              selector: {
                dni: campaign.dni
              }
            }).then(function(res) {

              console.log(res);
            });

          });

          notReady['campaigns'] = false;

        }
      }).on('error', function(err) {
        //See you later pal (show warning)
      });

    }
  });

  // Date Picker
  $('.datepicker').datepicker({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
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




});