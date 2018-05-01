$(document).ready(function() {

  //Init pouchDB
  function Campaign() {

    this._id = false,
      this.bloodType = false,
      this.name = false,
      this.lastname = false,
      this.donors = false,
      this.dni = false,
      this.hospital = false,
      this.hospitalHours = false,
      this.status = false,
      this.createdAt = false

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

  $.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };

        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));

      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);

        if (typeof callback === 'function') callback();
      });

      return this;
    },
  });

  var campaign = new Campaign();

  var notReady = {
    'campaigns': true,
    'settings': true,
    'hospitals': false
  };


  var hospitalOpts = {
    selector: {
      'province': {
        '$exists': true
      }
    }
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

      var dbUser = data['dbAdminUser'];
      var dbPass = data['dbAdminPass'];

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

      var hospitalsDB = new PouchDB("hospitals", {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_hospitalsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@alfredarg.com:6489/hospitals');

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

          var keys = ['name', 'lastName', 'bloodType', 'dni'];
          var present = [];

          settingsDB.allDocs({
            include_docs: true,
            keys: keys
          }).then(function(res) {

            res.rows.forEach(function(row) {

              if (keys.includes(row.id))
                present.push(row.id);


              if (row.id == 'province') {

                hospitalOpts['selector'] = {
                  'province': row.value
                }

              }


            });

            hospitalsDB.find(hospitalOpts).then(function(result) {

              var docs = 'docs' in result ? result.docs : false;

              if (docs) {

                for (var key in docs) {

                  doc = docs[key];
                  name = doc.name;
                  $('#hospital').append('<option value="' + name + '">' + name + '</option>');
                }
              }

              $('#hospital').formSelect();

            });

          });

          $("#ownCampaign, #othersCampaign").click(function() {


            keys.forEach(function(elem) {

              $('#' + elem + 'Div').css('display', 'block');
              $('#' + elem + 'Div').animateCss('flipInX');

            });

            if ($(this).attr("id") == 'ownCampaign') {

              settingsDB.allDocs({
                include_docs: true,
                keys: keys
              }).then(function(res) {

                for (var p in present) {

                  $('#' + p + 'Div').animateCss('flipOutX', function() {
                    $('#' + p + 'Div').css('display', 'none');
                  })

                }


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

      }).on('paused', function(err) {
        //See you later sherminator
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

          $("#createCampaign").submit(function(e) {

            e.preventDefault();

            name = $("#name").val();
            lastname = $("#lastname").val();
            bloodType = $("#bloodType").val();
            dni = $("#dni").val();
            status = $("#status").val();
            donors = $("#donors").val();

            hospital = $("#hospital").val();

            hospitalStarts = $("#hospitalHoursStart").val();
            hospitalEnds = $("#hospitalHoursEnd").val();
            hospitalHours = hospitalStarts + " " + hospitalEnds;

            campaign.name = name;
            campaign.lastname = lastname;
            campaign.bloodType = bloodType;
            campaign.donors = donors;
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

              doc = res.docs.length ? res.docs[0] : false;

              if (doc) {
                //Campaign with DNI .. already exists!
              } else {
                campaignsDB.put(campaign).then(function() {
                  //All good!
                }).catch(function() {
                  // Something happened while creating campaign
                });
              }
            }).catch(function(err) {
              // Something happened while creating campaign
            });



          });
        }
        notReady['campaigns'] = false;


      }).on('error', function(err) {
        //See you later pal (show warning)
      });

    }
  });

  $('#bloodType, #status').formSelect();

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





});