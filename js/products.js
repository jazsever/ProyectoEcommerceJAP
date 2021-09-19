var productsArray = [];

//Función que muestra el array

function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row"> 
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + ` - ` + product.currency + ` ` + product.cost + `</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos` + `</small>
                    </div>
                        <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </div>
        
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

        
    }

}

//Ordenar array por precio del producto

//Ascendente
function ordenarPrecio() {

    productsArray.sort((a, b) => {
        if (a.cost > b.cost) {
            return 1;
        }
        if (a.cost < b.cost) {
            return -1;
        } else {
            return 0;
        }

    });
    showProductsList(productsArray);
}

//Descendente
function ordenarInverso() {

    productsArray.sort((a, b) => {
        if (a.cost > b.cost) {
            return -1;
        }
        if (a.cost < b.cost) {
            return 1;
        } else {
            return 0;
        }

    });
    showProductsList(productsArray);
}

//Ordenar array por relevancia (cantidad de vendidos)

function ordenarRelevancia() {

    productsArray.sort((a, b) => {
        if (a.soldCount > b.soldCount) {
            return -1;
        }
        if (a.soldCount < b.soldCount) {
            return 1;
        } else {
            return 0;
        }

    });
    showProductsList(productsArray);
}


//Filtrar por rango de precio ingresado

function filtrar() {
    let minimo = parseInt(document.getElementById("minimo").value);
    let maximo = parseInt(document.getElementById("maximo").value);

    let tabla = document.getElementById("cat-list-container");
    let filas = "";
    for (let product of productsArray) {

        if (product.cost >= minimo && product.cost <= maximo) {

            filas += ` <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + ` - ` + product.currency + ` ` + product.cost + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos` + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </div>`
        }
    }

    tabla.innerHTML = filas;
}



//Buscador de productos

function buscador() {

    let textoEscrito = document.getElementById("textobuscado").value;
    let listaFiltrada = productsArray.filter(product => {
        return product.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1;
    })

    showProductsList(listaFiltrada);

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro los productos
            showProductsList(productsArray);
        }
    });

    document.getElementById("textobuscado").addEventListener("keyup", () => {

        buscador();

    });

    document.getElementById("minimo").addEventListener("keyup", () => {
        filtrar();
    });

    document.getElementById("maximo").addEventListener("keyup", () => {
        filtrar();
    });

    document.getElementById("ordenAsc").addEventListener("click", function(){
        ordenarPrecio();
    });

    document.getElementById("ordenDes").addEventListener("click", function(){
        ordenarInverso();
    });

    document.getElementById("ordenar").addEventListener("click", function(){
        ordenarRelevancia();
    });

    document.getElementById("infodelproducto").addEventListener("click", function(){
        location.href="product-info.html";

    })
});


