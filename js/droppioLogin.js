$(document).ready(function() {

  function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : false;
  }

  $('select').material_select();

  $("#submit").submit(function(e) {

    e.preventDefault();

    name = $("#name").val();
    lastname = $("#lastname").val();
    bloodType = $("#bloodType").val();
    email = $("#email").val();

    alert(bloodType);

    $.post("/register", {

      _xsrf: xsrf_token,
      type: "fastSignup",
      name: name,
      lastname: lastname,
      bloodType: bloodType,
      email: email

    }).done(function(data) {

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