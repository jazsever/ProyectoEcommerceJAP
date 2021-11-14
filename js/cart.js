//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_JAP_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;
            mostrarCarrito(carrito);
        }
    });

    for (let i = 0; i < envio.length; i++) {
        envio[i].addEventListener('click', () => {
            sumar();
        })

    }

    for (let i = 0; i < pagos.length; i++) {
        pagos[i].addEventListener('click', () => {
            pagamiento();
        })

    }

    // for (let i = 0; i < borro.length; i++) {
    //     borro[i].addEventListener("click", () => {
    //         borrar(i);
    //     })
    // }
});



carrito = {};

function borrar(posicion) {
    carrito.articles.splice(posicion, 1);
    mostrarCarrito(carrito);
}

// let borro = document.getElementsByName("borrar");

function mostrarCarrito(lista) {
    let tabla = "";
    for (let i = 0; i < lista.articles.length; i++) {
        let articulo = lista.articles[i];
        if (articulo.currency == "USD") {
            articulo.currency = "UYU";
            articulo.unitCost = articulo.unitCost * 40;
        }

        tabla += `
          <tr>
            
            <td> <img src="`+ articulo.src + `"class="align-self-center mr-3 img-thumbnail img-hover-zoom" style="width:25%"> ` + articulo.name + `</td>
            <td>`+ articulo.currency + `</td>
            <td class="precio">`+ articulo.unitCost + ` </td>
            <td><input style="width:50%" type="number" value=1 min="0" id="cant${i}" onchange="sumar()"></td>
            <td><span id="subs${i}"> </span></td>
            <td><img src="img/delete_sign.png" width="20px" onclick="borrar(${i})"></td>
          </tr>`

    }

    document.getElementById("tablaCarrito").innerHTML = tabla;
    sumar();

}


let envio = document.getElementsByName('envios');

function sumar() {
    let precios = document.getElementsByClassName('precio'); //Array de la clase precio (me toma precios unitarios)

    let cantidades = document.getElementsByTagName('input');//Array de nro ingresado en input

    let total = 0;
    let subtotal = 0;


    for (let i = 0; i < precios.length; i++) {

        total += parseFloat(precios[i].innerHTML);

        subtotal += parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);



        document.getElementById('subs' + i).innerHTML = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);

    }

    costoEnvio = 0;

    for (let x = 0; x < envio.length; x++) {
        if (envio[x].checked) {
            costoEnvio = subtotal * parseFloat(envio[x].value);

        }

    }


    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("costoenvio").innerHTML = costoEnvio;
    document.getElementById("costoTotal").innerHTML = subtotal + costoEnvio;

}

let pagos = document.getElementsByName("pagos");

function pagamiento() {
    if (pagos[0].checked) {

        document.getElementById("tarjetacredito").innerHTML =
            `
        <div class="form-group">
            <label>Número de tarjeta</label>
            <input type="text" id="numerotarjeta" class="form-control" placeholder="XXXX XXXX XXXX XXXX" required>
            <div class="invalid-feedback">
            Please enter a message in the textarea.
          </div>
        </div>
        <div class="form-group">
            <label>Fecha vencimiento</label>
            <input type="month" id="vencimiento" class="form-control" required>
        </div>
        <div class="form-group">
            <label>CVV</label>
            <input type="text" id="seguridad" class="form-control" placeholder="XXX" required>
        </div>`;


    }

    if (pagos[1].checked) {
        document.getElementById("transferencia").innerHTML = `
        <div class="form-group">
            <label>Número de cuenta</label>
            <input type="text" id="nrocuenta" class="form-control" placeholder="XXXXXXXXXX" required>
        </div>`;

    }


}

function validarModal() {

    if (pagos[0].checked) {
        let codigo = document.getElementById("numerotarjeta");
        let vencimiento = document.getElementById("vencimiento");
        let seguridad = document.getElementById("seguridad");

        if (codigo.value.trim() === "" || vencimiento.value.trim() === "" || seguridad.value.trim() === "") {
            document.getElementById("mensaje_error").innerHTML = `<p class="font-weight-bold">Complete los datos requeridos</p>`
        }
        else {
            document.getElementById("transferencia").innerHTML = "";
            document.getElementById("metodoelegido").innerHTML = `Tarjeta de crédito`

        }
    }

    if (pagos[1].checked) {
        let nrocuenta = document.getElementById("nrocuenta");

        if (nrocuenta.value.trim() === "") {
            document.getElementById("mensaje_error").innerHTML = `<p class="font-weight-bold">Complete los datos requeridos</p>`
        }
        else {
            document.getElementById("tarjetacredito").innerHTML = "";
            document.getElementById("metodoelegido").innerHTML = `Transferencia bancaria`
        }
    }

};

function validarTodo() {

    let metodo_pago = document.getElementById("metodoelegido").innerHTML;

    if (metodo_pago === "Transferencia bancaria" || metodo_pago === "Tarjeta de crédito") {
        Swal.fire({
            icon: 'success',
            title: 'Su compra fue realizada con éxito',
            text: 'Recibirá por mail la factura.',

        })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Algo falló',
            text: 'Parece que le falta completar el método de pago.',

        })
    }
}