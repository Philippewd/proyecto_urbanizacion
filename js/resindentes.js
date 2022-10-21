$(document).ready(function () {
  $.get(
    "https://mysterious-fortress-44081.herokuapp.com/api/residentes",
    function (data) {
      var datos = data.data;
      datos.forEach((element) => {
        var nuevafila =
          "<tr><td>" +
          element.id +
          "</td><td>" +
          element.attributes.cedula_duenio +
          "</td><td>" +
          element.attributes.nombre_duenio +
          "</td><td>" +
          element.attributes.cedula_residente +
          "</td><td>" +
          element.attributes.nombre_residente +
          "</td><td>" +
          element.attributes.telefono_residente +
          "</td><td>" +
          `<div>
            <button id="editar_id_form_residente" onclick=llenarForm(${element.id})>Editar</button>
            <button id="eliminar_id_form_residente" onclick=eliminarResidente(${element.id}) name="${element.id}">Eliminar</button>
          </div>` +
          "</td></tr>";

        $("#tabla_resultados_residentes").append(nuevafila);
        $("#table_resindentes").DataTable();
      });
    }
  );
});

function eliminarResidente(id) {
  $.ajax({
    type: "DELETE",
    url: `https://mysterious-fortress-44081.herokuapp.com/api/residentes/${id}`,
    success: function (data) {
      window.location = "residentes.html";
    },
    error: function (err) {
      alert(err.responseJSON.error.message);
    },
  });
}

$("#create_residente").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var formData = {
    data: {
      nombre_residente: $("#nombre_residente-create").val(),
      apellido_residente: $("#apellido_residente-create").val(),
      telefono_residente: $("#telefono_residente-create").val(),
      email_residente: $("#email_residente-create").val(),
      nombre_duenio: $("#nombre_duenio-create").val(),
      apellido_duenio: $("#apellido_duenio-create").val(),
      cedula_duenio: $("#cedula_duenio-create").val(),
    },
  };

  $.ajax({
    type: "POST",
    url: "https://mysterious-fortress-44081.herokuapp.com/api/residentes",
    data: formData, // serializes the form's elements.
    success: function (data) {
      window.location = "residentes.html";
    },
    error: function (err) {
      alert(err.responseJSON.error.message);
    },
  });
});

function llenarForm(id) {
  $.get(
    `https://mysterious-fortress-44081.herokuapp.com/api/residentes/${id}`,
    function (data) {
      var datos = data.data;
      $("#nombre_residente-editar").val(datos.attributes.nombre_residente),
        $("#id_residnete-editar").val(datos.id),
        $("#apellido_residente-editar").val(
          datos.attributes.apellido_residente
        ),
        $("#telefono_residente-editar").val(
          datos.attributes.telefono_residente
        ),
        $("#email_residente-editar").val(datos.attributes.email_residente),
        $("#cedula_duenio-editar").val(datos.attributes.cedula_duenio),
        $("#nombre_duenio-editar").val(datos.attributes.nombre_duenio),
        $("#apellido_duenio-editar").val(datos.attributes.apellido_duenio),
        (window.location = "residentes.html#modal_editar_residente");
    }
  );
}

$("#editar_residente_form").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var id = $("#id_residnete-editar").val();
  var formData = {
    data: {
      nombre_residente: $("#nombre_residente-editar").val(),
      apellido_residente: $("#apellido_residente-editar").val(),
      telefono_residente: $("#telefono_residente-editar").val(),
      email_residente: $("#email_residente-editar").val(),
      nombre_duenio: $("#nombre_duenio-editar").val(),
      apellido_duenio: $("#apellido_duenio-editar").val(),
      cedula_duenio: $("#cedula_duenio-editar").val(),
    },
  };

  $.ajax({
    type: "PUT",
    url: `https://mysterious-fortress-44081.herokuapp.com/api/residentes/${id}`,
    data: formData, // serializes the form's elements.
    success: function (data) {
      console.log(data);
      window.location = "residentes.html";
    },
    error: function (err) {
      console.log(err);
      alert(err.responseJSON.error.message);
    },
  });
});
