document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
            mostrarComentarios(comentariosArray)
        }
    });

});

comentariosArray = [];

function mostrarComentarios(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <span id="estrellas"> ` +calificacion(comentario.score)+ `
                    <h5 class="mb-1">`+ comentario.user + ` </h5>
                </span>    
            </div>
            <p class="mb-1"> `+comentario.description+` </p>
            
        </div>


        `


        document.getElementById("comentarios").innerHTML = htmlContentToAppend;


    }

};

function calificacion(score){
    let estrellas = "";

      for (let i=1; i<=5; i++){//        

          if (i<=score){  

              estrellas += '<span class="fa fa-star checked"></span>';
              
          }else {
              estrellas +='<span class="fa fa-star"></span>';
          }
      }
      
  return estrellas;
};

document.getElementById("enviarcomentario").addEventListener("click", () => {

    let comentariodelusuario = {};
    let usuario= JSON.parse(localStorage.getItem("usuario"));
    comentariodelusuario.user = usuario.nombre;
    comentariodelusuario.description = document.getElementById("comentariousuario").value;
    comentariodelusuario.score= document.getElementById("puntuacioningresada").value;

    if(comentariodelusuario.description.trim()=="" || comentariodelusuario.score.trim()==""){
        document.getElementById("mensajeerror").innerHTML=`<h6 font-color=red> Complete todos los campos </h6>`
    } else{
        comentariosArray.push(comentariodelusuario);
        
    }


mostrarComentarios(comentariosArray);
document.getElementById("comentariousuario").value="";
document.getElementById("puntuacioningresada").value="";
});