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
});

carrito = {};

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
          </tr>`

    }

    document.getElementById("tablaCarrito").innerHTML = tabla;
    sumar();
}

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
    document.getElementById("subtotal").innerHTML=subtotal;
    
    
}
