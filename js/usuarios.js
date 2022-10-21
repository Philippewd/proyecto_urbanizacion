$(document).ready(function () {
  $.get(
    "https://mysterious-fortress-44081.herokuapp.com/api/users",
    function (data) {
      data.forEach((element) => {
        const activo = element.blocked ? "inactivo" : "activo";
        var nuevafila =
          "<tr><td>" +
          element.cedula +
          "</td><td>" +
          element.nombre +
          "</td><td>" +
          element.apellido +
          "</td><td>" +
          element.username +
          "</td><td>" +
          element.perfil +
          "</td><td>" +
          activo +
          "</td><td>" +
          `<div>
            <button id="editar_id_form" onclick=llenarForm(${element.id})>Editar</button>
            <button id="eliminar_id_form" onclick=eliminarUsuario(${element.id})>Eliminar</button>
          </div>` +
          "</td></tr>";

        $("#tabla_resultados_users").append(nuevafila);
        $("#table_users").DataTable();
      });
    }
  );
});

$("#create_user").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var isActive = $("#user-estado-create").val() == "activo" ? false : true;
  var formData = {
    username: $("#user-name-create").val(),
    cedula: $("#user-cedula-create").val(),
    nombre: $("#user-nombre-create").val(),
    apellido: $("#user-apellido-create").val(),
    email: $("#user-email-create").val(),
    password: $("#user-password-create").val(),
    perfil: $("#user-perfil-create").val(),
    blocked: isActive,
  };

  $.ajax({
    type: "POST",
    url: "https://mysterious-fortress-44081.herokuapp.com/api/auth/local/register",
    data: formData, // serializes the form's elements.
    success: function (data) {
      window.location = "usuarios.html";
    },
    error: function (err) {
      alert(err.responseJSON.error.message);
    },
  });
});
function llenarForm(id) {
  $.get(
    `https://mysterious-fortress-44081.herokuapp.com/api/users/${id}`,
    function (data) {
      $("#user-name-editar").val(data.username),
        $("#user-id-editar").val(data.id),
        $("#user-cedula-editar").val(data.cedula),
        $("#user-nombre-editar").val(data.nombre),
        $("#user-email-editar").val(data.email),
        $("#user-perfil-editar").val(data.perfil),
        $("#user-apellido-editar").val(data.apellido),
        (window.location = "usuarios.html#modal_editar_user");
    }
  );
}

$("#editar_user_form").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var id = $("#user-id-editar").val();
  var isActive = $("#user-estado-editar").val() === "activo" ? false : true;
  var formData = {
    username: $("#user-name-editar").val(),
    cedula: $("#user-cedula-editar").val(),
    nombre: $("#user-nombre-editar").val(),
    apellido: $("#user-apellido-editar").val(),
    email: $("#user-email-editar").val(),
    perfil: $("#user-perfil-editar").val(),
    blocked: isActive,
  };

  $.ajax({
    type: "PUT",
    url: `https://mysterious-fortress-44081.herokuapp.com/api/users/${id}`,
    data: formData, // serializes the form's elements.
    success: function (data) {
      console.log(data);
      window.location = "usuarios.html";
    },
    error: function (err) {
      console.log(err);
      alert(err.responseJSON.error.message);
    },
  });
});

function eliminarUsuario(id) {
  $.ajax({
    type: "DELETE",
    url: `https://mysterious-fortress-44081.herokuapp.com/api/users/${id}`,
    success: function (data) {
      window.location = "usuarios.html";
    },
    error: function (err) {
      alert(err.responseJSON.error.message);
    },
  });
}