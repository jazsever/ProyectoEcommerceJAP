//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {

  let usuario = JSON.parse(localStorage.getItem("usuario"));
  document.getElementById("menu").innerHTML += `
  <div class="dropdown">
    <button class="dropbtn"> `+ usuario.nombre + `</button>
    <div class="dropdown-content">
      <a href="my-profile.html"><i class="bi bi-person-circle"></i> Mi perfil</a>
      <a href="cart.html"><i class="bi bi-cart"></i> Carrito</a>
      <a onclick="signOut();"> <i class="bi bi-box-arrow-right"></i> Cerrar sesión</a>
    </div>
  </div>`

});

