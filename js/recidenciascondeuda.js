$(document).ready(function () {
    $.get(
      "https://mysterious-fortress-44081.herokuapp.com/api/urbanizacions?filters[$and][0][estado][$eq]=rojo",
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