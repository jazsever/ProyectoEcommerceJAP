//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    document.getElementById("menu").innerHTML+= '<a  class="py-2 d-none d-md-inline-block" href="my-profile.html">' + usuario.nombre + '</a>';
    
});

