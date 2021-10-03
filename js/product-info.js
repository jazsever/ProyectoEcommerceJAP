let listaProductos = [];
let product = {};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productPrecioHTML = document.getElementById("productPrecio");
            let productCategory = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productPrecioHTML.innerHTML = product.cost + " " + product.currency;
            productCategory.innerHTML = product.category;

            //Muestro las imagenes en forma de carousel
            showImagesCarousel(product.images);



        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaProductos = resultObj.data;

            productosRelacionados(listaProductos);
        }
    });

});



//Imagenes en carousel

function showImagesCarousel(array) {

    let htmlContentToAppend = "";
    htmlContentToAppend += `
      <div class="carousel-item active">
        <img src="`+ product.images[0] + `" class="d-block w-50" alt="...">
      </div>`

    for (let i = 1; i < array.length; i++) {
        let images = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
          <img src="`+ product.images[i] + `" class="d-block w-50" alt="...">
        </div>
        `


    }
    document.getElementById("carouselExampleSlidesOnly").innerHTML = htmlContentToAppend;
}


//Productos relacionados

function productosRelacionados(array) {
    let htmlContentToAppend = "";

    product.relatedProducts.forEach((relacionado) => {

        htmlContentToAppend +=
        `
             <div class="col-lg-3 col-md-5 col-6 ">
                <a href="products.html" class=" shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top" src="`+ array[relacionado].imgSrc + `">
                <h3 class="text-center">` + array[relacionado].name + `</h3> 
                <h5 class="text-center">`+ array[relacionado].currency + `  ` + array[relacionado].cost + `</h5>
                <small class="text-center"> `+ array[relacionado].soldCount + ` " vendidos" +</small> 
                </a>
            </div>
           ` ;
    });

    document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;

}