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

            if (prop in this._fields[this.type]) {
              if (this[prop].length) {

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

  $("#signup,#login").submit(function(e) {

    e.preventDefault();

    type = $(this).attr("id");

    signx.type = $(this).attr("id");
    signx.name = $("#name").val();
    signx.lastname = $("#name").val();
    signx.bloodType = $("#bloodType").val();
    signx.email = $("#email").val();
    signx.password = $("#email").val();
    console.log(signx.toJSON());
    /*
    $.post("/register", signx).done(function(data) {

      data = JSON.parse(data);
      respType = data['type'];

      if (respType == 'success') {

        window.location = "https://droppio.org/home"

      } else {
        //Oops something weird happened (show warning)
      }
    });
    */
  });

});