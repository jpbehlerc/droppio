$(document).ready(function() {

  function Signx() {

    this._jsonified = [];
    this._xsrf = false,
      this._fields = {
        'signup': ['name', 'lastname', 'bloodType', 'email'],
        'login': ['password', 'email']
      };
    this.bloodType = false,
      this.name = false,
      this.lastname = false,
      this.email = false,
      this.password = false,
      this.type = false,

      this.toJSON = function() {

        if (this.type in this._fields) {

          for (var prop in this) {

            if (this[prop].length) {

              if (this._fields[this.type].indexOf(prop) > 0) {
                console.log('fields property ' + prop);

                this._jsonified.push({
                  '_id': prop,
                  value: this[prop]
                });

              }
            }
          }
        }

        return this._jsonified;
      }
  }

  signx = new Signx();

  $('select').material_select();

  $("#signup, #login").submit(function(e) {

    e.preventDefault();

    signx.type = $(this).attr("id");
    console.log(signx.type);
    signx.name = $("#name").val();
    signx.lastname = $("#lastname").val();
    signx.bloodType = $("#bloodType").val();
    signx.email = $("#email").val();
    signx.password = $("#password").val();
    signx._xsrf = xsrf_token;

    data = signx.toJSON();

    $.post("/register", data).done(function(data) {

      data = JSON.parse(data);
      respType = data['type'];

      if (respType == 'success') {

        window.location = "https://droppio.org/home"

      } else {
        //Oops something weird happened (show warning)
      }
    });

  });

});