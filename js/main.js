$(document).ready(function () {
  if (
    !localStorage.getItem("user-rol") ||
    localStorage.getItem("user-rol") === "Residente"
  ) {
    $(".butonUrbe").attr('disabled', 'disabled');
  }
});

$(document).ready(function () {
  $.get(
    "https://mysterious-fortress-44081.herokuapp.com/api/urbanizacions",
    function (data) {
      var response = data.data;

      response.forEach((element) => {
        $(
          `.urbanizacion-${element.attributes.manzana}-${element.attributes.villa}`
        ).addClass(`bg-${element.attributes.estado}`);
      });
    }
  );
});

function openModalUrbanizacion(manzana, villa) {
  $("#urbanizacion_villa_id").val(villa);
  $("#urbanizacion_manzana_id").val(manzana);
  window.location = "index.html#modal_urbanizacion";
  $.ajax({
    type: "GET",
    url: `https://mysterious-fortress-44081.herokuapp.com/api/urbanizacions?filters[$and][0][manzana][$eq]=${manzana}&filters[$and][0][villa][$eq]=${villa}`,
    success: function (data) {
      var villa = $("#urbanizacion_villa_id").val(
        data.data[0].attributes.villa
      );
      var manzana = $("#urbanizacion_manzana_id").val(
        data.data[0].attributes.manzana
      );
      var id = $("#urbanizacion_id").val(data.data[0].id);
      // window.location = "usuarios.html";
    },
    error: function (err) {
      console.log(err);
      alert(err.responseJSON.error.message);
    },
  });
}

$("#urbanizacion_form").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var id = $("#urbanizacion_id").val();
  var formData = {
    data: {
      estado: $("#urbanizacion_estado").val(),
    },
  };

  $.ajax({
    type: "PUT",
    url: `https://mysterious-fortress-44081.herokuapp.com/api/urbanizacions/${id}`,
    data: formData, // serializes the form's elements.
    success: function (data) {
      window.location = "index.html";
    },
    error: function (err) {
      console.log(err);
      alert(err.responseJSON.error.message);
    },
  });
});
