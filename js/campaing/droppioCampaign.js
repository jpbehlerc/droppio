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
      this.duty = false,
      this.status = false,
      this.createdAt = false,

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

  var campaign = new Campaigns();

  var compatibility = {
    "O+": ["O+", "O-"],
    "A+": ["A+", "A-", "O+", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "AB+": ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
    "O-": ["O-"],
    "A-": ["A-", "O-"],
    "B-": ["B-", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"]
  }

  $.post("/", {

    _xsrf: getCookie('_xsrf'),
    type: "creds"

  }).done(function(data) {

    data = JSON.parse(data);

    respType = data['type'];

    if (respType == 'creds') {

      var dbUser = data['dbUser'];
      var dbPass = data['dbPass'];

      //Init respective DBs
      var campaignsDB = new PouchDB("campaigns", {
        auto_compaction: false,
        cache: false,
        heartbeat: true
      });

      var remote_campaignsDB = new PouchDB('https://' + dbUser + ':' + dbPass + '@droppio.org:6489/campaigns');

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

    $("#submitCampaign").submit(function() {

      name = $("#name").val();
      lastname = $("#lastname").val();
      bloodType = $("#bloodType").val();
      dni = $("#dni").val();
      status = $("#status").val();
      hospital = $("#hospital").val();

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

      campaignsDB.put(campaign).then(function() {
        //Yay campaign created, show msg
      }).catch(function() {
        //Eugene failed to create campaign, show msg
      });

    });

  }).on('error', function(err) {
    //See you later pal
  });

});