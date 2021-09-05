
function verificar() {

    let nombre = document.getElementById("nombre");
    let password = document.getElementById("password");
    let msj = document.getElementById("msj");
    let usuario = {};

    if (nombre.value.trim() === "" || password.value.trim() === "") {
        msj.innerHTML = "Dato requerido";
        msj.style.color = "red";
        msj.style.display = "block";
    } else {
        location.href = "home.html";

        usuario.nombre = nombre.value;

        localStorage.setItem("usuario", JSON.stringify(usuario));

        sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
}

function signOut(){
    sessionStorage.clear();
    localStorage.clear(); //Elimina Local Storage
    location.href="index.html"; 
}


