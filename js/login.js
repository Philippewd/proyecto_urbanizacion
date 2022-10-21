$(document).ready(function () {
    if (localStorage.getItem('token')) {
        window.location = '/index.html';
    }
});

$("#login").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var formData = {
    identifier: $("#identifier").val(),
    password: $("#password").val(),
  };

  $.ajax({
      type: "POST",
      url: "https://mysterious-fortress-44081.herokuapp.com/api/auth/local",
      data: formData, // serializes the form's elements.
      success: function(data)
      {
        if (data.jwt) {
            localStorage.setItem('token',data.jwt);
            localStorage.setItem('user-rol',data.user.perfil);
            localStorage.setItem('user-email',data.user.email);
        }else{
            localStorage.setItem('token',null);
        }
        location.reload();
      }
  });
});

$("#register").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var formData = {
    identifier: $("#username").val(),
    identifier: $("#cedula").val(),
    identifier: $("#nombre").val(),
    identifier: $("#apellido").val(),
    identifier: $("#email").val(),
    perfil:null,
    password: $("#password").val(),
  };

  $.ajax({
      type: "POST",
      url: "https://mysterious-fortress-44081.herokuapp.com/api/auth/local/register",
      data: formData, // serializes the form's elements.
      success: function(data)
      {
       alert("usuario creado")
      }
  });
});
