$("#cerrar-sesion").click(function () {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user-rol");
    localStorage.removeItem("user-email");
    window.location = "/login.html";
  }
});

$(document).ready(function () {
  if (!localStorage.getItem("token")) {
    window.location = "/login.html";
  }
});

$(document).ready(function () {
  if (
    !localStorage.getItem("user-rol") ||
    localStorage.getItem("user-rol") === "null"
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("user-rol");
    localStorage.removeItem("user-email");
    window.location = "/login.html";
  }
});

$(document).ready(function () {
  if (localStorage.getItem("user-rol") == "Administrador") {
    var element = `
                  <a class="enlace" href="/residentes.html">Residentes</a>
                  <a class="enlace" href="/usuarios.html">Usuarios</a>
                  `;
    $("#header-enlaces").append(element);
  }
});
