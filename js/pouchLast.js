var settings = {

  bloodType = false,
  name = false,
  lastname = false,
  dni = false,
  dni = false
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