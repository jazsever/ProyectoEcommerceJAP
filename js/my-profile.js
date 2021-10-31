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

  perfilUsuario = JSON.parse(localStorage.getItem("usuario2"));


  document.getElementById("datos_personales").innerHTML = `<div class="card bg-light mb-6">
  <div class="card-header"></div>
  <div class="card-body">
    <h5 class="card-title">Tus datos personales</h5>
    <p class="card-text">
      <label>Nombre: `+ perfilUsuario.nombre + `</label>
      <br>
      <label>Apellido: `+ perfilUsuario.apellido + `</label>
      <br>
      <label>Correo: `+ perfilUsuario.correo + `</label>
      <br>
      <label>Fecha de nacimiento: `+ perfilUsuario.fecha + `</label>
      <br>
      <label>Celular: `+ perfilUsuario.telefono + `</label>
      <br>

      <img src="`+perfilUsuario.imagen+`"></img>
    </p>
  </div>
</div>`

  

});

let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("mail");
let fecha = document.getElementById("fecha");
let telefono = document.getElementById("telefono");

let perfilUsuario = {};

function guardar() {

  perfilUsuario.nombre = nombre.value;
  perfilUsuario.apellido = apellido.value;
  perfilUsuario.correo = correo.value;
  perfilUsuario.fecha = fecha.value;
  perfilUsuario.telefono = telefono.value;
  
  localStorage.setItem('usuario2', JSON.stringify(perfilUsuario));
  perfil();

};

function perfil() {
  let htmlContentToAppend = "";

  htmlContentToAppend = `<div class="card bg-light mb-6">
  <div class="card-header"></div>
  <div class="card-body">
    <h5 class="card-title">Tus datos personales</h5>
    <p class="card-text">
      <label>Nombre: `+ perfilUsuario.nombre + `</label>
      <br>
      <label>Apellido: `+ perfilUsuario.apellido + `</label>
      <br>
      <label>Correo: `+ perfilUsuario.correo + `</label>
      <br>
      <label>Fecha de nacimiento: `+ perfilUsuario.fecha + `</label>
      <br>
      <label>Celular: `+ perfilUsuario.telefono + `</label>
      <br>
    </p>
  </div>
</div>`

  document.getElementById("datos_personales").innerHTML = htmlContentToAppend;
}


function vistaPrevia() {
  let preview = document.getElementById('foto');
  let file = document.querySelector('input[type=file]').files[0];
  let reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    document.getElementById('contenido').innerHTML = reader.result;

  }

  if (file) {
    reader.readAsDataURL(file);

  } else {
    preview.src = "img/avatar.png";
  }
}


