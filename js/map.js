var mymap = L.map('mapid').setView([51.505, -0.09], 13);

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("mapid").innerHTML=mymap;
}