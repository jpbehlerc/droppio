$(document).ready(function() {

  function Signx() {

    this._jsonified = {};
    this._xsrf = false,
      this._fields = {
        'signup': ['name', 'lastname', 'bloodType', 'email', '_xsrf', 'type'],
        'login': ['password', 'email2', '_xsrf', 'type']
      };
    this.bloodType = false,
      this.name = false,
      this.lastname = false,
      this.email = false,
      this.email2 = false,
      this.password = false,
      this.type = false,

      this.toJSON = function() {

        this._jsonified.length = 0

        if (this.type in this._fields) {

          for (var prop in this) {

            if (this[prop] != undefined && this[prop] != "") {

              if (this._fields[this.type].includes(prop))
                this._jsonified[prop] = this[prop];


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
    signx.name = $("#name").val();
    signx.lastname = $("#lastname").val();

    signx.bloodType = $("#bloodType").val();
    signx.email = $("#email").val();
    signx.email2 = $("#email2").val();
    signx.password = $("#password").val();
    signx._xsrf = xsrf_token;


    data = signx.toJSON();
    console.log(data);
    $.post("/register", data).done(function(resp) {

      resp = JSON.parse(resp);
      respType = resp['type'];

      if (respType == 'success') {

        window.location = "https://droppio.org/home"

      } else if (respType == 'signupError') {
        //User already present or something weird happened (show warning)
      } else if (respType == 'loginPassError') {
        //Definately smth weird happened (show warning)
      } else if (respType == 'loginError') {
        //Definately smth weird happened (show warning)
      }
    });

  });

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });
    }
  });

});