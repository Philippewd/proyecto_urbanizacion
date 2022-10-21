$(document).ready(function () {
  
    $.get(
        "http://localhost:3000/urbanizacionescondeduda",
        function (data) {
          $.each(data, function (idx, opt) {
            console.log(`.urbanizacion-${opt.manzana}-${opt.villa} -  bg-${opt.estado}`);
            $(`.urbanizacion-${opt.manzana}-${opt.villa}`).addClass(`bg-${opt.estado}`);
          });
        },
        "json"
      );
});

