$(document).ready(function() {

  function Signx() {

    this._jsonified = {};
    this._xsrf = false,
      this._fields = {
        'signup': ['name', 'lastname', 'bloodType', 'email', '_xsrf'],
        'login': ['password', 'email', '_xsrf']
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

              if (this._fields[this.type].includes(prop)) {

                this._jsonified[prop] = this[prop];

              }
            }
          }
        }

        this._jsonified['contentType'] = "application/json; charset=utf-8";
        this._jsonified['dataType'] = "json";

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
    console.log(data);
    $.post("/register", data).done(function(resp) {

      resp = JSON.parse(resp);
      respType = resp['type'];

      if (respType == 'success') {

        window.location = "https://droppio.org/home"

      } else {
        //Oops something weird happened (show warning)
      }
    });

  });

});